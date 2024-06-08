const express = require("express");
const {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} = require("../controllers/ProductController");
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware");
const formidable = require("express-formidable");
const router = express.Router();

//routes
router.post("/create-product", formidable(), createProductController);
//routes
router.put("/update-product/:pid", formidable(), updateProductController);
//get products
router.get("/get-product", getProductController);
//single product
router.get("/get-single-product/:slug", getSingleProductController);
//get photo
router.get("/product-photo/:pid", productPhotoController);
//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

module.exports = router;
