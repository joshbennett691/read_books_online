module.exports = (app) => {
  const states = require("../controllers/book.controller.js");

  var router = require("express").Router();

  // Create a new Book
  router.post("/", states.create);

  // Retrieve all states
  router.get("/", states.findAll);

  // Retrieve all published states
  router.get("/approved", states.findAllApproved);

  // Retrieve a single Book with id
  router.get("/:id", states.findOne);

  // Update a Book with id
  router.put("/:id", states.update);

  // Delete a Book with id
  router.delete("/:id", states.delete);

  // Create a new Book
  router.delete("/", states.deleteAll);

  app.use("/api/states", router);
};
