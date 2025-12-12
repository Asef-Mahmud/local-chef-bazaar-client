import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, useParams } from 'react-router';
import Loader from '../../Loader/Loader';
import { useForm } from 'react-hook-form';
import { chefToast } from '../../utils/chefToast';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const MealDetails = () => {

    const { id: mealId } = useParams()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const axiosInstance = useAxios()


    const { newComment, setNewComment } = useState('')

    // Form control
    const { register, formState: { errors }, reset, handleSubmit } = useForm()


    //Fetching meals
    const { data: meal = [], isLoading } = useQuery({
        queryKey: ['meal', mealId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal-details/${mealId}`)
            return res.data

        }
    })


    // Fetching reviews

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', mealId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${mealId}`)
            console.log(res.data)
            return res.data
        }
    })



    if (isLoading) {
        return <Loader></Loader>
    }


    const handleReviewSubmit = (data) => {

        console.log(data)
        const reviewData = {
            mealId: mealId,
            reviewerName: user?.displayName,
            reviewerImage: user?.photoURL,
            rating: data.rating,
            comment: data.comment,
        };

        axiosInstance.post('/review', reviewData)
            .then(res => {
                if (res.data.insertedId) {
                    chefToast.success('Review submitted successfully!')
                    refetch()
                    reset();

                }
            })
            .catch(error => {
                chefToast.error("Failed to post comment");
            });
    }










    return (
        <div className="max-w-6xl mx-auto p-6 md:p-10">
            {/* Meal Details Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 bg-base-100 rounded-xl shadow-lg p-6 md:p-10 border-2 border-accent">

                {/* Food Image */}
                <img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className="w-full md:w-1/2 h-auto rounded-xl object-cover shadow-md"
                />

                {/* Details */}
                <div className="flex flex-col justify-between w-full md:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-black text-accent">{meal.foodName}</h1>
                    <p className="text-gray-600 mt-2">{meal.ingredients?.join(', ')}</p>

                    <div className="mt-4">
                        <p className="text-lg font-medium"><span className='font-bold'>Chef: </span> {meal.chefName} (ID: {meal.chefId})</p>
                        <p className="text-lg font-medium"><span className='font-bold'>Price: ৳</span> {meal.price}</p>
                        <p className="text-lg font-medium"><span className='font-bold'>Rating: </span> {meal.rating}/5</p>
                        <p className="text-lg font-medium"><span className='font-bold'>Delivery Area: </span> {meal.deliveryArea}</p>
                        <p className="text-lg font-medium"><span className='font-bold'>Estimated Delivery: </span> {meal.estimatedDeliveryTime}</p>
                        <p className="text-lg font-medium"><span className='font-bold'>Chef Experience: </span> {meal.chefExperience}</p>
                    </div>

                    <Link to={`/order/${meal._id}`}><button className="btn btn-primary text-white bg-accent border-accent mt-6 w-full md:w-auto rounded-xl">Order Now</button></Link>
                </div>
            </div>




            {/* Reviews Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-primary mb-4">Customer Reviews</h2>
                <div className="space-y-4">
                    {reviews?.map(review => (
                        <div key={review._id} className="flex items-start gap-4 bg-base-200 p-4 rounded-lg shadow-sm">
                            <img src={review.reviewerImage} alt={review.reviewerName} className="w-12 h-12 rounded-full object-cover" />
                            <div className="flex-1">
                                <p className="font-semibold">{review.reviewerName} <span className='text-yellow-500'>{"★ ".repeat(review.rating)}</span></p>
                                <p className="text-gray-700">{review.comment}</p>
                                <p className="text-xs text-gray-500 mt-1">{new Date(review.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="mt-8 bg-base-100 p-6 rounded-xl shadow-md max-w-3xl mx-auto">
                <h3 className="text-xl font-bold text-primary mb-4">Leave a Review</h3>

                <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-4">

                    {/* Rating */}
                    <div>
                        <label className="block font-medium mb-1">Rating</label>
                        <select {...register('rating', { required: true })} className="input w-full">
                            <option value="">Select rating</option>
                            <option value={1}>1 ★</option>
                            <option value={2}>2 ★ ★</option>
                            <option value={3}>3 ★ ★ ★</option>
                            <option value={4}>4 ★ ★ ★ ★</option>
                            <option value={5}>5 ★ ★ ★ ★ ★</option>
                        </select>
                        {errors.rating && <p className="text-red-500 text-sm mt-1">Rating is required</p>}
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block font-medium mb-1">Comment</label>
                        <textarea
                            {...register('comment', { required: true })}
                            className="textarea w-full"
                            placeholder="Share your thoughts about this meal..."
                        ></textarea>
                        {errors.comment && <p className="text-red-500 text-sm mt-1">Comment is required</p>}
                    </div>

                    <button type="submit" className="btn button w-full rounded-xl">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default MealDetails;