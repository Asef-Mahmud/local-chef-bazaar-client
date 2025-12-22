import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Loader/Loader';
import { chefToast } from '../../utils/chefToast';
import Swal from 'sweetalert2';
import { chefAlert } from '../../utils/chefAlert';

const Order = () => {

    const { id: mealId } = useParams()
    console.log(mealId)
    const { register, handleSubmit, control } = useForm({ defaultValues: { quantity: 1 } })
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    // Fetching data
    const { data: meal = [], isLoading } = useQuery({
        queryKey: ['meal', mealId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal-details/${mealId}`)

            return res.data
        }
    })

    const { data: userInfo = [], isLoading: userLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            console.log(userInfo)
            return res.data
        }
    })


    const quantity = useWatch({
        control,
        name: "quantity"
    });

    const totalPrice = Number(meal.price) * Number(quantity);
    // console.log(totalPrice)

    const handleOrder = (data) => {

        const orderData = {
            foodId: meal._id,
            mealName: meal.foodName,
            price: Number(meal.price),
            totalPrice: Number(totalPrice),
            quantity: Number(data.quantity),
            chefName: meal.chefName,
            chefId: meal.chefId,
            userEmail: user.email,
            userAddress: data.userAddress,
            orderStatus: "pending",
            paymentStatus: "pending",
            status: userInfo.status
        };

        chefAlert({
            title: "Do you agree with the price?",
            text: `You will be charged with BDT ${totalPrice}`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.post('/order', orderData)
                        .then(res => {
                            if (res.data.insertedId) {
                                // navigate('/dashboard/my-parcels')
                                chefAlert({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Order has been placed. Please pay",
                                    showConfirm: false,
                                    showCancel: false,
                                    time: 2000
                                });
                            }
                        })
                        .catch(() => {
                            chefAlert({
                                position: "top-end",
                                icon: "error",
                                title: "Failed to place order",
                                showConfirm: false,
                                timer: 1500
                            });
                        });
                }
            });
    };



    if (isLoading || userLoading) {
        return <Loader></Loader>
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">

            {/* Order Form */}
            <div className="md:col-span-2 card bg-base-100 shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-primary">
                    Confirm Your Order
                </h2>

                <form onSubmit={handleSubmit(handleOrder)} className="space-y-4">

                    <div>
                        <label className="label">Meal Name</label>
                        <input value={meal.foodName} disabled className="input input-bordered w-full" />
                    </div>

                    <div>
                        <label className="label">Price (৳)</label>
                        <input value={meal.price} disabled className="input input-bordered w-full" />
                    </div>

                    <div>
                        <label className="label">Quantity</label>
                        <input
                            type="number"
                            min={1}
                            {...register("quantity", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label">Chef ID</label>
                        <input value={meal.chefId} disabled className="input input-bordered w-full" />
                    </div>

                    <div>
                        <label className="label">Your Email</label>
                        <input value={user.email} disabled className="input input-bordered w-full" />
                    </div>

                    <div>
                        <label className="label">Delivery Address</label>
                        <textarea
                            {...register("userAddress", { required: true })}
                            className="textarea textarea-bordered w-full"
                            placeholder="Enter your delivery address"
                        />
                    </div>

                    <button className="btn btn-primary w-full rounded-xl">
                        Confirm Order
                    </button>
                </form>
            </div>

            {/* Order Summary */}
            <div className="card bg-base-200 shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

                <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Meal:</span> {meal.foodName}</p>
                    <p><span className="font-medium">Price:</span> ৳{meal.price}</p>
                    <p><span className="font-medium">Quantity:</span> {quantity}</p>
                    <hr />
                    <p className="text-lg font-bold text-primary">
                        Total: ৳{totalPrice}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Order;