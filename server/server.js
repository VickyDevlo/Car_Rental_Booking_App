import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";

// initialize express app
const app = express();

//connect database
await connectDB()

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("Server is running..."));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
