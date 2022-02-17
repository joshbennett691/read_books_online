const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    category: String,
    year: Number,
    language: String,
    isbn: String,
    photo: String,
    approved: Boolean,
  })
);

module.exports = Book;
