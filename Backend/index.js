import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import messageRoute from "./routes/message.routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import { app,server } from "./SocketIO/server.js";
dotenv.config();



app.use(express.json());  // ✅ This MUST come before routes
//app.use(express.urlencoded({ extended: true })); // ✅ Add this too (safe)
app.use(cookieParser()); // ✅ Cookie support


app.use(cors({
  origin: "https://chatt-app-lilac.vercel.app", // frontend port
  credentials: true // ⬅️ Allow sending cookies
}));
app.use("/api/users", userRoutes); // ✅ Mount your routes AFTER middleware
app.use("/api/message",messageRoute)
const URI = process.env.MONGODB_URI;

mongoose.connect(URI)
  .then(() => console.log("successfully connected to database"))
  .catch((error) => console.log("MongoDB connection error:", error));

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
});
