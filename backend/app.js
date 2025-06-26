import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import feedbackRoutes from "./routes/feedback.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Feedback API");
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
  