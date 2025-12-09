import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {
    return (
        <div className='bg-base-100'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Toaster position="top-center" reverseOrder={false}/>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;