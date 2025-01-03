import React from 'react'
import { Outlet } from 'react-router-dom'
import MiniSideBar from '../components/MiniSideBar'
import Sidebar from '../components/Sidebar'
import NewsDialog from '../components/NewsDialog'

const Home = () => {
  return (
    <div className='flex h-[90vh] gap-4'>
      <div className='flex-col justify-between hidden w-1/6 p-4 border border-gray-500 rounded-xl lg:flex'><Sidebar /></div>
      <div className='lg:hidden'><MiniSideBar /></div>
      <div className='z-10 w-full p-4 border border-gray-500 lg:w-5/6 rounded-xl'>
        <NewsDialog />
        <Outlet />
      </div>
    </div>
  )
}

export default Home