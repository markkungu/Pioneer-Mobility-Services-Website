import React, { useEffect, useState } from "react";
import { LOCAL_HOST } from "../host.js";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${LOCAL_HOST}/api/admin/bookings`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: "include"
        });

        const data = await response.json();
        console.log(data);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Handle Confirm Delivery
  const handleConfirmDelivery = async (bookingId) => {
    try {
      const response = await fetch(
        `${LOCAL_HOST}/api/admin/confirmdelivery?id=${bookingId}`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: "include"
        }
      );

      if (!response.ok) {
        console.log("Failed to confirm delivery");
      }

      // Update state after confirming delivery
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: "delivered" } : booking
        )
      );
    } catch (error) {
      console.error("Error confirming delivery:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Bookings</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Service</th>
              <th className="border p-2">Origin</th>
              <th className="border p-2">Destination</th>
              <th className="border p-2">Time & Date</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="text-center">
                  <td className="border p-2">
                    {booking.user?.userName} 
                  </td>
                  <td className="border p-2">{booking.user?.email}</td>
                  <td className="border p-2">{booking.service?.name}</td>
                  <td className="border p-2">{booking.origin}</td>
                  <td className="border p-2">{booking.destination}</td>
                  <td className="border p-2">{booking.time} {booking.date}</td>
                  <td className="border p-2">${booking.total_price}</td>
                  <td className="border p-2">
                    {booking.status === "pending" ? (
                      <button
                        onClick={() => handleConfirmDelivery(booking._id)}
                        className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
                      >
                        Confirm Delivery
                      </button>
                    ) : (
                      <span className="text-green-700 font-semibold">Delivered</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-600 p-4">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
