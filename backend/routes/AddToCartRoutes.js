const express = require("express");
const {
    addToCartController,
    GetAllCartProduct,
    // SingleCartImage,
    deleteCartProduct
} = require("../controllers/cartController");
// const formidable = require("express-formidable");
const router = express.Router();

//routes
router.post("/cart-items", addToCartController);

// get all product image 
router.get("/get-cart/:userId", GetAllCartProduct);

// single product image 
// router.get("/cart-photo/:pid", SingleCartImage);

router.delete("/cart-delete/:pid", deleteCartProduct);

module.exports = router;
// 654542d939181e3b2b19c6d8
// 654588a4ff5395174cd86f11