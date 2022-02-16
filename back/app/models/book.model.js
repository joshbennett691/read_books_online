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
    published: Boolean,
  })
);

module.exports = Book;
