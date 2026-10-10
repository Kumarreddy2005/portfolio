import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import contactRoute from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true, service: "kkr-portfolio-server" }));
app.use("/api/contact", contactRoute);

async function start() {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection failed, continuing without persistence:", err.message);
    }
  } else {
    console.log("No MONGO_URI set — contact messages will be logged, not stored.");
  }

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start();
