import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOCAL_HOST } from "../host.js";
import logo from "../assets/LOGO PNG/header.png";
import heroImage from "../assets/hero.png";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${LOCAL_HOST}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      Navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="bg-white my-5 p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-28 md:h-36 w-auto" />
          </Link>
        </div>
        <h2 className="text-3xl text-center font-bold my-1  text-black">Create Account</h2>
        <h3 className="text-xl text-center font-medium mb-6 text-[#7D7D7D]">
          Sign up to get started
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="bg-slate-100 p-3 rounded-lg focus:outline-[#188754]"
            placeholder="First Name"
            id="fname"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="bg-slate-100 p-3 rounded-lg focus:outline-[#188754]"
            placeholder="Last Name"
            id="lname"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="bg-slate-100 p-3 rounded-lg focus:outline-[#188754]"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            className="bg-slate-100 p-3 rounded-lg focus:outline-[#188754]"
            placeholder="Phone Number"
            id="number"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="bg-slate-100 p-3 rounded-lg focus:outline-[#188754]"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            required
          />
          <button
            disabled={loading}
            className="bg-[#188754] text-white p-3 rounded-2xl uppercase hover:opacity-95 disabled:opacity-50 transition"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-5 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="text-[#3D7CF9] font-semibold">
              Sign In
            </Link>
          </p>
        </div>
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}
