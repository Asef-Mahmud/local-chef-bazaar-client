import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../Loader/Loader';
import { Link } from 'react-router';

const MyOrder = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    //Fetching orders Info
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['my-orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-orders/${user.email}`)
            return res.data
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-10 mt-10">
            {orders.map(order => (
                <div
                    key={order._id}
                    className="bg-white shadow-lg rounded-2xl border border-gray-200 p-5 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900">{order.mealName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${order.orderStatus === 'preparing' ? 'bg-blue-100 text-blue-800' : ''}
                            ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                            ${order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' : ''}`}
                        >
                            {order.orderStatus.toUpperCase()}
                        </span>
                    </div>

                    {/* Details */}
                    <div className="text-gray-700 text-sm space-y-1">
                        <p><span className="font-semibold">Chef:</span> {order.chefName}</p>
                        <p><span className="font-semibold">Chef ID:</span> {order.chefId}</p>
                        <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
                        <p><span className="font-semibold">Price:</span> ৳{order.price}</p>
                        <p><span className="font-semibold">Order Time:</span> {new Date(order.orderTime).toLocaleString()}</p>
                        <p><span className="font-semibold">Payment:</span> {(order.paymentStatus).toUpperCase()}</p>
                    </div>

                    {/* Pay Button */}
                    {order.paymentStatus === 'pending' && order.orderStatus === 'accepted' && (
                        <Link to={`/dashboard/payment/${order._id}`}>
                            <button className="mt-4 w-full py-2 rounded-l hover:cursor-pointer bg-[#C9A86A] text-black font-semibold hover:brightness-95 transition">
                                Pay Now
                            </button>
                        </Link>

                    )}
                </div>
            ))}
        </div>
    );
};

export default MyOrder;