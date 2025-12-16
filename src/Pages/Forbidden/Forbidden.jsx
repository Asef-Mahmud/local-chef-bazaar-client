import React from 'react';
import { MdBlock } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-5">
            
            {/* Icon */}
            <MdBlock className="text-[#C9A86A] text-8xl mb-6" />

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Access Restricted
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed">
                This area is reserved for authorized users only.  
                Please make sure you have the correct permissions to continue.
            </p>

            {/* Action */}
            <Link 
                to="/"
                className="mt-8 px-8 py-3 bg-[#C9A86A] text-black rounded-xl font-semibold hover:brightness-95 transition"
            >
                Return to Home
            </Link>
        </div>
    );
};

export default Forbidden;