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
        </>
    )
}

export default Sidebar