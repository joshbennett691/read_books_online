module.exports = (app) => {
  const requests = require("../controllers/request.controller.js");

  var router = require("express").Router();

  // Create a new Request
  router.post("/", requests.create);

  // Retrieve all Requests
  router.get("/", requests.findAll);

  // Retrieve all published Requests
  router.get("/published", requests.findAllPublished);

  // Retrieve a single Request with id
  router.get("/:id", requests.findOne);

  // Update a Request with id
  router.put("/:id", requests.update);

  // Delete a Request with id
  router.delete("/:id", requests.delete);

  // Delete all requests
  router.delete("/", requests.deleteAll);

  // Get all requests by specified issuer
  router.get("/test/:issuer", requests.findAllByIssuer);

  app.use("/api/requests", router);
};
