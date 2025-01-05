import React from 'react'
import { Link } from 'react-router-dom'
import { Data } from '../assets/SidebarData'
import { useAuthStore } from '../store/authStore'

const Sidebar = () => {
    const { user } = useAuthStore();

    return (
        <>
            <div className='font-bold'>
                <h2 className='text-xl font-extrabold'>THE FLASH <span className='text-red-500'>NEWS</span></h2>
                {
                    user && (
                        <div>
                            <h2 className='my-1 text-sm'>Name</h2>
                            <h2 className='my-1 text-sm'>Email</h2>
                            <hr />
                        </div>
                    )
                }
            </div>
            <div>
                {Data.map((item, idx) => (
                    <Link to={item.link} className='flex items-center gap-4 p-2 m-2 transition-all duration-300 rounded-md hover:bg-gray-200' key={idx}> <item.icon /> {item.title}</Link>
                ))}
            </div>
            <div className=''>
                {
                    user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    ) : (
                        <Link to={'/login'} className='w-full border-none btn btn-outline'>Login</Link>
                    )
                }

            </div>
        </>
    )
}

export default Sidebar