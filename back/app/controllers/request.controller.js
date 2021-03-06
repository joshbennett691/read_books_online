const db = require("../models");
const Request = db.request;

// Create and Save a new Request
exports.create = (req, res) => {
  // Validate request
  if (!req.body.issuer) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Request
  const request = new Request({
    issuer: req.body.issuer,
    book: req.body.book,
    employee: req.body.employee,
    authorizer: req.body.authorizer,
    state: req.body.state,
    chat: req.body.chat,
  });

  // Save Request in the database
  request
    .save(request)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Request.",
      });
    });
};

// Retrieve all Requests from the database.
exports.findAll = (req, res) => {
  const issuer = req.query.issuer;
  var condition = issuer
    ? { issuer: { $regex: new RegExp(issuer), $options: "i" } }
    : {};

  Request.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving requests.",
      });
    });
};

// Find a single Request with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Request.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Request with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Request with id=" + id });
    });
};

// Update a Request by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Request.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Request with id=${id}. Maybe Request was not found!`,
        });
      } else res.send({ message: "Request was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Request with id=" + id,
      });
    });
};

// Delete a Request with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Request.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Request with id=${id}. Maybe Request was not found!`,
        });
      } else {
        res.send({
          message: "Request was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Request with id=" + id,
      });
    });
};

// Delete all Requests from the database.
exports.deleteAll = (req, res) => {
  Request.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Requests were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all requests.",
      });
    });
};

// Find all published Requests
exports.findAllPublished = (req, res) => {
  Request.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving requests.",
      });
    });
};

// Find all Requests by issuer
exports.findIssuerRequests = (req, res) => {
  const issuer = req.query.issuer;
  var condition = issuer
    ? { issuer: { $regex: new RegExp(issuer), $options: "i" } }
    : {};

  Request.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving requests.",
      });
    });
};

exports.findAllByIssuer = (req, res) => {
  const issuer = req.params.issuer;
  console.log(issuer);
  Request.find({ issuer: issuer })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error when finding users reuqets" });
    });
};
