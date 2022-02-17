const db = require("../models");
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// exports.createRequest = function (userId, request) {
//   return db.request.create(request).then((docRequest) => {
//     console.log("\n>> Created Request:\n", docRequest);
//     return db.user.findByIdAndUpdate(
//       userId,
//       {
//         $push: {
//           requests: {
//             _id: docRequest._id,
//             issuer: docRequest.issuer,
//             book: docRequest.book,
//             employee: docRequest.employee,
//             authorizer: docRequest.authorizer,
//             state: docRequest.state,
//           },
//         },
//       },
//       { new: true, useFindAndModify: false }
//     );
//   });
// };
