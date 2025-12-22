import React, { useEffect, useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTitle from '../../../hooks/useTitle';

const PaymentSuccess = () => {

    useTitle("Payment Success")

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id')
    const [transactionId, setTransactionId] = useState()
    console.log(sessionId)
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data)
                setTransactionId({
                    transactionId: res.data.transactionId
                })
            })
        }
    }, [axiosSecure, sessionId])

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 to-green-200 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">

                <FaCircleCheck className="h-20 w-20 text-green-500 mx-auto animate-bounce" />

                <h1 className="text-3xl font-bold text-green-600 mt-4">
                    Payment Successful!
                </h1>

                <p className="text-gray-600 mt-3">
                    Thank you for your order. Your payment has been processed successfully.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <Link
                        to="/dashboard/my-orders"
                        className="btn btn-success text-white w-full"
                    >
                        View My Orders
                    </Link>

                    <Link
                        to="/"
                        className="btn btn-outline btn-success w-full"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;