import React from 'react';
import { FaCartShopping, FaDollarSign, FaUserGroup } from 'react-icons/fa6';



const steps = [
    {
        id: 1,
        title: "Browse Meals",
        description: "Explore a wide variety of home-cooked meals prepared by local chefs near you.",
        icon: <FaCartShopping className="h-12 w-12 text-[#C9A86A]" />,
    },

    {
        id: 2,
        title: "Place Your Order",
        description: "Select your favorite meals, add them to your cart, and order with a simple click.",
        icon: <FaUserGroup className="h-12 w-12 text-[#C9A86A]" />,
    },
    {
        id: 3,
        title: "Enjoy & Support",
        description: "Receive your fresh meals at home and support passionate local chefs in your community.",
        icon: <FaDollarSign className="h-12 w-12 text-[#C9A86A]" />,
    },
];



const HowItWorks = () => {

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
                    How It Works
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Ordering from LocalChefBazaar is simple and fun. Follow these easy steps to enjoy your favorite homemade meals.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="bg-white hover:bg-accent/20 border border-accent rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
                    >
                        <div className="mb-5">{step.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default HowItWorks;