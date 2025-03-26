import React, { useEffect, useState } from "react";
import { LOCAL_HOST } from "../host.js";
import { useDispatch } from "react-redux";


export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

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
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="border p-2">{user.fname}</td>
                  <td className="border p-2">{user.lname}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.number}</td>
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
