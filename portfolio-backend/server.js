require("dotenv").config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const app = express();

const allowedOrigins = [
  "https://hillaryush-portfolio.vercel.app",
  "https://portfolio-backend-mauve-nine.vercel.app",
  "http://localhost:5500",
  "http://localhost:3000",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

app.use("/contact", require("./routes/contact"));
app.use("/api", require("./routes/contact"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api", require("./routes/adminAuth"));
app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});
const adminAuth = require("./routes/adminAuth");

app.use("/api/admin", adminAuth);

app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

const adminMessages = require("./routes/adminMessages");

app.use("/api/admin", adminMessages);
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));