import React from 'react';
import { Link, useRouteError } from 'react-router';
import useTitle from '../../hooks/useTitle';

const ErrorPage = () => {

    useTitle("Page Not Found");

    const error = useRouteError();
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://i.ibb.co.com/Q7L26bWF/photo-1499428665502-503f6c608263.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-lg text-center">

                <h1 className="text-6xl font-extrabold text-primary">404</h1>

                <h2 className="text-2xl font-semibold mt-2 text-gray-800">
                    Oops! Page Not Found
                </h2>

                <p className="text-gray-600 mt-3">
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                {error?.statusText && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                        {error.statusText}
                    </p>
                )}

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/"
                        className="btn btn-primary rounded-xl px-6"
                    >
                        Back to Home
                    </Link>

                    <Link
                        to="/meals"
                        className="btn btn-outline btn-primary rounded-xl px-6"
                    >
                        Explore Meals
                    </Link>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                    © {new Date().getFullYear()} LocalChefBazaar — Homemade with ❤️
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;