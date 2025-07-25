const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/inbox/:recipientId", async (req, res) => {
  const { recipientId} = req.params;
  const messages = await Message.find({ recipientId}).sort({ createdAt: -1});
  res.json(messages);
});

module.exports = router;