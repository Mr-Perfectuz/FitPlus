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

    res.json({ state: "success", data: new_user });
  } catch (err) {
    console.log("ERROR POST cont.signup");
    res.json({ state: "fail", message: err.massage });
  }
};

userController.login = async (req, res) => {
  try {
    console.log("POST cont.login");
    const data = req.body;
    const user = new User();
    const result = await user.loginData(data);

    res.json({ state: "success", data: result });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

userController.logout = (req, res) => {
  console.log("GET cont.logout");

  res.send("ERROR logout sahifasi");
};
