import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router';
import Loader from '../../Loader/Loader';

const MealDetails = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

    const { data: meal = [], isLoading } = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal-details/${id}`)
            return res.data

        }
    })

    if (isLoading) {
        return <Loader></Loader>
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

                    <button className="btn btn-primary text-white bg-accent border-accent mt-6 w-full md:w-auto rounded-xl">Order Now</button>
                </div>
            </div>


        </div>
    );
};

export default MealDetails;