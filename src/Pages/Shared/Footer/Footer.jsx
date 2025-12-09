import React from 'react';
import logo from '../../../assets/logo.jpg'
import { FaFacebook, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div>
            <footer className="bg-primary text-secondary p-5 text-center border-t-4 border-t-primary py-10 font-bold" data-aos="fade-up">

                <div>
                    <img className='mx-auto mb-4 w-10 md:w-15 object-cover rounded-full border-2 border-yellow-950 transition-all duration-300 hover:scale-110 hover:text-primary' src={logo} alt="Logo of the Company" />
                    <p className="mt-5 mb-2 italic text-sm opacity-75">“Homemade Meals, Delivered Fresh.”</p>
                    
                    
                    <p className='mb-5'>© 2025 Local Chef Bazaar. All rights reserved.</p>
                    
                    <hr className='border hidden md:block mx-10 md:mx-28 lg:mx-64 text-center mb-7 border-white'/>
                    <ul className="flex justify-center gap-4 mt-2">
                        <li><a href="https://x.com/" target='_blank'><FaXTwitter className='w-6 h-6 opacity-75 hover:opacity-100 hover:scale-125 transition-all duration-300' /></a></li>
                        <li><a href="https://www.youtube.com/" target='_blank'><FaYoutube className='w-6 h-6 opacity-75 hover:opacity-100 hover:scale-125 transition-all duration-300' /></a></li>
                        <li><a href="https://www.facebook.com/" target='_blank'><FaFacebook className='w-6 h-6 opacity-75 hover:opacity-100 hover:scale-125 transition-all duration-300' /></a></li>

                    </ul>
                </div>

                <div className='flex flex-col items-center justify-between gap-5 md:flex-row md:justify-evenly md:items-end mt-10'>
                    <div className='text-center md:text-left'>

                        <h1 className='font-bold'>Contact Us</h1>
                        <h2 className='font-light'>
                            +880 1234-567890
                            <br />
                            support@localchefbazaar.com
                            <br />
                            Dhaka, Bangladesh
                        </h2>
                    </div>

                    <div className='text-center md:text-right'>
                        <h1 className='font-bold'>Working Hours</h1>
                        <h3 className='font-light'>
                            Mon-Fri: 9:00 AM - 10:00 PM <br />
                            Saturday: 10:00 AM - 10:00 PM <br />
                            Sunday: Closed
                        </h3>
                    </div>
                </div>

            </footer>
        </div>

    );
};

export default Footer;