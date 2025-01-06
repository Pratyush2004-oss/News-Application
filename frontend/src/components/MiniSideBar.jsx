import React from 'react'
import { Data } from "../assets/SidebarData"
import { Link } from 'react-router-dom'
import { LogIn, Menu } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const MiniSideBar = () => {
    const { user } = useAuthStore();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="flex flex-col h-[90vh] drawer-content gap-10 items-center relative">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="my-2 btn btn-outline drawer-button lg:hidden">
                    <Menu />
                </label>
                <div className='flex flex-col my-2 lg:hidden h-[40vh] justify-evenly'>
                    {Data.map((item, idx) => (
                        <Link key={idx} to={item.link} className='btn btn-outline'><item.icon /></Link>
                    ))}
                </div>
            </div>
            <div className="z-20 drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="min-h-full p-4 menu bg-base-200 text-base-content w-80">
                    {/* Sidebar content here */}
                    <div className='h-[80vh] p-3 flex flex-col justify-between relative'>
                        <div className='font-bold'>
                            <h2 className='text-xl font-extrabold'>THE FLASH <span className='text-red-500'>NEWS</span></h2>
                            {
                                user && (
                                    <div>
                                        <h2 className='my-1 text-sm'>{user.fullName}</h2>
                                        <h2 className='my-1 text-sm'>{user.email}</h2>
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
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniSideBar