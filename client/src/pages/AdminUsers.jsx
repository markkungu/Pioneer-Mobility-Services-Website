import React, { useEffect, useState } from "react";
import { LOCAL_HOST } from "../host.js";
import admin from "../assets/admin.png";


export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  

  const token = localStorage.getItem("token");

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${LOCAL_HOST}/api/admin/users`, {
          method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: "include"
      });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  
  return (
    <div className="p-6">
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

            <div className="flex flex-col mt-10">
        <h2 className="text-[#188754] text-3xl text-center font-bold capitalize">
        manage users
        </h2>
        <img
          className="w-[200px] h-[14px] mx-auto mt-2"
          alt="Group"
          src="https://c.animaapp.com/m8mo09emU1GpO2/img/group-12.png"
        />
      </div>

      <div className="overflow-x-auto my-10">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-[#188754] text-white rounded-t-lg">
        <th className="p-3 rounded-tl-lg">First Name</th>
        <th className="p-3">Last Name</th>
        <th className="p-3">Email</th>
        <th className="p-3 rounded-tr-lg">Phone Number</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map((user, index) => (
          <tr
            key={user._id}
            className={`text-center ${index % 2 === 0 ? "bg-white" : "bg-slate-100"}`}
          >
            <td className="p-3">{user.fname}</td>
            <td className="p-3">{user.lname}</td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">{user.number}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="text-center text-gray-600 p-4">
            No users found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
}
