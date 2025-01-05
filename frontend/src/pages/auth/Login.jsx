import { KeyRound, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Login = () => {
  const { login } = useAuthStore();
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const handleSubmit = () => { 
    if(!input.email || !input.password){
      alert('Please fill all the fields')
      return
    }
    login(input);
  };
  return (
    <div className='flex items-center justify-center h-[90vh] mx-auto'>
      <div className='flex flex-col items-center p-5 rounded-lg shadow-lg sm:w-2/3'>
        <h1 className='w-full text-2xl font-bold text-center border-b-4 border-black'>Login</h1>
        <div className='w-full my-2'>
          <label className="flex items-center gap-5 input validator">
            <Mail />
            <input type="email" value={input.email} placeholder="mail@site.com" required onChange={(e) => setInput({ ...input, email: e.target.value })} />
          </label>
          <div className="hidden text-xs validator-hint">Enter valid email address</div>
        </div>
        <div className='w-full my-2'>
          <label className="flex items-center gap-5 input validator">
            <KeyRound />
            <input type="password" value={input.password} required onChange={(e) => setInput({ ...input, password: e.target.value })} placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
          </label>
          <p className="hidden text-xs validator-hint">
            Must be more than 8 characters, including
            <br />At least one number
            <br />At least one lowercase letter
            <br />At least one uppercase letter
          </p>
        </div>
        <div className='w-full my-2'>
          <button className='w-full rounded-full btn-success btn btn-sm' onClick={handleSubmit}>Login</button>
        </div>
        <div className='text-xs'>
          <span>Don't have an account? <Link to={'/signup'} className='font-bold text-blue-600 underline underline-offset-2'>Signup</Link></span>
        </div>

      </div>
    </div>

  )
}

export default Login