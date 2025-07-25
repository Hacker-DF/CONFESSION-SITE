require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const messageRoutes = require("./routes/message");
const inboxRoutes = require("./routes/inbox");

app.use(express.json());
app.use(express.static("views"));

mongoose.connect(process.env.MONGO_URI);

app.use("/", messageRoutes);
app.use("/", inboxRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Serveur lancé 🚀");
});