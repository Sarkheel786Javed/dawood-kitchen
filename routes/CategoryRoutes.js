const express = require("express");
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware");
const {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} = require("../controllers/CategoryController");
// const formidable = require("express-formidable");

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
//  requireSignIn,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  //  requireSignIn,
  // formidable(),
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  //  requireSignIn,
  deleteCategoryCOntroller
);
module.exports = router;
