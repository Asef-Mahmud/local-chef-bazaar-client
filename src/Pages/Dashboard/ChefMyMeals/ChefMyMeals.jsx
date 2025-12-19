import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import { chefToast } from '../../../utils/chefToast';
import { chefAlert } from '../../../utils/chefAlert';
import { useForm } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';
import useAxios from '../../../hooks/useAxios';

const ChefMyMeals = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const updateMealRef = useRef(null)
    const [meal, setMeal] = useState({})


    //Fetching myMeals Info
    const { data: myMeals = [], isLoading, refetch } = useQuery({
        queryKey: ['my-meals', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-meals/${user.email}`)
            return res.data
        }
    })


    const { data: userInfo = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }



    const handleDelete = (id) => {
        chefAlert({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
        }).then((result) => {
            if (result.isConfirmed) {

                //  data to delete
                axiosSecure.delete(`/delete-my-meal/${id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            chefToast.success('Meal has been deleted successfully')
                        }

                        // Removal from the UI 
                        refetch()
                    })
                    .catch(error => {
                        chefToast.error('Error: Try Again Later')
                    })

            }
        });
    }


    // MOdal for Updating Meal
    function handleUpdateMealModal(meal) {
        setMeal(meal);

        reset({
            foodName: meal.foodName,
            chefName: meal.chefName, 
            foodImage: meal.foodImage, 
            price: meal.price, 
            rating: meal.rating, 
            ingredients: Array.isArray(meal.ingredients) ? meal.ingredients.join(", ") : meal.ingredients,
            deliveryArea:  Array.isArray(meal.deliveryArea) ? meal.deliveryArea.join(", ") : meal.deliveryArea,
            estimatedDeliveryTime: meal.estimatedDeliveryTime, 
            chefExperience: meal.chefExperience 
        })

        updateMealRef.current.showModal();
    }

    const handleUpdate = (data) => {

        if (!meal?._id) {
            chefToast.error('Error: Meal data missing. Try refreshing.');
            return;
        }

        const updatedData = {
            foodName: data.foodName || meal.foodName,
            chefName: data.chefName || meal.chefName,
            foodImage: data.foodImage || meal.foodImage,
            price: data.price || meal.price,
            rating: data.rating || meal.rating,
            ingredients: data.ingredients ? data.ingredients.split(",").map(i => i.trim()) : meal.ingredients,
            deliveryArea: data.deliveryArea ? data.deliveryArea.split(",").map(i => i.trim()) : meal.deliveryArea,
            estimatedDeliveryTime: data.estimatedDeliveryTime || meal.estimatedDeliveryTime,
            chefExperience: data.chefExperience || meal.chefExperience,
            chefId: userInfo.chefId,
            userEmail: user.email
        }


        // UPDATE INFO
        axiosSecure.patch(`/update-my-meal/${meal._id}`, updatedData)
            .then(data => {
                if (data.data.modifiedCount) {
                    refetch()
                    console.log(data)
                    // CLosing the modal
                    updateMealRef.current.close()

                    chefToast.success('Information Updated')
                }
            })
            .catch(error => {
                updateMealRef.current.close()
                chefToast.error('Error! Try Again later!')
            })

    }




    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-5 mt-10">
            {myMeals.map(meal => (
                <div
                    key={meal._id}
                    className="bg-white shadow-lg rounded-2xl border border-gray-200 p-5 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                >
                    {/* Image */}
                    <div className="h-60 w-full overflow-hidden">
                        <img
                            src={meal.foodImage}
                            alt={meal.foodName}
                            className="h-full w-full object-cover hover:scale-105 transition duration-500"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                        <h2 className="card-title">
                            {meal.foodName}
                        </h2>

                        <div className="text-sm text-gray-600 flex justify-between items-center">
                            <span className="font-medium text-gray-800">By {meal.chefName}</span>
                            <div className="badge border border-primary badge-xs text-primary">Chef ID: {meal.chefId}</div>
                        </div>
                        <div className="text-xl font-bold text-[#C9A86A]">৳{meal.price}</div>
                        <p className="text-gray-500 text-xs"><span className='font-bold'>Delivery Area:</span> {" "}
                            {Array.isArray(meal.deliveryArea)
                                ? meal.deliveryArea.join(", ")
                                : meal.deliveryArea}</p>
                        <p className="text-gray-500 text-xs"><span className='font-bold'>Ingredients:</span> {" "}
                            {Array.isArray(meal.ingredients)
                                ? meal.ingredients.join(", ")
                                : meal.ingredients}</p>
                        <span className="text-xs font-semibold text-primary">Estimated Delivery Time: {meal.estimatedDeliveryTime}</span>
                        <p><span className='text-yellow-500'>{"★ ".repeat(meal.rating)}</span></p>
                    </div>




                    {/* Buttons */}
                    <div className='flex gap-2 items-center'>
                        <button onClick={() => handleUpdateMealModal(meal)} className="mt-4 text-sm w-full py-1 hover:cursor-pointer rounded-xl bg-accent text-base-100 font-semibold hover:brightness-95 transition">
                            Update
                        </button>

                        <button onClick={() => handleDelete(meal._id)} className="mt-4 text-sm w-full py-1 hover:cursor-pointer border border-primary rounded-xl bg-base-100 text-black font-semibold hover:brightness-95 transition">
                            Delete
                        </button>
                    </div>


                </div>
            ))}

            {/* MODAL for UPDATE */}

            <dialog ref={updateMealRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className='flex justify-between items-center mb-2'>
                        <h3 className="font-bold text-3xl">Modify Meal</h3>
                        <div>
                            <form method="dialog">

                                <button className="btn bg-base-100 p-2 hover:border-primary text-primary rounded-full text-3xl"><MdCancel /></button>
                            </form>
                        </div>
                    </div>


                    {/* Form */}
                    <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">

                        {/* Food Name */}
                        <div>
                            <label className="label font-semibold">Food Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Chicken Butter Masala"
                                className="input input-bordered w-full"
                                {...register("foodName")}

                            />
                            {errors.foodName && (
                                <p className="text-red-500 text-sm mt-1">{errors.foodName.message}</p>
                            )}
                        </div>

                        {/* Chef Name */}
                        <div>
                            <label className="label font-semibold">Chef Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input input-bordered w-full"
                                {...register("chefName")}

                            />
                        </div>

                        {/* Food Image Upload */}
                        <div>
                            <label className="label font-semibold">Food Image</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register("foodImage")}

                            />
                            <p className='text-xs'>Please paste the link via <a className='underline' href='https://imgbb.com/' target='_blank'>imgbb</a></p>
                        </div>

                        {/* Price & Rating */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label font-semibold">Price (৳)</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="input input-bordered w-full"
                                    {...register("price")}

                                />
                            </div>

                            <div>
                                <label className="label font-semibold">Rating</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    defaultValue={meal.rating}
                                    className="input input-bordered w-full"
                                    {...register("rating")}
                                />
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <label className="label font-semibold">Ingredients</label>
                            <textarea
                                rows="3"
                                placeholder="Chicken, butter, cream, spices..."
                                className="textarea textarea-bordered w-full"
                                {...register("ingredients")}


                            />
                        </div>

                        {/* Delivery Area */}
                        <div>
                            <label className="label font-semibold">Delivery Area</label>
                            <input
                                type="text"
                                placeholder="e.g. Dhanmondi, Mirpur, Gulshan"
                                className="input input-bordered w-full"
                                {...register("deliveryArea")}

                            />
                            {errors.deliveryArea && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.deliveryArea.message}
                                </p>
                            )}
                        </div>

                        {/* Delivery Time */}
                        <div>
                            <label className="label font-semibold">Estimated Delivery Time</label>
                            <input
                                type="text"
                                placeholder="e.g. 30-40 minutes"
                                className="input input-bordered w-full"
                                {...register("estimatedDeliveryTime")}

                            />
                        </div>

                        {/* Chef Experience */}
                        <div>
                            <label className="label font-semibold">Chef's Experience</label>
                            <input
                                type="text"
                                placeholder="e.g. 5 years of home cooking experience"
                                className="input input-bordered w-full"
                                {...register("chefExperience")}

                            />
                        </div>

                        {/* Chef ID */}
                        <div>
                            <label className="label font-semibold">Chef ID</label>
                            <input
                                type="text"
                                value={userInfo?.chefId || ""}
                                readOnly
                                className="input input-bordered w-full bg-gray-100"
                            />
                        </div>

                        {/* User Email */}
                        <div>
                            <label className="label font-semibold">User Email</label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="input input-bordered w-full bg-gray-100"
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn bg-primary text-base-100 w-full text-lg rounded-xl">Update Meal</button>
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default ChefMyMeals;