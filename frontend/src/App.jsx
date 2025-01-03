import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error404 from './pages/Error404'

const App = () => {
  return (
    <div className='h-screen p-4'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App