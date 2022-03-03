const mongoose = require("mongoose");

const Request = mongoose.model(
  "Request",
  new mongoose.Schema(
    {
      issuer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      book: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
      employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      authorizer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      state: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }],
    },
    { timestamps: true }
  )
);

module.exports = Request;
