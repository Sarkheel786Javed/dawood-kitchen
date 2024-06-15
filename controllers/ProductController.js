const productModel = require("../model/ProductModel");
const fs = require("fs");
const slugify = require("slugify");

const createProductController = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productSize,
      productQuantity,
      productDiscount,
    } = req.fields;
    const { productImage } = req.files;

    //alidation
    switch (true) {
      case !productName:
        return res.status(500).send({ error: "Product Name is Required" });
      case !productDescription:
        return res
          .status(500)
          .send({ error: "Product Discription is Required" });
      case !productPrice:
        return res.status(500).send({ error: "Product Price is Required" });
      case !productCategory:
        return res.status(500).send({ error: "Product Category is Required" });
      case !productSize:
        return res.status(500).send({ error: "Product Size is Required" });
      case !productQuantity:
        return res.status(500).send({ error: "Product Quantity is Required" });
      case productImage && productImage.size > 1000000:
        return res.status(500).send({
          error: "productImage is Required and should be less then 1mb",
        });
    }
    const product = await new productModel({
      ...req.fields,
      slug: slugify(productName),
    });
    if (productImage) {
      product.productImage.data = fs.readFileSync(productImage.path);
      product.productImage.contentType = productImage.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

//update product
const updateProductController = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productSize,
      productQuantity,
      productDiscount,
    } = req.fields;

    const { productImage } = req.files;
    //validations

    switch (true) {
      case !productName:
        return res.status(500).send({ error: "Product Name  is required" });
      case !productDescription:
        return res
          .status(500)
          .send({ error: "Product Discription  is required" });
      case !productPrice:
        return res.status(500).send({ error: "Product Price  is required" });
      case !productCategory:
        return res.status(500).send({ error: "Product category  is required" });
      case !productSize:
        return res.status(500).send({ error: "Product Size  is required" });
      case !productQuantity:
        return res.status(500).send({ error: "Product Quantity  is required" });
      case productImage && productImage.size > 1000000:
        return res.status(500).send({
          error: "Product Image is Required and should be less then 1mb",
        });
    }

    const product = await productModel.findOneAndUpdate(
      { _id: req.params.pid }, // Use an object to specify the filter
      { ...req.fields, slug: slugify(productName) }, // Update data
      { new: true } // Options
    );
    if (productImage) {
      product.productImage.data = fs.readFileSync(productImage.path);
      product.productImage.contentType = productImage.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Failed to Update Product",
    });
  }
};

//get all products
const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("productCategory")
      .select("-productImage")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      counTotal: product.length,
      message: "ALlProducts ",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// get single product
const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-productImage")
      .populate("productCategory");
    res.status(201).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
const productPhotoController = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pid)
      .select("productImage");
    if (product.productImage.data) {
      res.set("Content-type", product.productImage.contentType);
      return res.status(201).send(product.productImage.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
const deleteProductController = async (req, res) => {
  try {
    await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-productImage");
    res.status(201).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
};
