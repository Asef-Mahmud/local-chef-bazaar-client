import React from 'react';
import { Link, Outlet } from 'react-router';
import logo from '../assets/logo.jpg'
import { FaBowlFood, FaBowlRice, FaChartArea, FaCircleExclamation, FaComment, FaComments, FaExclamation, FaHeart, FaHouse, FaHouseChimneyUser, FaHouseUser, FaRegCircleQuestion, FaRegComment, FaRegStar, FaUser, FaUserCheck, FaUsers, FaUserShield } from 'react-icons/fa6';
import useRole from '../hooks/useRole';
import Footer from '../Pages/Shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {

    const { role } = useRole()

    return (
        <div>
            <div className="drawer lg:drawer-open mb-10">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar bg-secondary w-full text-primary">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <Link to='/' className="btn btn-ghost text-[15px] md:text-xl font-extrabold -ms-6 md:ms-0"><img className='w-7 md:w-10 object-cover rounded-full border border-primary' src={logo} alt="Logo of the Company" />Local Chef Bazaar Dashboard</Link>
                    </nav>


                    {/* Page content here */}
                    <Outlet></Outlet>
                    <Toaster position="top-center" reverseOrder={false}/>
                </div>



                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* Home */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <Link to='/'><FaHouse></FaHouse></Link>
                                    <Link to='/'><span className="is-drawer-close:hidden">Homepage</span></Link>
                                </button>
                            </li>

                            {/* My Profile */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                    {/* Home icon */}
                                    <Link to='/dashboard/my-profile'><FaUser /></Link>
                                    <Link to='/dashboard/my-profile'><span className="is-drawer-close:hidden">My Profile</span></Link>
                                </button>
                            </li>

                            {
                                role === 'user' &&

                                <>
                                    {/* Orders */}
                                    <li>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Orders">
                                            {/* Home icon */}
                                            <Link to='/dashboard/my-orders'><FaBowlRice /></Link>
                                            <Link to='/dashboard/my-orders'><span className="is-drawer-close:hidden">My Orders</span></Link>
                                        </button>
                                    </li>

                                    {/* Reviews*/}
                                    <li>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Reviews">
                                            {/* Home icon */}
                                            <Link to='/dashboard/my-reviews'><FaRegComment /></Link>
                                            <Link to='/dashboard/my-reviews'><span className="is-drawer-close:hidden">My Reviews</span></Link>
                                        </button>
                                    </li>


                                    {/* Fav Meal */}
                                    <li>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Favorite Meals">
                                            {/* Home icon */}
                                            <Link to='/dashboard/my-fav'><FaRegStar /></Link>
                                            <Link to='/dashboard/my-fav'><span className="is-drawer-close:hidden">My Favorite Meals</span></Link>
                                        </button>
                                    </li>

                                </>

                            }






                            {/* Chef Dashboard Links */}

                            {
                                role === "chef" &&
                                <>
                                    {/* Create Meal */}
                                    <li>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Create Meal">

                                            <Link to='/dashboard/create-meal'><FaBowlFood /></Link>
                                            <Link to='/dashboard/create-meal'><span className="is-drawer-close:hidden">Create Meal</span></Link>
                                        </button>
                                    </li>


                                    {/* My Meals */}
                                    <li>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Meals">

                                            <Link to='/dashboard/my-meals'><FaBowlRice /></Link>
                                            <Link to='/dashboard/my-meals'><span className="is-drawer-close:hidden">My Meals</span></Link>
                                        </button>
                                    </li>


                                    {/* Order Requests */}
                                    <li>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Order Requests">

                                            <Link to='/dashboard/order-requests'><FaCircleExclamation /></Link>
                                            <Link to='/dashboard/order-requests'><span className="is-drawer-close:hidden">Order Requests</span></Link>
                                        </button>
                                    </li>

                                </>
                            }



                            {/* Admin Dashboard Links */}

                            {
                                role === "admin" &&

                                <>
                                    {/* Manage Users*/}
                                    <li>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">

                                            <Link to='/dashboard/manage-users'><FaUsers></FaUsers></Link>
                                            <Link to='/dashboard/manage-users'><span className="is-drawer-close:hidden">Manage Users</span></Link>
                                        </button>
                                    </li>

                                    {/* Manage Request*/}
                                    <li>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Requests">

                                            <Link to='/dashboard/manage-requests'><FaUserCheck /></Link>
                                            <Link to='/dashboard/manage-requests'><span className="is-drawer-close:hidden">Manage Requests</span></Link>
                                        </button>
                                    </li>


                                    {/* Platform Statistics*/}
                                    <li>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Platform Statistics">

                                            <Link to='/dashboard/statistics'><FaChartArea /></Link>
                                            <Link to='/dashboard/statistics'><span className="is-drawer-close:hidden">Platform Statistics</span></Link>
                                        </button>
                                    </li>
                                </>
                            }



                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;