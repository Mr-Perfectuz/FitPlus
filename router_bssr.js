const express = require("express");
const router_bssr = express.Router();
const agencyController = require("./controllers/agencyController");

/****************************
 *        BSSR EJS          *
 ****************************/

// user realated routers
router_bssr.get("/sign-up", agencyController.getsignupMyAgency);
router_bssr.post("/sign-up", agencyController.signupProcess);

router_bssr.get("/login", agencyController.getloginMyAgency);
router_bssr.post("/login", agencyController.loginProcess);

router_bssr.get("/logout", agencyController.logoutProcess);

module.exports = router_bssr;
