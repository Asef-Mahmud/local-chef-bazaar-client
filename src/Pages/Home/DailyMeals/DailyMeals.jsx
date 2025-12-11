import React, { useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../Loader/Loader';
import { useQuery } from '@tanstack/react-query';

const DailyMeals = () => {

    const axiosInstance = useAxios()


    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['latestMeals'],
        queryFn: async () => {
            const res = await axiosInstance.get('/latest-meals');
            console.log(res.data)
            return res.data;

        },
        refetchInterval: 5000,
    });

    if(isLoading){
        return <Loader></Loader>
    }


    return (
        <div className='text-accent py-10 md:py-20 px-5 md:px-10 shadow-lg'>
            <h3 className='text-2xl md:text-4xl font-bold text-center mb-5'>Daily Specials from Local Chefs</h3>
            <p className='text-center text-sm md:text-[16px] mx-10 md:mx-0 mb-15'>Explore today's home-made specials crafted by passionate local cooks. <br /></p>

            {/* Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((meal, index) => (
                    <div
                        key={index}
                        className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:-translate-y-1 hover:shadow-xl transition duration-300"
                    >
                        {/* Image */}
                        <div className="h-40 w-full overflow-hidden">
                            <img
                                src={meal.foodImage}
                                alt={meal.foodName}
                                className="h-full w-full object-cover hover:scale-105 transition duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">{meal.foodName}</h3>
                            <p className="text-sm text-gray-600">
                                By <span className="font-medium text-gray-800">{meal.chefName}</span>
                            </p>
                            <div className="text-xl font-bold text-[#C9A86A]">৳{meal.price}</div>
                            <p className="text-sm text-gray-500">{meal.deliveryArea}</p>
                            <button className="w-full py-2 rounded-xl bg-accent text-black hover:bg-secondary hover:text-primary hover:border hover:border-primary hover:-translate-0.5 font-semibold mt-2 hover:brightness-95 transition hover:cursor-pointer">
                                Order Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyMeals;