import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    fname: currentUser?.fname || "",
    lname: currentUser?.lname || "",
    email: currentUser?.email || "",
    number: currentUser?.number || "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Submit updated profile
  const handleUpdate = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
        credentials: "include",
      });

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Profile</h2>

      <div className="mt-4">
        <label className="block text-gray-600">First Name</label>
        <input
          type="text"
          name="fname"
          placeholder={currentUser?.fname || "Enter your first name"}
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
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
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
    </div>
  );
};

export default Profile;