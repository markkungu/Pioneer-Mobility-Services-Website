import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51QyDOpFkFc9MmOZc610AzrUEzDBuRZX41PCubdYY7vBiZVAlSaAYj9CQ9wkyK31MneUKyFtRL0XGsfuF09wrs5bP00fiqQQjaz");

const PaymentForm = ({ bookingData, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    if (!bookingData || !bookingData.total_price) return;

    fetch("http://localhost:3000/api/user/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingData,
        
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => setErrorMessage(error.message));
  }, [bookingData]); // ✅ Use bookingData as dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
        setErrorMessage("Stripe is not initialized.");
        setLoading(false);
        return;
    }

    // Submit payment fields
    const { error: submitError } = await elements.submit();
    if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
    }

    // ✅ Confirm payment without redirecting
    const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: "if_required", // Prevents redirection
    });

    if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
    }

    console.log("✅ Payment Successful:", paymentIntent);

    if (paymentIntent.status === "succeeded") {
        // ✅ Save booking after payment success
        fetch("http://localhost:3000/api/user/saveBooking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                bookingData,
                paymentIntentId: paymentIntent.id, // Send PaymentIntent ID for verification
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("✅ Booking saved:", data);
                alert("Booking confirmed!");
            })
            .catch((err) => console.error("❌ Error saving booking:", err));

            Navigate('/bookings')
    } else {
        setErrorMessage("Payment not completed.");
    }

    setLoading(false);
};


  if (!clientSecret || !stripe || !elements) {
    return <div>Loading...</div>; // ✅ Fixed condition
  }

  return (
    <form onSubmit={handleSubmit} className="p-2 m-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Enter Payment Details</h2>
      <PaymentElement /> {/* ✅ Correctly using PaymentElement */}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

const Payment = ({ data }) => {
  const [bookingData] = useState({
    origin: "Nairobi",
    destination: "Mombasa",
    date: "2025-03-05",
    time: "14:00",
    service: {
      id: 1,
      name: "Premium Ride",
      base_price: 100,
    },
    distance: "500km",
    duration: "5 hours",
    total_price: 500,
  });

  const amount = Math.round(bookingData.total_price * 100);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/user/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingData }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Error fetching clientSecret:", err));
  }, []);

  if (!clientSecret) {
    return <p>Loading payment...</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm bookingData={bookingData} amount={amount} />
    </Elements>
  );
};

export default Payment;
