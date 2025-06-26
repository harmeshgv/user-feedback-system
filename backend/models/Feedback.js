import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  category: String,
  feedback: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", feedbackSchema);
