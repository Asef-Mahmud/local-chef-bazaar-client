import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { chefToast } from '../../../utils/chefToast';
import { chefAlert } from '../../../utils/chefAlert';
import Loader from '../../../Loader/Loader';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';

const MyFav = () => {

    useTitle("Favorites")

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()


    const { data: myFavs = [], isLoading, refetch } = useQuery({
        queryKey: ['my-fav', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-favs/${user.email}`)

            return res.data
        }
    })

    //delete
    const handleDeleteFav = (id) => {
        chefAlert({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
        }).then((result) => {
            if (result.isConfirmed) {

                //  data to delete
                axiosSecure.delete(`/delete-fav/${id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            chefToast.success('Removed from Favorites successfully')
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

    if(isLoading){
        return <Loader></Loader>
    }



    return (
        <div className='max-w-[1600px] mx-auto px-3 md:px-10 py-5'>
            <div className='pb-5'>
                <h1 className='text-3xl md:text-4xl font-bold text-primary text-center my-3'>Favorite List</h1>
            </div>

            {/* Info table */}
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr className='text-base-200 bg-primary'>
                            <th>Sl.No</th>
                            <th>Meal Name</th>
                            <th>Price</th>
                            <th>Chef Name</th>
                            <th>Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myFavs.map((myFav, index) =>
                                <tr key={myFav._id} className='border-b border-primary'>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3 my-3">
                                            <div className="font-bold">{myFav.mealName}</div>
                                        </div>

                                    </td>
                                    <td>
                                        <div className="flex items-center mt-1">
                                            <td className='text-wrap'>{myFav.price}</td>
                                        </div>
                                    </td>
                                    <td className='text-wrap'>{myFav.chefName}</td>

                                    <td><span className="whitespace-nowrap badge-warning font-bold">{new Date(myFav.addedTime).toLocaleDateString()}</span></td>



                                    <td className='flex flex-col justify-center items-start gap-2'>
                                        <button onClick={() => handleDeleteFav(myFav._id)} className="btn btn-ghost btn-xs rounded-4xl hover:btn-primary hover:text-base-200 mt-2 border-2">Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyFav;