import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { chefToast } from '../../../utils/chefToast';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ChefCreateMeal = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useAuth()
    const axiosInstance = useAxios()
    const axiosSecure = useAxiosSecure()


    const { data: userInfo = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data
        }
    })


    // Handle Create Meal
    const handleCreateMeal = (data) => {
        const photoImg = data.foodImage[0]



        //Storing the image in formdata and get the photo url
        const formData = new FormData()
        formData.append('image', photoImg)


        // Send the photo to store and get the URL
        const imageAPIurl = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`
        axiosInstance.post(imageAPIurl, formData)
            .then(response => {
                console.log('after image upload:', response.data.data)
                const photoURL = response.data.data.thumb.url


                // update in meal collection
                const mealInfo = {
                    foodName: data.foodName,
                    chefName: data.chefName,
                    foodImage: photoURL,
                    price: data.price,
                    rating: data.rating,
                    ingredients: data.ingredients.split(",").map(i => i.trim()),
                    deliveryArea: data.deliveryArea.split(",").map(a => a.trim()),
                    estimatedDeliveryTime: data.estimatedDeliveryTime,
                    chefExperience: data.chefExperience,
                    chefId: userInfo.chefId,
                    userEmail: user.email
                };

                axiosSecure.post('/meal', mealInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            chefToast.success('Meal Added Successfully!')
                        }
                    })
                    .catch(error => {
                        chefToast.error('Failed to save meal info');
                    });
            })
            .catch(error => {
                // console.log(error)
                chefToast.error('Error')
            })





        // Reset the form
        reset()

    };



    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-center mb-2">
                Create a New Meal
            </h2>
            <p className="text-center text-gray-500 mb-8">
                Share your homemade specialty with food lovers nearby
            </p>

            <form onSubmit={handleSubmit(handleCreateMeal)} className="space-y-6">

                {/* Food Name */}
                <div>
                    <label className="label font-semibold">Food Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Chicken Butter Masala"
                        className="input input-bordered w-full"
                        {...register("foodName", { required: "Food name is required" })}
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
                        {...register("chefName", { required: "Chef name is required" })}
                    />
                </div>

                {/* Food Image Upload */}
                <div>
                    <label className="label font-semibold">Food Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        {...register("foodImage", { required: "Food image is required" })}
                    />
                </div>

                {/* Price & Rating */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label font-semibold">Price (৳)</label>
                        <input
                            type="number"
                            min="1"
                            className="input input-bordered w-full"
                            {...register("price", { required: true })}
                        />
                    </div>

                    <div>
                        <label className="label font-semibold">Rating</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            defaultValue={0}
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
                        {...register("ingredients", { required: true })}
                    />
                </div>

                {/* Delivery Area */}
                <div>
                    <label className="label font-semibold">Delivery Area</label>
                    <input
                        type="text"
                        placeholder="e.g. Dhanmondi, Mirpur, Gulshan"
                        className="input input-bordered w-full"
                        {...register("deliveryArea", {
                            required: "Delivery area is required"
                        })}
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
                        {...register("estimatedDeliveryTime", { required: true })}
                    />
                </div>

                {/* Chef Experience */}
                <div>
                    <label className="label font-semibold">Chef's Experience</label>
                    <input
                        type="text"
                        placeholder="e.g. 5 years of home cooking experience"
                        className="input input-bordered w-full"
                        {...register("chefExperience", { required: true })}
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
                <button type="submit" className="btn bg-primary text-base-100 w-full text-lg rounded-xl">Create Meal</button>

            </form>
        </div>
    );
};


export default ChefCreateMeal;