const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST: Send a message
router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, senderRole, receiverRole, text } = req.body;
    const message = new Message({ senderId, receiverId, senderRole, receiverRole, text });
    await message.save();
    res.status(201).json({ message: "Message sent", data: message });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message", details: err });
  }
});

// GET: Get all messages between two users
router.get("/conversation", async (req, res) => {
  try {
    const { user1, user2 } = req.query;
    const messages = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to load conversation", details: err });
  }
});

module.exports = router;
