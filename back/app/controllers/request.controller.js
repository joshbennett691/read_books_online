const db = require("../models/");
const Request = db.request;

exports.allRequests = (req, res, next) => {
  Book.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.requestsByUser = (req, res, next) => {
  Request.find({ issuer: req.query.userId }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.createRequest = (req, res) => {
  const request = new Request({
    issuer: req.body.User,
    book: req.body.Book,
    timeDate: new Date(),
    employee: req.body.User,
  });
};

// issuer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
// book: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
// timeDate: new Date(),
// employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
// states: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "State",
//   },
