import { KeyRound, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Signup = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
  const { register } = useAuthStore();
  const Navigate = useNavigate();
  const handleSubmit = () => {
    if (!input.email || !input.password || !input.firstName || !input.lastName) {
      toast.error('Please fill all the fields')
      return
    }
    register(input);
    setInput({ email: '', password: '', firstName: '', lastName: '' });
    Navigate('/login');
  };
  return (
    <div className='flex items-center justify-center h-[90vh] mx-auto'>
      <div className='flex flex-col items-center p-5 rounded-lg shadow-lg sm:w-2/3 md:w-1/2'>
        <h1 className='w-full text-2xl font-bold text-center border-b-4 border-black'>Signup</h1>
        <div className='w-full my-2'>
          <label className="flex items-center gap-5 input validator">
            <User />
            <input type="input" required placeholder="First Name" value={input.firstName} onChange={(e) => setInput({ ...input, firstName: e.target.value })} pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
          </label>
          <p className="hidden text-xs validator-hint">
            Must be 3 to 30 characters
            <br />containing only letters, numbers or dash
          </p>
        </div>
        <div className='w-full my-2'>
          <label className="flex items-center gap-5 input validator">
            <User />
            <input type="input" required placeholder="Last Name" value={input.lastName} onChange={(e) => setInput({ ...input, lastName: e.target.value })} pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
          </label>
          <p className="hidden text-xs validator-hint">
            Must be 3 to 30 characters
            <br />containing only letters, numbers or dash
          </p>
        </div>
        <div className='w-full my-2'>
          <label className="flex items-center gap-5 input validator">
            <Mail />
            <input type="email" placeholder="mail@site.com" required value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} />
          </label>
          <div className="hidden text-xs validator-hint">Enter valid email address</div>
        </div>
        <div className='w-full my-2'>
          <label className="flex items-center gap-5 input validator">
            <KeyRound />
            <input value={input.password} type="password" required onChange={(e) => setInput({ ...input, password: e.target.value })} placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
          </label>
          <p className="hidden text-xs validator-hint">
            Must be more than 8 characters, including
            <br />At least one number
            <br />At least one lowercase letter
            <br />At least one uppercase letter
          </p>
        </div>
        <div className='w-full my-2'>
          <button className='w-full rounded-full btn-success btn btn-sm' onClick={handleSubmit}>Signup</button>
        </div>
        <div className='text-xs'>
          <span>Already have an account? <Link to={'/login'} className='font-bold text-blue-500 underline underline-offset-2'> Login</Link></span>
        </div>
      </div>
    </div>

  )
}

export default Signup