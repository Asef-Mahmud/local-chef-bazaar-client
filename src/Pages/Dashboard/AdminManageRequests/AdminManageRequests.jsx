import React from 'react';
import Loader from '../../../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { chefAlert } from '../../../utils/chefAlert';
import { chefToast } from '../../../utils/chefToast';

const AdminManageRequests = () => {

    const axiosSecure = useAxiosSecure()

    const { data: roles = [], isLoading, refetch } = useQuery({
        queryKey: ['role-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/role-requests`)

            return res.data
        }
    })


    if (isLoading) {
        <Loader></Loader>
    }

    const handleAccept = (id, role) => {
        chefAlert({
            title: "Approve Request?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, approve it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const info = {
                    requestType: role.requestType,
                    userEmail: role.userEmail,
                    requestStatus: role.requestStatus

                };

                axiosSecure
                    .patch(`/manage-requests/approve/${id}`, info)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            chefToast.success('Request Approved Successfully');
                            refetch();
                        } else {
                            chefToast.error('Approval failed');
                        }
                    })
                    .catch(error => {
                        chefToast.error("Something went wrong");
                    });
            }
        });
    };



    const handleReject = (id) => {
        chefAlert({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    //data to update
                    axiosSecure.patch(`/manage-requests/${id}`)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                chefToast.success('Request Rejected')
                                refetch();
                            }
                            else {

                                chefToast.error('Request Error');
                            }
                        })
                        .catch(error => {
                            chefToast.error(`Failed to reject request`);
                        });
                }
            });

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
                            <th>Request Type</th>
                            <th>Request Status</th>
                            <th>Request Time</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roles.map((role, index) =>
                                <tr key={role._id} className='border-b border-primary'>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3 my-3">
                                            <div className="font-bold">{role.userName}</div>
                                        </div>

                                    </td>
                                    <td>
                                        <div className="flex items-center mt-1">
                                            <td className='text-wrap'>{role.userEmail}</td>
                                        </div>
                                    </td>
                                    <td className='text-wrap'>{role.requestType}</td>

                                    <td><span className="whitespace-nowrap badge-warning font-bold">{role.requestStatus}</span></td>

                                    <td><span className="whitespace-nowrap badge-warning font-bold">{new Date(role.requestTime).toLocaleString()}</span></td>



                                    <td className='flex flex-row justify-center items-start gap-1'>
                                        {role.requestStatus === 'pending' ? (
                                            <>
                                                {/* Accept Button (Pass the request ID and Type for the backend logic) */}
                                                <button
                                                    onClick={() => handleAccept(role._id, role)}
                                                    className="btn btn-ghost btn-xs rounded-4xl hover:btn-primary hover:text-base-200 mt-2 border border-primary"
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    onClick={() => handleReject(role._id)}
                                                    className="btn btn-ghost btn-xs rounded-4xl hover:btn-error hover:text-base-200 mt-2 border border-primary">Reject
                                                </button>
                                            </>
                                        ) : (


                                            <span
                                                className={`whitespace-nowrap text-xs text-white mt-2 badge ${role.requestStatus === 'approved' ? 'badge-success' : 'badge-error'}`}>
                                                {role.requestStatus.toUpperCase()}
                                            </span>


                                        )}

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

export default AdminManageRequests;