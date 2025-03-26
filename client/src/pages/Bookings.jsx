import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LOCAL_HOST } from '../host.js';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const {currentUser} = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  console.log("User: ", currentUser)
  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      //console.log(token)
     // console.log(currentUser?._id)
      try {
        const response = await fetch(
          `${LOCAL_HOST}/api/user/getbookings?id=${currentUser?._id}`,
          {
          method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        credentials: "include"
      }
        );
        const data = await response.json();
        console.log(data)
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
      console.log(currentUser)
    if (currentUser?._id) {
      fetchBookings();
    }
  }, [currentUser]);

  // Handle delete booking
  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(
        `${LOCAL_HOST}/api/user/deletebooking?id=${bookingId}`,
        {
          method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        credentials: "include"
      }
      );

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
        alert("Booking deleted successfully!");
      } else {
        alert("Failed to delete booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl  text-slate-800 border-b border-black m-2 pb-2">
        Active 
      </h2>

      <div className="grid grid-cols-1 gap-6 m-4">
  {bookings.length > 0 ? (
    bookings
      .filter((booking) => booking.status === "pending") // ✅ Exclude "delivered" bookings
      .map((booking) => (
        <div
          key={booking._id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <p className="text-lg font-semibold text-gray-800">
            Destination: <span className="font-normal">{booking.destination}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Origin: <span className="font-normal">{booking.origin}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Time: <span className="font-normal">{booking.time}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Total Price: <span className="font-normal">${booking.total_price}</span>
          </p>
          <button
            onClick={() => handleDelete(booking._id)}
            className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      ))
  ) : (
    <p className="text-center text-gray-600 col-span-full">No bookings found.</p>
  )}
</div>


      <h2 className="text-2xl  text-slate-800 border-b border-black m-2 pb-2">
        History
      </h2>

      <div className="grid grid-cols-1 gap-6 m-4">
  {bookings.length > 0 ? (
    bookings
      .filter((booking) => booking.status === "Delivered") // ✅ Exclude "delivered" bookings
      .map((booking) => (
        <div
          key={booking._id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <p className="text-lg font-semibold text-gray-800">
            Destination: <span className="font-normal">{booking.destination}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Origin: <span className="font-normal">{booking.origin}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Time: <span className="font-normal">{booking.time}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Total Price: <span className="font-normal">${booking.total_price}</span>
          </p>
         
        </div>
      ))
  ) : (
    <p className="text-center text-gray-600 col-span-full">No bookings found.</p>
  )}
</div>

    </div>
  );
}
