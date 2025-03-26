import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import admin from "../assets/admin.png";
import { LOCAL_HOST } from "../host.js";
import{ signOutUserStart,  signOutUserSuccess, signOutUserFailure} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function AdminHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalUsers, setTotalUsers] = useState(null);
  const [totalRides, setTotalRides] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch total users & rides from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${LOCAL_HOST}/api/admin/home`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          credentials: "include",
        });

        const data = await res.json();
        setTotalUsers(data.totalUsers);
        setTotalRides(data.totalRides);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Sign Out
 const handleSignOut = async () => {
     try {
       dispatch(signOutUserStart());
       const res = await fetch(`${LOCAL_HOST}/api/auth/adminsignout`, {
         method: "GET",
         headers: {
           'Content-Type': 'application/json',
             Authorization: token,
         },
         credentials: "include",
       });
       const data = await res.json(); 
       if (data.success === false) {
         dispatch(signOutUserFailure(data.message));
         return;
       }
       localStorage.removeItem("token"); // Remove token
       localStorage.removeItem("persist:root"); // Remove Redux persisted state
   
       // ✅ Clear sessionStorage (optional, but useful for session-based storage)
       sessionStorage.clear();
       
       dispatch(signOutUserSuccess());
       
         }catch (error) {
           dispatch(signOutUserFailure(error.message));
         }
   }

  return (
    <div>
      <div className="w-full flex flex-col items-center px-4 md:px-8 lg:px-16">
        <div className="w-full flex flex-col md:flex-row items-center">
          {/* Left Side - Green Section */}
          <div className="w-full md:w-1/2 min-h-[400px] bg-[#188754] rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-4xl md:text-7xl font-extrabold text-white">
              Hello Admin
            </h2>
            <img
              className="w-[50%] max-w-[300px] h-auto mt-2"
              alt="Vector"
              src="https://c.animaapp.com/m8lsvibom5QJ9I/img/vector-1.svg"
            />
            <p className="text-white text-lg md:text-xl leading-relaxed mt-4 max-w-[90%]">
              Manage the rides and users in the system efficiently.
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-[400px] object-cover rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
              alt="Rectangle"
              src={admin}
            />
          </div>
        </div>
      </div>

      {/* header Section */}
      <div className="flex flex-col mt-10">
        <h2 className="text-[#188754] text-2xl text-center font-bold capitalize">
        STAY UPDATED
        </h2>
        <img
          className="w-[200px] h-[14px] mx-auto mt-2"
          alt="Group"
          src="https://c.animaapp.com/m8mo09emU1GpO2/img/group-12.png"
        />
      </div>

      {/* Stats Section */}
      <div className="mx-auto w-9/10 p-6 bg-white my-10 flex flex-col lg:flex-row gap-8">
        {/* Total Users Card */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-[#188754] mb-8">
            Total Number of Users
          </h3>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              <p className="text-black mt-2 font-bold text-2xl">
                So far the total number of users are:
              </p>
              <p className="text-8xl font-bold text-black mt-4">{totalUsers}</p>
            </>
          )}
          <button
            onClick={() => navigate("/admin/users")}
            className="my-10 font-semibold text-white bg-[#188754] px-6 py-3 rounded-lg text-lg hover:bg-[#146c43] transition"
          >
            View Users
          </button>
        </div>

        {/* Total Rides Card */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center bg-[#188754] rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-white mb-8">
            Total Number of Rides
          </h3>
          {loading ? (
            <p className="text-gray-300">Loading...</p>
          ) : error ? (
            <p className="text-red-300">{error}</p>
          ) : (
            <>
              <p className="text-black mt-2 font-bold text-2xl">
                So far the total number of rides taken by users are:
              </p>
              <p className="text-8xl font-bold text-black mt-4">{totalRides}</p>
            </>
          )}
          <button
            onClick={() => navigate("/admin/bookings")}
            className="my-10 font-semibold text-white bg-black px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
          >
            View Rides Booked
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="flex justify-center my-6">
        <button
          onClick={handleSignOut}
          className="font-semibold text-white bg-black px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
