import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useTitle from '../../../hooks/useTitle';

const AdminStatistics = () => {

    useTitle("Admin Statistics");


    const axiosSecure = useAxiosSecure()

    const { data: userStats = 0, isLoading: userLoading } = useQuery({
        queryKey: ['user-totalUsers-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/totalUsers/stats`)
            console.log('users:', res.data)
            return res.data
        },
    })


    const { data: paymentStats = 0, isLoading: paymentLoading } = useQuery({
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

    // Recharts:

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
    const pieData = orderStats.map(stat => ({
        name: stat._id.toUpperCase(),
        value: stat.count
    }))

    const paymentChartData = [
        {
            name: 'Payments',
            value: paymentStats
        }
    ]


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


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

                {/* Pie chart */}
                <div className="bg-base-100 shadow p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">
                        Orders by Status
                    </h2>

                    <div className="w-full h-[300px]">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                                    {/* BAr Chart */}
                <div className="bg-base-100 shadow p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">
                        Payments Overview
                    </h2>

                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={paymentChartData}
                                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>


    );
};

export default AdminStatistics;