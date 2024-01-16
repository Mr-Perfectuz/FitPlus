console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const router = require("./router");
const router_bssr = require("./router_bssr");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
var store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//2 Session codlari
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60, // for 60 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code
app.use("/", router);
app.use("/fitPlus", router_bssr);

module.exports = app;
