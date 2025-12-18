import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../Loader/Loader';
import { chefToast } from '../../../utils/chefToast';

const MyProfile = () => {

    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()
    console.log(user)

    const { data: profile = {}, isLoading } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data
        },

    })

    const handleRoleRequest = (profile, roleType) => {
        const requestData = {
            userName: profile.userName,
            userEmail: profile.userEmail,
            requestType: roleType, 
        };

        axiosSecure.post('/role-requests', requestData)
            .then(res => {
                if (res.data.insertedId) {
                    console.log(res.data)
                    chefToast.success(
                        "Success!",
                        `${roleType === "chef" ? "Chef" : "Admin"} request sent successfully!`,
                        "success"
                    );
                }
            })
            .catch(() => {
                chefToast.error('Request Already exists');
            });
    };

    if (isLoading) {
        return <Loader></Loader>
    }

    console.log(profile)

    return (
        <div className="max-w-4xl md:mx-auto mt-5 border border-accent bg-base-100 mx-3 rounded-2xl shadow-lg hover:shadow-xl transition p-6 md:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mx-3">
                <img
                    src={profile.userImage}
                    alt="User"
                    className="w-28 h-28 rounded-full object-cover border-4 border-primary"
                />

                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-800">{profile.userName}</h2>
                    <p className="text-gray-500">{profile.userEmail}</p>

                    <div className="mt-2 flex justify-center md:justify-start font-bold gap-3">
                        <span className="px-3 py-1 rounded-full text-sm bg-secondary text-primary border border-primary">
                            {profile.role}
                        </span>

                        <span
                            className={`px-3 py-1 rounded-full font-bold text-sm ${profile.status === 'active'
                                ? 'bg-accent text-base-100 border-base-100'
                                : 'bg-red-100 text-red-600 border-red-600'
                                }`}
                        >
                            {profile.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t"></div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-700">
                <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{profile.userAddress}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">User Role</p>
                    <p className="font-medium capitalize">{profile.role}</p>
                </div>

                {profile.role === 'chef' && (
                    <div>
                        <p className="text-sm text-gray-500">Chef ID</p>
                        <p className="font-medium text-primary">{profile.chefId}</p>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
                {profile.role === 'user' && (
                    <>
                        <button onClick={() => handleRoleRequest(profile, "chef")} className="button px-6 py-2 rounded-xl bg-primary text-white font-semibold hover:cursor-pointer hover:opacity-90 transition">
                            Be a Chef
                        </button>

                        <button onClick={() => handleRoleRequest(profile, "admin")} className="px-6 py-2 rounded-xl border border-primary text-primary font-semibold hover:cursor-pointer hover:bg-primary hover:text-white transition">
                            Be an Admin
                        </button>
                    </>
                )}

                {profile.role === 'chef' && (
                    <button className="px-6 py-2 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition">
                        Be an Admin
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;