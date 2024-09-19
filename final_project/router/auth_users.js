const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

// let users = [];

// const isValid = (username) => {
//   //returns boolean
//   //write code to check is the username is valid
// };

// const authenticatedUser = (username, password) => {
//   //returns boolean
//   //write code to check if username and password match the one we have in records.
// };

// //only registered users can login
// regd_users.post("/login", (req, res) => {
//   //Write your code here
//   return res.status(300).json({ message: "Yet to be implemented" });
// });

// Add a book review {"review" : "Excellent book!"}
regd_users.post("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization.username;
  const isbn = req.params.isbn;

  if (!Array.isArray(books[isbn].reviews)) {
    books[isbn].reviews = []; // Initialize as an array
  }

  books[isbn].reviews = [
    ...books[isbn].reviews.filter((review) => review.username !== username),
    { username, review: req.body.review },
  ];

  return res.send(`Review added successfully, ${username}!`);
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization.username;
  const isbn = req.params.isbn;

  if (!Array.isArray(books[isbn].reviews)) {
    return res.send(`No reviews to Delete, ${username}!`);
  } else {
    books[isbn].reviews = [
      ...books[isbn].reviews.filter((review) => review.username !== username),
    ];
    return res.send(`Review deleted successfully, ${username}!`);
  }
});

// module.exports.authenticated = regd_users;
// module.exports.isValid = isValid;
// module.exports.users = users;
module.exports = regd_users;
