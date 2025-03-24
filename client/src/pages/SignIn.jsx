
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import { LOCAL_HOST } from '../host.js';

export default function Signin() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res=  await fetch(`${LOCAL_HOST}/api/auth/signin`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData),
        credentials: "include"
      });
      const data = await res.json();
      console.log(data)
      if(data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data.user));
      localStorage.setItem("token", data.token);
      Navigate("/")
    } catch (error) {
      dispatch(signInFailure(error.message));
    }

  }
 // console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="email" className="border p-3 rounded-lg" placeholder='email' id='email' onChange={handleChange}/>
            <input type="password" className="border p-3 rounded-lg" placeholder='password' id='password' onChange={handleChange}/>
            <button disabled={loading} className="bg-[#188754] text-white p-3 rounded-lg uppercase hover:opacity-95 disabiled:opacity-50"  >
                {loading ? "Loading..." : "Sign In"} 
            </button>
        </form>
        <div className=" mt-5 flex gap-2">
            <p>
                don't have an account? 
                <Link to="/signup">
                <span className="text-[#128178] cursor-pointer"> Sign Up</span>
                </Link>
            </p>
        </div>
        {error && <p className="text-red-500 ">{error}</p>}
    </div>
  )
}
