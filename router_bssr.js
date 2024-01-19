const express = require("express");
const router_bssr = express.Router();
const gymController = require("./controllers/gymController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");
const uploader_members = require("./utils/upload-multer")("users");

/****************************
 *        BSSR EJS          *
 ****************************/

// user realated routersc
router_bssr.get("/", gymController.home);

router_bssr
  .get("/sign-up", gymController.getsignupMygym)
  .post("/sign-up", gymController.signupProcess);

router_bssr
  .get("/login", gymController.getloginMygym)
  .post("/login", gymController.loginProcess);

router_bssr.get("/logout", gymController.logoutProcess);
router_bssr.get("/check-me", gymController.checkSessions);

// products
router_bssr.get("/products/menu", gymController.getMyGymProducts);

router_bssr.post(
  "/products/create",
  gymController.validateAuthGYM,
  uploader_product.array("product_images", 5), // Use productUploader here
  productController.addNewProduct
);

router_bssr.post(
  "/products/edit/:id",
  gymController.validateAuthGYM,
  productController.updateChosenProduct
);

module.exports = router_bssr;
