const mongoose = require("mongoose");

const Chat = mongoose.model(
  "Chat",
  new mongoose.Schema({
    issuer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [],
  })
);

module.exports = Chat;
