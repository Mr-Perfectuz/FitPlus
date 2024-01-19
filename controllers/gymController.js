const User = require("../models/User");
const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");

let gymController = module.exports;

//home
gymController.home = async (req, res) => {
  try {
    console.log("GET cont.home");
    console.log("GET: cont/home ");
    res.render("home-page");
  } catch (err) {
    res.json({ state: "ERROR", message: err.message });
    console.log("fail, cont/home", err.message);
  }
};

gymController.getMyGymProducts = async (req, res) => {
  try {
    console.log("GET cont.getMygymData");
    const product = new Product();
    const data = await product.getAllProductDataGym(res.locals.user);
    res.render("gym-menu", { gym_data: data });
  } catch (err) {
    console.log("ERROR, cont/getMygymData", err.message);
    res.redirect("/fitPlus");
  }
};

// SIGN UP //
gymController.getsignupMygym = async (req, res) => {
  try {
    console.log("POST cont.getsignupMygym");
    res.render("signup");
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

gymController.signupProcess = async (req, res) => {
  try {
    console.log("POST cont.signupProcess");
    assert(req.file, Definer.general_err3);

    let new_user = req.body;
    new_user.user_type = "GYM";
    new_user.user_image = req.file.path;
    const user = new User();
    const result = await user.signupData(new_user);

    assert(result, Definer.general_err1);
    req.session.user = result;
    res.redirect("/fitPlus/products/menu");
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

// LOGIN //

gymController.getloginMygym = async (req, res) => {
  try {
    console.log("POST cont.getloginMygym");
    res.render("login");
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

gymController.loginProcess = async (req, res) => {
  try {
    console.log("POST cont.loginProcess");
    const data = req.body;
    const user = new User();
    const result = await user.loginData(data);
    console.log("data::", data);
    req.session.user = result;
    req.session.save(function () {
      result.user_type === "ADMIN"
        ? res.redirect("/fitPlus/all-restaurant")
        : res.redirect("/fitPlus/products/menu");
    });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

// LOGOUT //

gymController.logoutProcess = (req, res) => {
  console.log("GET cont.logoutProcess");

  res.send("ERROR logout sahifasi");
};

gymController.checkSessions = (req, res) => {
  if (req.session?.user) {
    res.json({ state: "sucess", data: req.session.user });
  } else {
    res.json({ state: "fail", message: "You are not authenticated !" });
  }
};

// VALIDATION

gymController.validateAuthGYM = (req, res, next) => {
  if (req.session?.user?.user_type === "GYM") {
    req.user = req.session.user;
    next();
  } else {
    res.json({
      state: "fail",
      message: "only authenticated users are allowed",
    });
  }
};
