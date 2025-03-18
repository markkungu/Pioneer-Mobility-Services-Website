
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { LOCAL_HOST } from '../host.js';

export default function AdminSignup() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res=  await fetch(`${LOCAL_HOST}/api/auth/createadmin`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data)
      if(data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      Navigate("/adminsignin")
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

  }
 // console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className="text-3xl text-center font-semibold my-7">Admin Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" className="border p-3 rounded-lg" placeholder='first name' id='fname' onChange={handleChange}/>
            <input type="text" className="border p-3 rounded-lg" placeholder='last name' id='lname' onChange={handleChange}/>
            <input type="email" className="border p-3 rounded-lg" placeholder='email' id='email' onChange={handleChange}/>
            <input type="tel" className="border p-3 rounded-lg" placeholder='phone number' id='number' onChange={handleChange}/>
            <input type="password" className="border p-3 rounded-lg" placeholder='password' id='password' onChange={handleChange}/>
            <button disabled={loading} className="bg-[#128178] text-white p-3 rounded-lg uppercase hover:opacity-95 disabiled:opacity-50"  >
                {loading ? "Loading..." : "Sign Up"} 
            </button>
        </form>
        <div className=" mt-5 flex gap-2">
            <p>
                Already have an account? 
                <Link to="/adminsignIn">
                <span className="text-[#128178] cursor-pointer">Sign In</span>
                </Link>
            </p>
        </div>
        {error && <p className="text-red-500 ">{error}</p>}
    </div>
  )
}
