import React from 'react'
import { Link } from 'react-router-dom'

const Notification = () => {
    return (
        <div className='flex flex-col items-center justify-center h-full mx-auto'>
            <img className='rounded-lg size-56' src='bg.png' />
            <div className='flex flex-col items-center justify-center text-lg font-bold'>
                <h1>You should have to sign in for this page</h1>
                <Link to='/login' className='btn btn-link'>Login</Link>
            </div>
        </div>
    )
}

export default Notification