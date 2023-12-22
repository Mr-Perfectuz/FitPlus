const express = require("express");
const router_bssr = express.Router();
const agencyController = require("./controllers/agencyController");

/****************************
 *        BSSR EJS          *
 ****************************/

// user realated routers
router_bssr
  .get("/sign-up", agencyController.getsignupMyAgency)
  .post("/sign-up", agencyController.signupProcess);

router_bssr
  .get("/login", agencyController.getloginMyAgency)
  .post("/login", agencyController.loginProcess);

router_bssr.get("/logout", agencyController.logoutProcess);
router_bssr.get("/check-me", agencyController.checkSessions);

router_bssr.get("/services/menu", agencyController.getMyAgencyData);

module.exports = router_bssr;
