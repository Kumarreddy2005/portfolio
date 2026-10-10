import { Router } from "express";
import mongoose from "mongoose";
import Message from "../models/Message.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "name, email and message are all required." });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      const saved = await Message.create({ name, email, message });
      return res.status(201).json({ ok: true, id: saved._id });
    }

    // No database connected — still succeed so the form works out of the box.
    console.log("New contact message (not persisted, no MONGO_URI set):", { name, email, message });
    return res.status(201).json({ ok: true, persisted: false });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Something went wrong. Please try again." });
  }
});

export default router;
