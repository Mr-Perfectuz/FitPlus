console.log("Web Serverni boshlash");
const express = require("express");
const app = express();

const db = require("./server").db();
const mongodb = require("mongodb");
const router = require("./router");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code
app.use("/", router);

module.exports = app;
