import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import packageRoute from "./routes/package.route.js";
import ratingRoute from "./routes/rating.route.js";
import bookingRoute from "./routes/booking.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();

// Resolve __dirname for ES modules reliably
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  // .connect(process.env.MONGO_URL)
  .connect(process.env.MONGO_URL || 'mongodb+srv://rushikeshgaikwad83909:6OFuW0wxa05XoPmj@cluster0.4e9ynib.mongodb.net/')
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/package", packageRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/booking", bookingRoute);

// Only serve the client static build when explicitly enabled (local/dev).
// In production deployments on Vercel the client should be deployed separately
// as a static site; serverless functions shouldn't try to read from ../client/dist.
if (process.env.SERVE_CLIENT === "true") {
  app.use(express.static(path.join(__dirname, "..", "client", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
  });
}

export default app;
