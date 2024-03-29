import { FiMenu } from 'react-icons/fi';

import { AiFillCloseCircle } from 'react-icons/ai';

import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer';

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../Redux/Slices/AuthSlice';

function HomeLayout(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking if user logged in
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    // for displaying options according to the role
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }

    async function handleLogout(e) {
        e.preventDefault();
        const res = await dispatch(logout());
        if(res?.payload?.success)
        navigate("/");
    }

    return (
        <div className="min-h-[90vh] bg-gray-900 text-white">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"}
                            className='font-bold text-white m-4'
                        />
                    </label>
                </div>
                <div className='drawer-side w-0'>
                    <label htmlFor="my-drawer" className='drawer-overlay'></label>
                    <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-gray-700 text-base-content relative text-white">
                        <li className='w-fit absolute right-2 z-50'>
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>

                        <div className="flex flex-col space-y-2">
                            <li>
                                <Link to="/">Home</Link>
                            </li>

                            {isLoggedIn && role === 'ADMIN' && (
                                <li>
                                    <Link to="/admin/dashboard"> Admin DashBoard</Link>
                                </li>
                            )}

                            <li>
                                <Link to="/hospitals">All Hospital</Link>
                            </li>

                            <li>
                                <Link to="/contact">Contact Us</Link>
                            </li>

                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                        </div>

                        <div className="bottom-buttons mt-auto">
                            {!isLoggedIn && (
                                <div className="flex justify-center space-x-12">
                                    <button className='btn btn-primary px-8 py-4 font-semibold rounded-md'>
                                        <Link to="/login">Login</Link>
                                    </button>
                                    <button className='btn btn-secondary px-8 py-4 font-semibold rounded-md'>
                                        <Link to="/signup">Signup</Link>
                                    </button>
                                </div>
                            )}
                        
                        {isLoggedIn && (
                            <div className='flex justify-center space-x-12'>
                                <button className='btn btn-primary px-8 py-4 font-semibold rounded-md'>
                                    <Link to="/user/profile">Profile</Link>
                                </button>
                                <button className='btn btn-secondary px-8 py-4 font-semibold rounded-md'>
                                    <Link onClick={handleLogout}>Logout</Link>
                                </button>
                            </div>
                        )}
                    </div>
                    </ul>
                </div>
            </div>
            {props.children}
            <Footer />
        </div>
    );
}

export default HomeLayout;
