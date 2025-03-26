import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { LOCAL_HOST } from "../host.js";
import logo from "../assets/LOGO PNG/header.png";
import heroImage from "../assets/hero.png";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${LOCAL_HOST}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data.user));
      localStorage.setItem("token", data.token);
      Navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-28 md:h-36 w-auto" />
          </Link>
        </div>
        <h2 className="text-3xl text-center font-bold my-1 text-black">Welcome Back</h2>
        <h3 className="text-xl text-center font-medium mb-6 text-[#7D7D7D]">
          Sign in to your account
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            className="bg-slate-100 p-3 rounded-lg focus:outline-[#188754]"
            placeholder="Email"
            id="email"
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
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="mt-5 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#3D7CF9] font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}
