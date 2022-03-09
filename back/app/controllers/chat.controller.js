const db = require("../models");
const Chat = db.chat;

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.issuer) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Book
  const chat = new Chat({
    issuer: req.body.issuer,
    employee: req.body.employee,
    messages: req.body.messages,
  });

  // Save Book in the database
  chat
    .save(chat)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Chat.",
      });
    });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  const issuer = req.query.issuer;
  var condition = issuer
    ? { issuer: { $regex: new RegExp(issuer), $options: "i" } }
    : {};

  Chat.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving chats.",
      });
    });
};

// Find a single chat with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Chat.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Chat with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Chat with id=" + id });
    });
};

// Update a Chat by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Chat.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Chat with id=${id}. Maybe Chat was not found!`,
        });
      } else res.send({ message: "Chat was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Chat with id=" + id,
      });
    });
};

// Delete a Chat with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Chat.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Chat with id=${id}. Maybe Chat was not found!`,
        });
      } else {
        res.send({
          message: "Chat was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Chat with id=" + id,
      });
    });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
  Chat.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Chats were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all chats.",
      });
    });
};

// Find all published Chats
exports.findAllApproved = (req, res) => {
  Chat.find({ approved: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving chats.",
      });
    });
};
