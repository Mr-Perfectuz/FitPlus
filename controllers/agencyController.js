const User = require("../models/User");

let agencyController = module.exports;

agencyController.getMyAgencyData = (req, res) => {
  try {
    console.log("GET cont.getMyAgencyData");
    res.render("agency-menu");
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

// SIGN UP //
agencyController.getsignupMyAgency = async (req, res) => {
  try {
    console.log("POST cont.getsignupMyAgency");
    res.render("signup");
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

agencyController.signupProcess = async (req, res) => {
  try {
    console.log("POST cont.signupProcess");
    const data = req.body;
    const user = new User();
    const new_user = await user.signupData(data);

    req.session.user = new_user;
    res.redirect("/vivaAdmin/services/menu");
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

// LOGIN //

agencyController.getloginMyAgency = async (req, res) => {
  try {
    console.log("POST cont.getloginMyAgency");
    res.render("login");
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

agencyController.loginProcess = async (req, res) => {
  try {
    console.log("POST cont.loginProcess");
    const data = req.body;
    const user = new User();
    const result = await user.loginData(data);
    req.session.user = result;
    req.session.save(function () {
      res.redirect("/vivaAdmin/services/menu");
    });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

// LOGOUT //

agencyController.logoutProcess = (req, res) => {
  console.log("GET cont.logoutProcess");

  res.send("ERROR logout sahifasi");
};
