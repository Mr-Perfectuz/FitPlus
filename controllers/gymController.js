const User = require("../models/User");

let gymController = module.exports;

gymController.getMygymData = (req, res) => {
  try {
    console.log("GET cont.getMygymData");
    res.render("gym-menu");
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
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
    const data = req.body;
    const user = new User();
    const new_user = await user.signupData(data);

    req.session.user = new_user;
    res.redirect("/fitPlus/services/menu");
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
    req.session.user = result;
    req.session.save(function () {
      res.redirect("/fitPlus/services/menu");
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
