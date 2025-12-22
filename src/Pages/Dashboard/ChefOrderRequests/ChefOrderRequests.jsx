import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../Loader/Loader';
import { chefToast } from '../../../utils/chefToast';
import { chefAlert } from '../../../utils/chefAlert';
import useTitle from '../../../hooks/useTitle';

const ChefOrderRequests = () => {

    useTitle("Orders - Chef")

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: userInfo = [], isLoading: userLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data
        },
    })

    //Fetching orderRequests
    const { data: orders = [], isLoading: orderLoading, refetch } = useQuery({
        queryKey: ['orders', userInfo?.chefId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${userInfo.chefId}`)
            return res.data
        },
        enabled: !!userInfo?.chefId,
    })

    if (orderLoading || userLoading) {
        return <Loader></Loader>
    }

    const handleCancel = (orderId) => {
        chefAlert({
            title: 'Cancel this order?',
            text: "You can't undo this action",
            icon: 'warning'
        }).then((result) => {
            if (result.isConfirmed) {
                handleOrderStatus(orderId, 'cancelled');
            }
        });
    };



    const handleOrderStatus = async (orderId, status) => {
        try {
            const res = await axiosSecure.patch(`/orders/${orderId}`, { status });

            if (res.data.modifiedCount) {
                chefToast.success(`Order ${status}`);
                refetch();
            }
        } catch (error) {
            chefToast.error(`Error: Order not ${status}`);
        }
    };



    return (
        <div className="space-y-5 mx-5 my-5">
            {orders.map((order) => (
                <div
                    key={order._id}
                    className="card bg-base-100 shadow-md border border-base-200 rounded-2xl"
                >
                    <div className="card-body space-y-3">

                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-primary">
                                {order.mealName}
                            </h2>

                            <span className={`badge badge-sm
                                ${order.orderStatus === 'pending' && 'badge-warning text-white font-black'}
                                ${order.orderStatus === 'accepted' && 'badge-info text-white font-black'}
                                ${order.orderStatus === 'delivered' && 'badge-success text-white font-black'}
                                ${order.orderStatus === 'cancelled' && 'badge-error text-white font-black'}
                            `}>
                                {order.orderStatus}
                            </span>
                        </div>

                        {/* Meal Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <p><span className="font-semibold">Price:</span> ৳{order.price}</p>
                            <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
                            <p>
                                <span className="font-semibold">Payment:</span>
                                <span className={`ml-1 ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                                    {order.paymentStatus}
                                </span>
                            </p>
                        </div>

                        <hr />

                        {/* User Info */}
                        <div className="text-sm space-y-1">
                            <p><span className="font-semibold">Customer:</span> {order.userEmail}</p>
                            <p><span className="font-semibold">Address:</span> {order.userAddress}</p>
                            <p className="text-xs text-gray-500">
                                Ordered on: {new Date(order.orderTime).toLocaleString()}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => handleCancel(order._id)}
                                className="btn btn-sm btn-outline btn-error"
                                disabled={order.orderStatus !== 'pending'}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => handleOrderStatus(order._id, 'accepted')}
                                className="btn btn-sm btn-outline btn-success"
                                disabled={order.orderStatus !== 'pending'}
                            >
                                Accept
                            </button>

                            <button
                                onClick={() => handleOrderStatus(order._id, 'delivered')}
                                className="btn btn-sm btn-outline btn-primary"
                                disabled={order.orderStatus !== 'accepted'}
                            >
                                Deliver
                            </button>
                        </div>

                    </div>
                </div>
            ))}
        </div>

    );
};

export default ChefOrderRequests;