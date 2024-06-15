const express = require("express");
const {MessagesController,GetAllMessagesController} = require("../controllers/MessagesController.js");
// const formidable = require("express-formidable");
const router = express.Router();

//routes 
// /api/auth/message/checkout-payments
router.post("/get-in-touch", MessagesController);

//   /api/auth/checkout/get-order/:userRole
router.get("/all-messages/:userId", GetAllMessagesController);

module.exports = router;
