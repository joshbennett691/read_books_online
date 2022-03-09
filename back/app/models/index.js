const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.book = require("./book.model");
db.request = require("./request.model");
db.state = require("./state.model");
db.chat = require("./chat.model");

db.ROLES = ["user", "admin", "moderator"];
db.STATES = [
  "initial",
  "allocated",
  "review",
  "empReview",
  "reqAuthorization",
  "rejected",
  "accepted",
];

module.exports = db;
