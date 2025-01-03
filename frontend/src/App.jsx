import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error404 from './pages/Error404'
import AllNews from './pages/AllNews'
import Favourites from './pages/Favourites'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Featured from './pages/Featured'

const App = () => {
  return (
    <div className='h-screen p-4'>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<AllNews />} />
          <Route path='/favourite' element={<Favourites />} />
          <Route path='/featured' element={<Featured />} />
          <Route path='*' element={<Error404 />} />
        </Route>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App