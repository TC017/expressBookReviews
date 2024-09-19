const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Import the axios library
const axios = require("axios");

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

// Get the book list available in the shop using axios and async
// Asynchronous function to get book list
const fetchBooks = async (req, res, next) => {
  try {
    const response = await axios.get("https://g37484-5000.csb.app/");
    req.books = response.data;
    next();
  } catch (error) {
    next(error);
  }
};

public_users.get("/axios", fetchBooks, (req, res) => {
  res.send(req.books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  res.send(JSON.stringify(books[req.params.isbn], null, 4));
});

// Asynchronous function to get book list based on ISBN
const fetchISBN = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://g37484-5000.csb.app/isbn/${req.params.isbn}`
    );
    req.books = response.data;
    next();
  } catch (error) {
    next(error);
  }
};

public_users.get("/axios/isbn/:isbn", fetchISBN, (req, res) => {
  res.send(req.books);
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

// Asynchronous function to get book list based on Author
const fetchAuthor = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://g37484-5000.csb.app/author/${req.params.author}`
    );
    req.books = response.data;
    next();
  } catch (error) {
    next(error);
  }
};

public_users.get("/axios/author/:author", fetchAuthor, (req, res) => {
  res.send(req.books);
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

// Asynchronous function to get book list based on Title
const fetchtitle = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://g37484-5000.csb.app/title/${req.params.title}`
    );
    req.books = response.data;
    next();
  } catch (error) {
    next(error);
  }
};

public_users.get("/axios/title/:title", fetchtitle, (req, res) => {
  res.send(req.books);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books[req.params.isbn].reviews, null, 4));
});

module.exports.general = public_users;
