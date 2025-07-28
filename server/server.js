import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { ownerRouter } from "./routes/ownerRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";

const allowedOrigins = [
  "http://localhost:5173", // Vite local
  "https://car-rental-booking-app.vercel.app", // Production frontend
];
// initialize express app
const app = express();

// connect to database
await connectDB();

// middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// basic route
app.get("/", (_, res) => res.send("Server is running..."));

// routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
