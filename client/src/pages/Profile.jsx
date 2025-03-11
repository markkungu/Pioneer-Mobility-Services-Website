import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUSerStart, updateUSerSuccess, updateUSerFailure, deleteUSerStart, deleteUSerSuccess, deleteUSerFailure,  signOutUSerSuccess, signOutUSerFailure} from "../redux/user/userSlice.js";
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
  // Handle input changes
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Submit updated profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUSerStart());
  
      // Store response in a variable
      const res = await fetch(
        `http://localhost:3000/api/user/updateprofile?id=${currentUser?._id}`,
        {
          method: "PUT", // Check if your backend expects "PUT" instead
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
          credentials: "include",
        }
      );
  
      const data = await res.json(); 
      if (data.success === false) {
        dispatch(updateUSerFailure(data.message));
        return;
      }
  
      dispatch(updateUSerSuccess(data));
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      dispatch(updateUSerFailure(error.message));
    }
  };
   
const handleDelete = async () => {
  try {
    dispatch(deleteUSerStart());

    console.log(currentUser._id)
    // Store response in a variable
    const res = await fetch(
      `http://localhost:3000/api/user/deleteprofile?id=${currentUser?._id}`,
      {
        method: "DELETE", // Check if your backend expects "PUT" instead
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await res.json(); 
    if (data.success === false) {
      dispatch(deleteUSerFailure(data.message));
      return;
    }

    dispatch(deleteUSerSuccess(data));
      }catch (error) {
        dispatch(deleteUSerFailure(error.message));
      }
}
const handleSignOut = async () => {
  try {
    dispatch(signOutUSerSuccess());
    const res = await fetch("http://localhost:3000/api/auth/signout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json(); 
    if (data.success === false) {
      dispatch(signOutUSerFailure(data.message));
      return;
    }

    dispatch(signOutUSerSuccess(data));
      }catch (error) {
        dispatch(signOutUSerFailure(error.message));
      }
}
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Profile</h2>

      <div className="mt-4">
        <label className="block text-gray-600">First Name</label>
        <input
          type="text"
          name="fname"
          placeholder={currentUser?.fname || "Enter your first name"}
          defaultValue={currentUser?.fname}
          value={isEditing ? updatedUser.fname : ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-600">Last Name</label>
        <input
          type="text"
          name="lname"
          placeholder={currentUser?.lname || "Enter your last name"}
          defaultValue={currentUser?.lname}
          value={isEditing ? updatedUser.lname : ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          placeholder={currentUser?.email || "Enter your email"}
          defaultValue={currentUser?.email}
          value={currentUser?.email} // Email should not be editable
          className="w-full p-2 border rounded-lg bg-gray-100"
          disabled
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-600">Phone Number</label>
        <input
          type="text"
          name="number"
          placeholder={currentUser?.number || "Enter your phone number"}
          value={isEditing ? updatedUser.number : ""}
          defaultValue={currentUser?.number}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-600">Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          defaultValue={currentUser?.password}
          value={isEditing ? updatedUser.password : ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="mt-6 flex justify-between">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
             {loading ? "Updating..." : "Update Profile"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit Profile
          </button>
        )}
      </div>
      <div className="flex flex-row justify-between mt-4">
      <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              delete account
            </button>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
             sign out
            </button>
      </div>
      <p className="text-red-700 mt-4">{error ? error : ''}</p>
    </div>
  );
};

export default Profile;