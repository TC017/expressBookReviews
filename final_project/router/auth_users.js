const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

// Add a book review {"review" : "Excellent book!"}
regd_users.post("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization.username;
  const isbn = req.params.isbn;

  if (!books[isbn].reviews) {
    books[isbn].reviews = {}; // Initialize as an object
  }

  books[isbn].reviews[username] = {
    review: req.body.review,
    username,
  };

  return res.send(`Review added successfully, ${username}!`);
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization.username;
  const isbn = req.params.isbn;

  if (!books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.send(`No review found, ${username}!`);
  }

  delete books[isbn].reviews[username];

  return res.send(`Review deleted successfully, ${username}!`);
});

module.exports = regd_users;
