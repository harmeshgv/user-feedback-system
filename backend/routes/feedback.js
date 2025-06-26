import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// POST /feedback — Add feedback
router.post("/", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /feedback — Get all feedback
router.get("/", async (req, res) => {
  try {
    const allFeedback = await Feedback.find().sort({ timestamp: -1 });
    res.json(allFeedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
