import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QyDOpFkFc9MmOZc610AzrUEzDBuRZX41PCubdYY7vBiZVAlSaAYj9CQ9wkyK31MneUKyFtRL0XGsfuF09wrs5bP00fiqQQjaz");

const PaymentForm = ({ bookingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const makePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setPaymentError("Stripe is not initialized.");
      return;
    }

    if (!bookingData) {
      setPaymentError("Booking details are missing!");
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create a Payment Method
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setPaymentError(error.message);
        setIsProcessing(false);
        return;
      }

      // Step 2: Send bookingData and paymentMethodId to backend
      const paymentDetails = {
        origin: bookingData.origin,
        destination: bookingData.destination,
        date: bookingData.date,
        time: bookingData.time,
        service: bookingData.service.name, // Ensuring only necessary fields are sent
        distance: bookingData.distance,
        duration: bookingData.duration,
        total_price: bookingData.total_price,
      };

      console.log("Sending to backend:", {
        bookingData: paymentDetails,
        paymentMethodId: paymentMethod.id,
      });

      const response = await fetch("http://localhost:3000/api/user/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingData: paymentDetails,
          paymentMethodId: paymentMethod.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed.");
      }

      alert("Payment Successful!");
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={makePayment} className="p-2 m-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Enter Payment Details</h2>
      <CardElement className="p-2 border rounded-lg" />
      {paymentError && <p className="text-red-500">{paymentError}</p>}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
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

  if (!bookingData) {
    return <p className="text-red-500">Error: No booking data provided.</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm bookingData={bookingData} />
    </Elements>
  );
};

export default Payment;
