const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

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
const Book = db.book;
const Role = db.role;
const State = db.state;

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
        description: `One touch is all it takes. One touch, and Juliette Ferrars can leave a fully grown man gasping for air. One touch, and she can kill.

        No one knows why Juliette has such incredible power. It feels like a curse, a burden that one person alone could never bear. But The Reestablishment sees it as a gift, sees her as an opportunity. An opportunity for a deadly weapon.
        
        Juliette has never fought for herself before. But when she’s reunited with the one person who ever cared about her, she finds a strength she never knew she had.`,
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
        description: `She’s a romantic at heart, living in the most unromantic of worlds . . .

        Nicknamed Sweet Abelli for her docile nature, Elena smiles on cue and has a charming response for everything. She’s the favored daughter, the perfect mafia principessa . . . or was.
        
        Now, all she can see in the mirror’s reflection is blood staining her hands like crimson paint.
        
        They say first impressions are everything . . .
        
        In the murky waters of New York’s underworld, Elena’s sister is arranged to marry Nicolas Russo. A Made Man, a boss, a cheat—even measured against mafia standards. His reputation stretches far and wide and is darker than his black suits and ties. After his and Elena’s first encounter ends with an accidental glare on her part, she realizes he’s just as rude as he is handsome.
        
        She doesn’t like the man or anything he stands for, though that doesn’t stop her heart from pattering like rain against glass when he’s near, nor the shiver that ghosts down her spine at the sound of his voice.
        
        And he’s always near. Telling her what to do. Making her feel hotter than any future brother-in-law should. Elena may be the Sweet Abelli on the outside, but she’s beginning to learn she has a taste for the darkness, for rough hands, cigarettes, and whiskey-colored eyes. Having already escaped one scandal, however, she can hardly afford to be swept up in another.
        
        Besides, even if he were hers, everyone knows you don’t fall in love with a Made Man . . . right?
        
        This is a standalone forbidden romance.`,
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
          "The words you need to communicate with confidence. Vocabulary explanations and practice for pre-intermediate and intermediate level (B1) learners of English. Perfect for both self-study and classroom activities. Quickly expand your vocabulary with 100 units of easy to understand explanations and practice exercises. Be confident about what you are learning, thanks to Cambridge research into how English is really spoken and written, and get better at studying by yourself, with units on learning vocabulary, personalised practice and an easy to use answer key.",
        category: "Languages - Grammar, dictionaries & phrasebooks",
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
        description: `Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people. Money—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don’t make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together. In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life’s most important topics.`,
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
        description: `How to Build Self-Discipline and Become More Successful (365 Powerful Thoughts From the World's Brightest Minds) Its lack makes you unable to achieve your goals. Without it, you'll struggle to lose weight, become fit, wake up early, work productively and save money. Not embracing it in your everyday life means that you'll never realize your full potential. Ignoring it inevitably leads to regret and feeling sad about how more successful and incredible your life could have been if you had only decided to develop it. What is this powerful thing? Self-discipline. And if there's one thing that self-discipline is not, it's instant. It takes months (if not years) to develop powerful self-control that will protect you from impulsive decisions, laziness, procrastination, and inaction. You need to exhibit self-discipline day in, day out, 365 days in a year. What if you had a companion who would remind you daily to stay disciplined and persevere, even when the going gets tough? 365 Days With Self-Discipline is a practical, accessible guidebook for embracing more self-discipline in your everyday life. You'll learn how to do this through 365 brief, daily insights from the world's brightest minds, expanded and commented upon by bestselling personal development author Martin Meadows. This isn't just an inspirational book; most of the entries deliver practical suggestions that you can immediately apply in your life to become more disciplined. Here are just some of the things you'll learn: - why living your life the hard way makes it easy (and other suggestions from a successful entrepreneur and longevity scientist); - how to overcome your initial resistance and procrastination based on the remark made by one of the most renowned Renaissance men; - why, according to an influential neurosurgeon, it's key to see problems as hurdles instead of obstacles (and how to do that); - how to embrace an experimental mindset to overcome a fear of failure (a technique recommended by a successful entrepreneur and musician); - how to quit in a smart way, according to a world-famous marketing expert; - how to improve your productivity at work by implementing the advice from one of the most successful detective fiction writers; - how a trick used by screenwriters can help you figure out the first step needed to get closer to your goals; - how to maintain self-discipline in the long-term by paying attention to what a bestselling non-fiction author calls necessary to survive and thrive; - how your most common thoughts can sabotage your efforts (and other valuable insights from one of the most respected Roman Stoics); and - how to overcome temporary discouragement and look at your problems from the proper perspective, as suggested by a well-known public speaker and author. If you're ready to finally change your life and embrace self-discipline - not only for the next 365 days, but for the rest of your life - buy this book now and together, let's work on your success!`,
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
