module.exports = (app) => {
  const chats = require("../controllers/chat.controller.js");

  var router = require("express").Router();

  // Create a new Book
  router.post("/", chats.create);

  // Retrieve all chats
  router.get("/", chats.findAll);

  // Retrieve all published chats
  router.get("/approved", chats.findAllApproved);

  // Retrieve a single Book with id
  router.get("/:id", chats.findOne);

  // Update a Book with id
  router.put("/:id", chats.update);

  // Delete a Book with id
  router.delete("/:id", chats.delete);

  // Create a new Book
  router.delete("/", chats.deleteAll);

  app.use("/api/chats", router);
};
