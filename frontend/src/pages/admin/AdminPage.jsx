import React from 'react'
import { useAuthStore } from '../../store/authStore'

const AdminPage = () => {
  const { isAdmin } = useAuthStore();

  if (!isAdmin) {
    return (
      <div className='flex items-center justify-center h-[80vh]'>
        <h1>You are not admin</h1>
      </div>
    )
  }
  return (
    <div className='p-3 bg-red-50 h-[80vh] rounded-lg shadow-sm'>
    
    </div>
  )
}

export default AdminPage