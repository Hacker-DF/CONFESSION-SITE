const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.post("/send", async (req, res) => {
  const { recipientId, content} = req.body;
  const msg = new Message({ recipientId, content});
  await msg.save();
  res.status(201).send("Message envoyé!");
});

module.exports = router;