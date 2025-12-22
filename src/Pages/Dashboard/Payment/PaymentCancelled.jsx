import React from 'react';
import { FaCircle } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 to-red-200 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">

                <MdCancel className="h-20 w-20 text-red-500 mx-auto animate-spin" />

                <h1 className="text-3xl font-bold text-red-600 mt-4">
                    Payment Cancelled
                </h1>

                <p className="text-gray-600 mt-3">
                    Your payment was not completed. No charges were made.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <Link
                        to="/dashboard/my-orders"
                        className="btn btn-error text-white w-full"
                    >
                        Try Again
                    </Link>

                    <Link
                        to="/"
                        className="btn btn-outline btn-error w-full"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default PaymentCancelled;