const controller = require("../controllers/request.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    next();
  });
  //   app.get("/api/books", controller.allBooks);
};
