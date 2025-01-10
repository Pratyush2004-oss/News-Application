import React, { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error404 from './pages/Error404'
import AllNews from './pages/AllNews'
import Favourites from './pages/Favourites'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Featured from './pages/Featured'
import NewsPage from './pages/News/[NewsId]/page'
import { useAuthStore } from './store/authStore'
import { useNewsStore } from './store/newsStore'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated && !user) {
    return <Navigate to='/notification' replace />;
  }
  return children;
}

const RestrictedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user) {
    return <Navigate to='/' replace />;
  }
  return children;
}


const App = () => {
  const { isAuthenticated, user, check_user, check_admin, logout, isAdmin } = useAuthStore();
  const { fetchNewsFromAPI } = useNewsStore();
  useEffect(() => {
    if (!isAuthenticated && !user) {
      check_user();
    }
  }, [check_user])

  useEffect(() => {
    if (!isAdmin && user) {
      check_admin();
    }
  }, [check_admin])

  useEffect(() => {

    fetchNewsFromAPI();
  }, [fetchNewsFromAPI])


  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (error) {

    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div className='h-screen p-4'>
      <nav className='flex items-center justify-between p-2'>
        <Link to='/' className='text-3xl font-bold'>News <span className='text-red-500'>App</span> </Link>
        {
          user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="z-50 border-4 border-black menu menu-sm dropdown-content rounded-box w-52 bg-red-50">
                <button className='w-full border-none btn btn-outline btn-sm' disabled={loading} onClick={handleLogout}>{loading ? <span className='loading loading-infinity'></span> : 'Logout'}</button>
              </ul>
            </div>
          ) : (
            <Link to='/login' className='btn btn-outline btn-sm'>Login</Link>
          )
        }
      </nav>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<AllNews />} />
          <Route path='/favourite' element={<Favourites />} />
          <Route path='/featured' element={<Featured />} />
          <Route path='/news/:id' element={<NewsPage />} />
          <Route path='*' element={<Error404 />} />
        </Route>
        <Route path='/login' element={
          <RestrictedRoute>
            <Login />
          </RestrictedRoute>
        } />
        <Route path='/signup' element={
          <RestrictedRoute>
            <Signup />
          </RestrictedRoute>} />
      </Routes>
    </div>
  )
}

export default App