const express = require('express');
const multer = require('multer');
const path = require('path');
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getAllUser,
  getSingleuser,
  updateRegisterController,
  userPhotoController
} = require('../controllers/authController');
const { isAdmin, requireSignIn } = require('../middleware/authMiddleware');

// Create Express router
const router = express.Router();



// Routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.get("/test", requireSignIn, isAdmin, testController);
router.get("/get-all-user", getAllUser);
router.get("/get-user/:userId", getSingleuser);
// router.put("/profile/:id", updateRegisterController);
router.get("/get-photo/:pid", userPhotoController);
router.post(
  "/profile/:id",
  upload.single("authImage"), // assuming "authImage" is the field name in the form
  updateRegisterController
);



module.exports = router;
