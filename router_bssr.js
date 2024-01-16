const express = require("express");
const router_bssr = express.Router();
const gymController = require("./controllers/gymController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");

/****************************
 *        BSSR EJS          *
 ****************************/

// user realated routers
router_bssr
  .get("/sign-up", gymController.getsignupMygym)
  .post("/sign-up", gymController.signupProcess);

router_bssr
  .get("/login", gymController.getloginMygym)
  .post("/login", gymController.loginProcess);

router_bssr.get("/logout", gymController.logoutProcess);
router_bssr.get("/check-me", gymController.checkSessions);

router_bssr.get("/services/menu", gymController.getMygymData);

// products
router_bssr.get("/products/menu", gymController.getMyGYMProducts);

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
