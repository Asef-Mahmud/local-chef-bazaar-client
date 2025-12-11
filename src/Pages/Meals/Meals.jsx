import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Loader/Loader';
import { chefToast } from '../../utils/chefToast';
import { Link } from 'react-router';

const Meals = () => {

    const axiosInstance = useAxios()

    const [order, setOrder] = useState('')



    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['meals', order],
        queryFn: async () => {
            const res = await axiosInstance.get(`/meals?order=${order}`);
            // console.log(res.data)
            return res.data;

        },
    });

    if (isLoading) {
        return <Loader></Loader>
    }


    // Sorting
    const handleSort = (newOrder) => {
        setOrder(newOrder)
    }


    return (
        <div className="bg-secondary min-h-screen py-10 px-5 md:px-10">
            <h1 className="text-2xl md:text-4xl font-extrabold text-center text-primary">
                Daily Meals
            </h1>

            <p className="text-justify md:text-center text-gray-600 max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto mt-3 mb-10">
                Explore our delicious daily meals prepared by local chefs! Browse through a variety of homemade dishes, check prices, ratings, and delivery areas, and click “See Details” to order your favorite meals. Fresh, tasty, and made with love—right to your doorstep.
            </p>


            {/* Sorting Button */}
            <div className="dropdown dropdown-end flex justify-center lg:justify-end pb-5">
                <div tabIndex={0} role="button" className="btn btn-sm btn-primary text-base-100 rounded-xl px-3">
                    Sort by Price
                </div>

                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-xl z-20 w-50 p-2 shadow-md">
                    <li>
                        <button onClick={() => handleSort('asc')}>
                            Price ↑ Ascending
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleSort('desc')}>
                            Price ↓ Descending
                        </button>
                    </li>
                </ul>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {meals.map((meal) => (
                    <div
                        key={meal._id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                    >
                        {/* Food Image */}
                        <div className="h-48 w-full overflow-hidden">
                            <img
                                src={meal.foodImage}
                                alt={meal.foodName}
                                className="h-full w-full object-cover hover:scale-105 transition duration-500"
                            />
                        </div>

                        {/* Meal Info */}
                        <div className="p-5 flex flex-col gap-2">
                            <h2 className="text-lg font-bold text-gray-900">{meal.foodName}</h2>
                            <p className="text-gray-600 text-sm"><span className='font-bold'>By: </span>{meal.chefName} ({meal.chefId})</p>
                            <p className="text-accent font-bold text-lg"><span className='font-bold'>৳</span>{meal.price}</p>
                            <p className="text-gray-500 text-sm"><span className='font-bold'>Rating:</span> {meal.rating}/5</p>
                            <p className="text-gray-500 text-sm"><span className='font-bold'>Delivery Area:</span> {meal.deliveryArea}</p>


                            {/* View Details Button */}
                            <Link to={`/meal-details/${meal._id}`}><button className="mt-3 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition w-full font-bold">View Details</button></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Meals;