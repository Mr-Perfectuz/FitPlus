const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

/****************************
 *        REST API           *
 ****************************/

// user realated routers
router.get("/", userController.home);
router.post("/sign-up", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
