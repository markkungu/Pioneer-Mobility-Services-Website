import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart,  signOutUserSuccess, signOutUserFailure} from "../redux/user/userSlice.js";
import { LOCAL_HOST } from '../host.js';
import heroImage from "../assets/hero.png";
import { Link } from "react-router-dom";
import logo from "../assets/LOGO PNG/header.png";
import { ToastContainer, toast } from "react-toastify";



const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    fname: currentUser?.fname || "",
    lname: currentUser?.lname || "",
    email: currentUser?.email || "",
    number: currentUser?.number || "",
    password: "",
  });
   const dispatch = useDispatch();
   const token = localStorage.getItem("token");
  // Handle input changes  
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Submit updated profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
  
      // Store response in a variable
      const res = await fetch(
        `${LOCAL_HOST}/api/user/updateprofile?id=${currentUser?._id}`,
        {
          method: "PUT", // Check if your backend expects "PUT" instead
          headers: {
           'Content-Type': 'application/json',
          Authorization: token,
          },
          body: JSON.stringify(updatedUser),
          credentials: "include",
        }
      );
  
      const data = await res.json(); 
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
  
      dispatch(updateUserSuccess(data));
      setIsEditing(false);
      toast.success("Profile updated successfully!", { position: "top-center", style: { backgroundColor: "#fff", color: "#188754" } });
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
   
const handleDelete = async () => {
  try {
    dispatch(deleteUserStart());

    console.log(currentUser._id)
    // Store response in a variable
    const res = await fetch(
      `${LOCAL_HOST}/api/user/deleteprofile?id=${currentUser?._id}`,
      {
        method: "DELETE", // Check if your backend expects "PUT" instead
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        credentials: "include",
      }
    );

    const data = await res.json(); 
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }

    dispatch(deleteUserSuccess(data));
      }catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
}
const handleSignOut = async () => {
  try {
    dispatch(signOutUserStart());
    const res = await fetch(`${LOCAL_HOST}/api/auth/signout`, {
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
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
  style={{ backgroundImage: `url(${heroImage})` }}
>
<ToastContainer />
  <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
    <div className="flex justify-center">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-24 md:h-28 w-auto" />
      </Link>
    </div>
    <h2 className="text-2xl text-center font-bold my-1 text-black">Profile</h2>

    <div className="mt-4">
      <label className="block text-black text-lg mb-1">First Name</label>
      <input
        type="text"
        name="fname"
        placeholder={currentUser?.fname || "Enter your first name"}
        defaultValue={currentUser?.fname}
        value={isEditing ? updatedUser.fname : ""}
        onChange={handleChange}
        disabled={!isEditing}
        className="w-full p-2 bg-slate-100 rounded-lg"
      />
    </div>

    <div className="mt-4">
      <label className="block text-black text-lg mb-1">Last Name</label>
      <input
        type="text"
        name="lname"
        placeholder={currentUser?.lname || "Enter your last name"}
        defaultValue={currentUser?.lname}
        value={isEditing ? updatedUser.lname : ""}
        onChange={handleChange}
        disabled={!isEditing}
        className="w-full p-2 bg-slate-100 rounded-lg"
      />
    </div>

    <div className="mt-4">
      <label className="block text-black text-lg mb-1">Email</label>
      <input
        type="email"
        name="email"
        defaultValue={currentUser?.email}
        className="w-full p-2 bg-gray-100 rounded-lg cursor-not-allowed"
        disabled
      />
    </div>

    <div className="mt-4">
      <label className="block text-black text-lg mb-1">Phone Number</label>
      <input
        type="text"
        name="number"
        placeholder={currentUser?.number || "Enter your phone number"}
        value={isEditing ? updatedUser.number : ""}
        defaultValue={currentUser?.number}
        onChange={handleChange}
        disabled={!isEditing}
        className="w-full p-2 bg-slate-100 rounded-lg"
      />
    </div>

    <div className="mt-4">
      <label className="block text-black text-lg mb-1">Password</label>
      <input
        type="password"
        name="password"
        placeholder="********"
        value={isEditing ? updatedUser.password : ""}
        onChange={handleChange}
        disabled={!isEditing}
        className="w-full p-2 bg-slate-100 rounded-lg"
      />
    </div>

    <div className="mt-6 flex justify-between">
      {isEditing ? (
        <>
          <button
            onClick={handleUpdate}
            className="bg-[#188754] text-white px-4 py-2 rounded-lg w-full md:w-auto"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-lg w-full md:w-auto"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-[#188754] text-white px-4 py-2 rounded-lg w-full md:w-auto"
        >
          Edit Profile
        </button>
      )}
    </div>

    <div className="flex justify-between mt-4">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-500 px-4 py-2 rounded-lg font-medium hover:underline"
      >
        Delete Account
      </button>
      <button
        onClick={handleSignOut}
        disabled={loading}
        className="text-white bg-black px-4 py-2 rounded-lg font-medium"
      >
        Sign Out
      </button>
    </div>

    {error && <p className="text-red-700 mt-4 text-center">{error}</p>}
  </div>
</div>


  );
};

export default Profile;