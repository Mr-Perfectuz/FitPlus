let userController = module.exports;

userController.home = (req, res) => {
  console.log("GET cont.home");
  res.send("home sahifasi");
};
userController.signup = (req, res) => {
  console.log("POST cont.signup");
  res.send("sign-up sahifasi");
};
userController.login = (req, res) => {
  console.log("POST cont.login");

  res.send("login sahifasi");
};
userController.logout = (req, res) => {
  console.log("GET cont.logout");

  res.send("logout sahifasi");
};
