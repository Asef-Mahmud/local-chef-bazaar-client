import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../Loader/Loader';
import { useQuery } from '@tanstack/react-query';

const AdminStatistics = () => {
    const axiosSecure = useAxiosSecure()

    const { data: userStats = [], isLoading: userLoading } = useQuery({
        queryKey: ['user-totalUsers-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/totalUsers/stats`)
            console.log('users:', res.data)
            return res.data
        },
    })


    const { data: paymentStats = [], isLoading: paymentLoading } = useQuery({
        queryKey: ['payments-totalPayments-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/totalPayments/stats`)
            console.log('payment:', res.data)
            return res.data
        },
    })



    const { data: orderStats = [], isLoading: statsLoading } = useQuery({
        queryKey: ['order-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/order-status/stats`)
            console.log(res.data)
            return res.data
        },
    })

    if (statsLoading || paymentLoading || userLoading) {
        return <Loader></Loader>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-primary mb-8 text-center">
                Platform Statistics
            </h1>

            <div className="stats shadow flex justify-center text-center">

                <div className="stat">
                    <div className="stat-figure text-secondary">...</div>
                    <div className="stat-title text-primary font-bold">Total Users</div>
                    <div className="stat-value text-accent font-black">{userStats}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">...</div>
                    <div className="stat-title text-primary font-bold">Total Payments</div>
                    <div className="stat-value text-accent font-black">৳ {paymentStats}</div>
                </div>

                {orderStats.map(stat => (
                    <div key={stat._id} className="stat">
                        <div className="stat-figure text-secondary">...</div>
                        <div className="stat-title text-primary font-bold">
                            ORDERS {stat._id.toUpperCase()}
                        </div>
                        <div className="stat-value text-accent font-black">
                            {stat.count}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default AdminStatistics;