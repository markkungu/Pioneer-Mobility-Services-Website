import React, { useEffect, useState } from "react";
import { LOCAL_HOST } from "../host.js";
import admin from "../assets/admin.png";

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
              Manage rides
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
        <th className="p-3 rounded-tl-lg">Username</th>
        <th className="p-3">Email</th>
        <th className="p-3">Service</th>
        <th className="p-3">Origin</th>
        <th className="p-3">Destination</th>
        <th className="p-3">Time & Date</th>
        <th className="p-3">Total Price</th>
        <th className="p-3 rounded-tr-lg">Status</th>
      </tr>
    </thead>
    <tbody>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <tr
            key={booking._id}
            className={`text-center ${index % 2 === 0 ? "bg-white" : "bg-slate-100"}`}
          >
            <td className="p-3">{booking.userName}</td>
            <td className="p-3">{booking.email}</td>
            <td className="p-3">{booking.service?.name}</td>
            <td className="p-3">{booking.origin}</td>
            <td className="p-3">{booking.destination}</td>
            <td className="p-3">{booking.time} {booking.date}</td>
            <td className="p-3">${booking.total_price}</td>
            <td className="p-3">
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
