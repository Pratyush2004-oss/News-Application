import React from 'react'
import { Link } from 'react-router-dom'
import { Data } from '../assets/SidebarData'

const Sidebar = () => {
    
    return (
        <>
            <div className='fonbol'>
                <h2 className='text-xl font-extrabold'>The Blog <span className='text-red-500'>Master</span></h2>
                <h2 className='my-1 text-sm'>Name</h2>
                <h2 className='my-1 text-sm'>Email</h2>
                <hr />
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