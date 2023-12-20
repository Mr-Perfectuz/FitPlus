console.log("Web Serverni boshlash");
const express = require("express");
const app = express();

const db = require("./server").db();
const mongodb = require("mongodb");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
});

app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code

module.exports = app;
