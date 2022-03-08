const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
var bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const { mongoose } = require("./app/models");
const Book = db.book;
const Role = db.role;
const State = db.state;
const User = db.user;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
    initializeBook();
    initializeStates();
    initializeUsers();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Read Books Online" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/book.routes")(app);
require("./app/routes/request.routes")(app);
require("./app/routes/existingUser.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

function initializeStates() {
  State.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new State({
        name: "initial",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'initial' to state collection");
      });

      new State({
        name: "allocated",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'allocated' to state collection");
      });

      new State({
        name: "review",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'review' to state collection");
      });

      new State({
        name: "empReview",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'empReview' to state collection");
      });

      new State({
        name: "reqAuthorization",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'rejAuthorization' to state collection");
      });

      new State({
        name: "rejected",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'rejected' to state collection");
      });

      new State({
        name: "accepted",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'accepted' to state collection");
      });
    }
  });
}

function initializeBook() {
  Book.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Book({
        title: "Shatter Me",
        author: "Tahereh Mafi",
        description: `One touch is all it takes. One touch, and Juliette Ferrars can leave a fully grown man gasping for air. One touch, and she can kill.`,
        category: "Fiction",
        year: 2012,
        language: "English",
        isbn: "97800620855049",
        photo:
          "https://covers.zlibcdn2.com/covers299/books/5f/08/98/5f0898770d0cb42d21cd91f55eab70ea.jpg",
        approved: true,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("created book");
      });
      new Book({
        title: "The Sweetest Oblivion",
        author: "Lori Danielle",
        description: `She’s a romantic at heart, living in the most unromantic of worlds . . .`,
        category: "Crime, Thrillers & Mystery",
        year: 2018,
        language: "English",
        isbn: "B07DS4TZ93",
        photo:
          "https://covers.zlibcdn2.com/covers299/books/51/14/5f/51145fb1dd4d85033eb9880cee8c5a73.jpg",
        approved: true,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("created book collection");
      });
      new Book({
        title: "English Vocabulary in Use - Pre-Intermediate and Intermediate",
        author: "Stuart Redman",
        description:
          "The words you need to communicate with confidence. Vocabulary explanations and practice for pre-intermediate and intermediate level (B1) learners of English. ",
        year: 2017,
        language: "English",
        isbn: "9781316631713",
        photo:
          "https://covers.zlibcdn2.com/covers299/books/de/6b/80/de6b809c2feffd3aebd79d63561d994e.jpg",
        approved: true,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("created book collection");
      });
      new Book({
        title:
          "The Psychology of Money: Timeless lessons on wealth, greed, and happiness",
        author: "Morgan Housel",
        description: `Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people. `,
        category: "Business & Economics",
        year: 2020,
        language: "English",
        isbn: "9780857197696",
        photo:
          "https://covers.zlibcdn2.com/covers299/books/ac/c5/21/acc521dcbf15f206f9b8155e68622706.jpg",
        approved: true,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("created book collection");
      });
      new Book({
        title:
          "365 Days With Self-Discipline: 365 Life-Altering Thoughts on Self-Control, Mental Resilience, and Success (Simple Self-Discipline)",
        author: "Meadows, Martin",
        description: `How to Build Self-Discipline and Become More Successful (365 Powerful Thoughts From the World's Brightest Minds) Its lack makes you unable to achieve your goals. `,
        category:
          "Self-Help, Relationships & Lifestyle - Psychological Self-Help",
        year: 2017,
        language: "English",
        isbn: "9781982074647",
        photo:
          "https://covers.zlibcdn2.com/covers299/books/ab/56/38/ab563847c6c46fc32c9dce4afec2d3fe.jpg",
        approved: true,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("created book collection");
      });
    }
  });
}

function initializeUsers() {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        username: "user1",
        email: "user1@email.com",
        password: bcrypt.hashSync("password"),
        roles: ["620f227f5a6cfa6ef8038ec5"],
        requests: [],
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added user instance");
      });
      new User({
        username: "user2",
        email: "user2@email.com",
        password: bcrypt.hashSync("password"),
        roles: ["620f227f5a6cfa6ef8038ec5"],
        requests: [],
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added user instance");
      });
      new User({
        username: "user3",
        email: "user3@email.com",
        password: bcrypt.hashSync("password"),
        roles: ["620f227f5a6cfa6ef8038ec5"],
        requests: [],
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added user instance");
      });
      new User({
        username: "employee1",
        email: "employee1@email.com",
        password: bcrypt.hashSync("password"),
        roles: ["620f227f5a6cfa6ef8038ec6"],
        requests: [],
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added employee instance");
      });
      new User({
        username: "employee2",
        email: "employee2@email.com",
        password: bcrypt.hashSync("password"),
        roles: ["620f227f5a6cfa6ef8038ec6"],
        requests: [],
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added employee instance");
      });
      new User({
        username: "employee3",
        email: "employee3@email.com",
        password: bcrypt.hashSync("password"),
        roles: ["620f227f5a6cfa6ef8038ec6"],
        requests: [],
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added employee instance");
      });
      new User({
        username: "admin1",
        email: "admin1@email.com",
        password: bcrypt.hashSync("password"),
        roles: ["620f227f5a6cfa6ef8038ec7"],
        requests: [],
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added admin instance");
      });
      new User({
        username: "admin2",
        email: "admin2@email.com",
        password: bcrypt.hashSync("password"),
        roles: ["620f227f5a6cfa6ef8038ec7"],
        requests: [],
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added admin instance");
      });
      new User({
        username: "admin3",
        email: "admin3@email.com",
        password: bcrypt.hashSync("password"),
        roles: ["620f227f5a6cfa6ef8038ec7"],
        requests: [],
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added admin instance");
      });
    }
  });
}
