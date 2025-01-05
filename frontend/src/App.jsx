import React, { useEffect } from 'react'
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
import Notification from './pages/auth/Notification'

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
  const { isAuthenticated, user, check_user, check_admin } = useAuthStore();
  useEffect(() => {
    if (isAuthenticated && !user) {
      check_user();
      check_admin();
    }
  }, [user, check_user, check_admin])
  return (
    <div className='h-screen p-4'>
      <nav className='flex items-center justify-between p-2'>
        <Link to='/' className='text-3xl font-bold'>News <span className='text-red-500'>App</span> </Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<AllNews />} />
          <Route path='/favourite' element={
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          } />
          <Route path='/featured' element={<Featured />} />
          <Route path='/news/:id' element={<NewsPage />} />
          <Route path='/notification' element={<Notification />} />
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