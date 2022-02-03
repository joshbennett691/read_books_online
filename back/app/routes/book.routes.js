const controller = require("../controllers/book.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    next();
  });
  app.get("/api/books", controller.allBooks);
};
