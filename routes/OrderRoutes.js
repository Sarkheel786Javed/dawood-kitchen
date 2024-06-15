const express = require("express");
const {
  CheckOutController,
  GetAllOrders,
  UpdateStatusController,
  GetAllProductbyUserId
} = require("../controllers/orderController");
const formidable = require("express-formidable");
const router = express.Router();

//routes 
// /api/auth/checkout/checkout-payments
router.post("/checkout-payments", CheckOutController);

//   /api/auth/checkout/get-order/:userRole
router.get("/get-order", GetAllOrders);

// by user id
// /api/auth/checkout/get-order/:userId
router.get("/get-order/:userId", GetAllProductbyUserId);

//   /api/auth/checkout/get-order/:userRole
// update order status
router.post("/update-status", UpdateStatusController);
module.exports = router;
