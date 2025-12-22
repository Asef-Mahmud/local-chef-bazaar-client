import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import { useParams } from 'react-router';
import useTitle from '../../../hooks/useTitle';

const Payment = () => {

    useTitle("Payment")

    const axiosSecure = useAxiosSecure();
    const {orderId}= useParams()
    

    const {isLoading, data: order} = useQuery({
        queryKey: ['orders', orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/payment/${orderId}`)
            console.log(order)
            return res.data
        }
    })

    if(isLoading){
        return <Loader></Loader>
    }


    return (
        <div className='text-black mt-10 ml-10'>
            <h2>You are paying for {order[0].mealName}</h2>
        
            <button className='btn button mt-5'>Please Pay </button>
        </div>
    );
};

export default Payment;