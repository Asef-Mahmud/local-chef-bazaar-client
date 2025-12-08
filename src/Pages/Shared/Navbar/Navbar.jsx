import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../../assets/logo.jpg'

const Navbar = () => {

    const links = <>
        <NavLink to='/' className='nav-item nav-link'>Home</NavLink>
        <NavLink to='/meals' className='nav-item nav-link'>Meals</NavLink>
        <NavLink to='/dashboard' className='nav-item nav-link'>Dashboard</NavLink>
    </>



    return (
        <div className="navbar bg-base-100 shadow-sm px-5 md:px-10 lg:px-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 z-999 rounded-box mt-3 w-52 p-2 shadow mr-4 gap-3">
                        {
                            links
                        }
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl font-extrabold"><img className='w-7 md:w-10 object-cover rounded-full border border-primary' src={logo} alt="Logo of the Company" />Local Chef Bazaar</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end gap-1 md:gap-3 lg:gap-4">
                <a className="btn button w-16 md:w-20 lg:w-27 text-xs md:text-sm md:font-bold bg-primary rounded-xl text-base-100">Login</a>
                <a className="btn button w-16 md:w-20 lg:w-27 text-xs md:text-sm md:font-bold bg-primary rounded-xl text-base-100">Register</a>
            </div>
        </div>
    );
};

export default Navbar;