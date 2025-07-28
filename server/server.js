import express from "express";
import "dotenv/config";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import connectDB from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { ownerRouter } from "./routes/ownerRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";

// initialize express app
const app = express();
const server = http.createServer(app); // ⬅️ use native HTTP server

// create socket server
const io = new Server(server, {
  cors: {
    origin: "https://car-rental-booking-app.vercel.app", // update if needed for security
    methods: ["GET", "POST"],
  },
});

// make io accessible to routes/controllers
app.set("io", io);

// connect to database
await connectDB();

// middleware
app.use(cors());
app.use(express.json());

// basic route
app.get("/", (_, res) => res.send("Server is running..."));

// routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter); // 🔁 where we will emit events

// handle socket connection
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));