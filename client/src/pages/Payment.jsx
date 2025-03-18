import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOCAL_HOST } from '../host.js';

const stripePromise = loadStripe("pk_test_51QyDOpFkFc9MmOZc610AzrUEzDBuRZX41PCubdYY7vBiZVAlSaAYj9CQ9wkyK31MneUKyFtRL0XGsfuF09wrs5bP00fiqQQjaz");

const PaymentForm = ({ bookingData, amount, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { currentUser } = useSelector((state) => state.user) || {};

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedBookingData, setUpdatedBookingData] = useState(null);

  useEffect(() => {
    if (!bookingData || !bookingData.total_price || !currentUser) return;

    console.log("user in browser", currentUser)
    setUpdatedBookingData({
      ...bookingData,
      userId: currentUser._id,
      userName: `${currentUser.fname} ${currentUser.lname}`,
      email: currentUser.email
    });
    console.log("updatedBookingData", updatedBookingData);
  }, [bookingData, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not initialized.");
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const finalBookingData = {
        ...updatedBookingData,
        paymentIntentId: paymentIntent.id,
      };

      fetch(`${LOCAL_HOST}/api/user/saveBooking`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json',
          Authorization: token, },
        body: JSON.stringify({ bookingData: finalBookingData }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Booking confirmed!");
          navigate("/bookings");
        })
        .catch((err) => console.error("Error saving booking:", err));
    } else {
      setErrorMessage("Payment not completed.");
    }

    setLoading(false);
  };

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-2 m-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Enter Payment Details</h2>
      <PaymentElement />
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

const Payment = () => {
  const location = useLocation();
  const data = location.state;
  const [clientSecret, setClientSecret] = useState(null);
  const amount = Math.round(data?.total_price * 100);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!data) return;

    fetch(`${LOCAL_HOST}/api/user/booking`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json',
          Authorization: token, },
      body: JSON.stringify({ bookingData: data }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.clientSecret) {
          setClientSecret(response.clientSecret);
        } else {
          console.error("Error: clientSecret not received.");
        }
      })
      .catch((err) => console.error("Error fetching clientSecret:", err));
  }, [data]);

  if (!clientSecret) {
    return <p>Loading payment...</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm bookingData={data} amount={amount} clientSecret={clientSecret} />
    </Elements>
  );
};

export default Payment;
