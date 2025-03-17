import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming a User model exists
    default: null, // Can be null if the user is not logged in
  },
  userName: {
    type: String,
    default: null, // Can be null if user data is unavailable
  },
  email: {
    type: String,
    default: null, // Can be null if user data is unavailable
  },
  service: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    base_price: {
      type: Number,
      required: true,
    },
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  distance: {
    type: String, // Keeping it as String since it's in "km"
    required: true,
  },
  duration: {
    type: String, // Keeping it as String since it's in "hours mins"
    required: true,
  },
  date: {
    type: String, // Keeping it as String to match input format "YYYY-MM-DD"
    required: true,
  },
  time: {
    type: String, // Keeping it as String to match input format "HH:mm"
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  }, 
  paymentIntentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
