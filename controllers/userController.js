const User = require("../models/User");

let userController = module.exports;

userController.home = (req, res) => {
  console.log("GET cont.home");
  res.send("home sahifasi");
};
userController.signup = async (req, res) => {
  try {
    console.log("POST cont.signup");
    const data = req.body;
    const user = new User();
    const new_user = await user.signupData(data);

    res.send("signup sahifasi");
  } catch (error) {
    console.log("POST cont.signup");
    throw error;
  }
};

userController.login = (req, res) => {
  try {
    console.log("POST cont.login");
    res.send("login sahifasi");
  } catch (error) {
    console.log("POST cont.login");
    throw error;
  }
};

userController.logout = (req, res) => {
  console.log("GET cont.logout");

  res.send("logout sahifasi");
};
