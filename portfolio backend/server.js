// =======================
// IMPORTS
// =======================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// =======================
// APP INIT
// =======================
const app = express();
const PORT = process.env.PORT || 5000;

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// =======================
// MONGODB CONNECTION
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// =======================
// MESSAGE MODEL
// =======================
const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

// =======================
// ROUTES
// =======================

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Portfolio backend is running");
});

// Contact form API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Save message
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("❌ Contact API error:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// =======================
// SERVER START
// =======================
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
