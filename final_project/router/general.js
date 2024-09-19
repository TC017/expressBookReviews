const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  res.send(JSON.stringify(books[req.params.isbn], null, 4));
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const filteredBooks = Object.keys(books).reduce((acc, isbn) => {
    if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
      acc[isbn] = books[isbn];
    }
    return acc;
  }, {});
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(filteredBooks, null, 4));
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const filteredBooks = Object.keys(books).reduce((acc, isbn) => {
    if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
      acc[isbn] = books[isbn];
    }
    return acc;
  }, {});
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(filteredBooks, null, 4));
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books[req.params.isbn].reviews, null, 4));
});

module.exports.general = public_users;
