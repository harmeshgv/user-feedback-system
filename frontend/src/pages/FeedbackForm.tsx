import React, { useState } from "react";

interface Feedback {
  name: string;
  email: string;
  category?: string;
  feedback: string;
  timestamp: string;
}

const FeedbackForm: React.FC = () => {
  const [form, setForm] = useState<Feedback>({
    name: "",
    email: "",
    category: "",
    feedback: "",
    timestamp: new Date().toISOString(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:3000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        console.log("✅ Submitted:", data);
        // Reset form
        setForm({
          name: "",
          email: "",
          category: "",
          feedback: "",
          timestamp: new Date().toISOString(),
        });
      })
      .catch(err => console.error("❌ Submit error:", err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Submit Feedback</h2>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <br /><br />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <br /><br />
      <input
        type="text"
        name="category"
        placeholder="Category (e.g., Bug, Suggestion)"
        value={form.category}
        onChange={handleChange}
      />
      <br /><br />
      <textarea
        name="feedback"
        placeholder="Your feedback"
        value={form.feedback}
        onChange={handleChange}
        required
      />
      <br /><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
