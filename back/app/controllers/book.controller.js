const db = require("../models/");
const Book = db.book;

exports.allBooks = (req, res, next) => {
  Book.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};
