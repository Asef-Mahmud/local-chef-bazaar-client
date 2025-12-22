import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import { chefAlert } from '../../../utils/chefAlert';
import { chefToast } from '../../../utils/chefToast';
import useTitle from '../../../hooks/useTitle';

const AdminManageUsers = () => {

    useTitle("Manage Users - Admin")

    const axiosSecure = useAxiosSecure()

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)

            return res.data
        }
    })


    const handleMakeFraud = (id) => {
        chefAlert({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    //data to update
                    axiosSecure.patch(`/users/make-fraud/${id}`)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                chefToast.success('The user role has been set to Fraud')
                                refetch();
                            }
                            else {
                               
                                chefToast.error('User role not updated');
                            }
                        })
                        .catch(error => {

                            chefToast.error(`Failed to set user as Fraud`);
                        });
                }
            });

    }

    if (isLoading) {
        return <Loader></Loader>
    }




    return (
        <div className='max-w-[1600px] mx-auto px-3 md:px-10 py-5'>
            <div className='pb-5'>
                <h1 className='text-3xl md:text-4xl font-bold text-primary text-center my-3'>List of Users</h1>
            </div>

            {/* Info table */}
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr className='text-base-200 bg-primary'>
                            <th>Sl.No</th>
                            <th>Username</th>
                            <th>User Email</th>
                            <th>User Role</th>
                            <th>User Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id} className='border-b border-primary'>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3 my-3">
                                            <div className="font-bold">{user.userName}</div>
                                        </div>

                                    </td>
                                    <td>
                                        <div className="flex items-center mt-1">
                                            <td className='text-wrap'>{user.userEmail}</td>
                                        </div>
                                    </td>
                                    <td className='text-wrap'>{user.role}</td>

                                    <td><span className="whitespace-nowrap badge-warning font-bold">{user.status}</span></td>


                                    {
                                        user.role !== 'admin' && user.status === 'active' && 
                                        <td className='flex flex-col justify-center items-start gap-2'>
                                            <button onClick={() => handleMakeFraud(user._id)} className="btn btn-ghost btn-xs rounded-4xl hover:btn-primary hover:text-base-200 mt-2 border border-primary">Make Fraud</button>
                                        </td>
                                    }

                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminManageUsers;