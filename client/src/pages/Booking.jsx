import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/getbookings?id=${currentUser?._id}`
        );
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (currentUser?._id) {
      fetchBookings();
    }
  }, [currentUser]);

  // Handle delete booking
  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/deletebooking?id=${bookingId}`,
        {
          method: "DELETE",
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
      <h2 className="text-2xl text-center text-slate-800 border-b border-black pb-2">
        Active Bookings
      </h2>

      <div className="grid grid-cols-1 gap-6 p-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
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
    </div>
  );
}
