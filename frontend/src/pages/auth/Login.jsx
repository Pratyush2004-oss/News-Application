import { KeyRound, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Login = () => {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const Navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await login(input);
      if(res){
        Navigate('/');
        setInput({ email: '', password: '' });
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex items-center justify-center h-[90vh] mx-auto'>
      <div className='flex flex-col items-center p-5 rounded-lg shadow-lg sm:w-2/3 md:w-1/2'>
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
            <input type="password" value={input.password} required onChange={(e) => setInput({ ...input, password: e.target.value })} placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
          </label>
          <p className="hidden text-xs validator-hint">
            Must be more than 8 characters, including
            <br />At least one number
            <br />At least one lowercase letter
            <br />At least one uppercase letter
          </p>
        </div>
        <div className='w-full my-2'>
          <button className='w-full rounded-full btn-success btn btn-sm' disabled={loading} onClick={handleSubmit}>{loading ? <span className='loading loading-spinner'></span> : 'Login'}</button>
        </div>
        <div className='text-xs'>
          <span>Don't have an account? <Link to={'/signup'} className='font-bold text-blue-600 underline underline-offset-2'>Signup</Link></span>
        </div>
      </div>
    </div>

  )
}

export default Login