const User = require("../models/User");
const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");
const Gym = require("../models/Gym");
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
        ? res.redirect("/fitPlus/all-gyms")
        : res.redirect("/fitPlus/products/menu");
    });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(err.message);
  }
};

// LOGOUT //

gymController.logoutProcess = (req, res) => {
  try {
    console.log(" GET cont/logoutProcess");
    req.session.destroy(function () {
      res.redirect("/fitPlus");
    });
  } catch (error) {
    console.log("ERROR: cont/logoutProcess", err.message);
    res.json({ state: "fail", message: err.message });
  }
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

// ADMIN
gymController.validateAdmin = (req, res, next) => {
  console.log(" GET cont/validateAdmin");
  if (req?.session?.user?.user_type === "ADMIN") {
    req.user = req.session.user;
    next();
  } else {
    const html = `<script>
              alert("Admin page: Permission denied !");
              window.location.replace('/fitPlus');
              </script>`;
    res.end(html);
  }
};

gymController.getAllGym = async (req, res) => {
  try {
    console.log(" GET cont/getAllGym");
    const gym = new Gym();
    const gym_data = await gym.getAllRestaurantsData();
    res.render("all-gyms", { gym_data: gym_data });
  } catch (err) {
    console.log("ERROR: cont/getAllGym", err.message);
    res.json({ state: "fail", message: err.message });
  }
};
