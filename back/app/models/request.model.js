const mongoose = require("mongoose");

const Request = mongoose.model(
  "Request",
  new mongoose.Schema({
    issuer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    book: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    timeDate: {
      type: Date,
      default: Date.now,
    },
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    states: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
      },
    ],
  })
);

module.exports = Request;
