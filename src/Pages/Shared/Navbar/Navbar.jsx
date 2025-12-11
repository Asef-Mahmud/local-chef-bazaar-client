import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../../assets/logo.jpg'
import useAuth from '../../../hooks/useAuth';
import { FaUser } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';
import { chefToast } from '../../../utils/chefToast';

const Navbar = () => {

    const { user, loading, signOutUser } = useAuth()

    const links = <>
        <NavLink to='/' className='nav-item nav-link'>Home</NavLink>
        <NavLink to='/meals' className='nav-item nav-link'>Meals</NavLink>
        {
            user && <NavLink to='/dashboard' className='nav-item nav-link'>Dashboard</NavLink>
        }

    </>


    // Logout User

    const handleSignOut = () => {

        signOutUser()
        .then(() => {
            chefToast.success('Logout Successful!')
        })
        .catch((error) => {
            chefToast.error(error.message)
        })

    }

    


    return (
        <div className="navbar bg-base-100 shadow-sm px-3 md:px-10 lg:px-12 sticky top-0 z-50">
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
                <Link to='/' className="btn btn-ghost text-[15px] md:text-xl font-extrabold -ms-6 md:ms-0"><img className='w-7 md:w-10 object-cover hover:animate-bounce rounded-full border border-primary' src={logo} alt="Logo of the Company" />Local Chef Bazaar</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end gap-1 md:gap-3 lg:gap-4">
                {
                    loading ?
                        <span className="loading loading-ring text-primary loading-xs"></span>

                        :

                        user ?
                            <>
                                <div>

                                    {user && user.photoURL ?
                                        <img
                                            className='w-10 h-10 p-1 rounded-full border-2 border-primary object-cover'
                                            src={user?.photoURL}
                                            alt="user image"
                                            data-tooltip-id="userTip"
                                            data-tooltip-content={user?.displayName || "No Name"}
                                        />
                                        :
                                        <div data-tooltip-id="userTip" data-tooltip-content={user.displayName || "No Name"} >
                                            <FaUser className='w-10 h-10 p-1 rounded-full border-2 text-primary border-primary object-cover'></FaUser>
                                        </div>
                                    }
                                </div>

                                {/* Logout Button */}
                                <button onClick={handleSignOut} className="btn w-14 md:w-20 lg:w-27 text-xs md:text-sm md:font-bold bg-accent text-base-100 border-accent rounded-xl">Logout</button>

                                <Tooltip id="userTip" place="bottom" effect="solid" style={{ color: '#F5F5F5', fontWeight: 'bold', backgroundColor: '#1A1A1A' }} />
                            </>
                            :
                            (
                                <>
                                    <Link to='/login' className="btn button w-14 md:w-20 lg:w-27 text-xs md:text-sm md:font-bold bg-primary rounded-xl text-base-100">Login</Link>
                                    <Link to='/register' className="btn button w-14 md:w-20 lg:w-27 text-xs md:text-sm md:font-bold bg-primary rounded-xl text-base-100">Register</Link>
                                </>

                            )

                }

            </div>
        </div>
    );
};

export default Navbar;