// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // Import the CORS package
const stripe = require("stripe");
const { default: Stripe } = require("stripe");

dotenv.config();
connectDB();

const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const messagesRoutes = require("./routes/messageRoutes");

const app = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/messages", messagesRoutes);

app.post("/api/payment/checkout", async (req, res) => {
  try {
    const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);
  const { id, services } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: services.map((item) => {
        return {
          price_data: {
            currency: "AED",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      // success_url: "http://localhost:5173/bookings",

success_url: `http://localhost:5173/checkout/${id}/step-4?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: "http://localhost:5173/",
    });

    console.log(session.payment_status);
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/payment/session/:sessionId", async (req, res) => {
  try {
    const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Return the payment status
    res.json({ status: session.payment_status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
