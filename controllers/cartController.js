const CartItemModel = require("../model/AddToCart");
const productModel = require("../model/ProductModel")
const addToCartController = async (req, res) => {
  try {
    // Retrieve the cart item details from the request body
    const {
      userId,
      productId,
      productName,
      productCategory,
      productDescription,
      productDiscount,
      productPrice,
      productQuantity,
      size,
      quantities,
      productImage
    } = req.body;

    if (!userId) {
      return res.send({ error: "userId  is Required" });
    }

    if (!productId) {
      return res.send({ error: "productId  is Required" });
    }

    if (!productName) {
      return res.send({ error: "productName is Required" });
    }

    if (!productCategory) {
      return res.send({ error: "productCategory is Required" });
    }

    if (!productDescription) {
      return res.send({ error: "productDescription is Required" });
    }
    if (!productDiscount) {
      return res.send({ error: "productDiscount is Required" });
    }
    if (!productPrice) {
      return res.send({ error: "productPrice is Required" });
    }
    if (!productQuantity) {
      return res.send({ error: "productQuantity is Required" });
    }
    if (!size) {
      return res.send({ error: "size is Required" });
    }

    // Create a new cart item
    const cart = new CartItemModel({
      userId,
      productId,
      productName,
      productCategory,
      productDescription,
      productDiscount,
      productPrice,
      productQuantity,
      size,
      quantities: JSON.stringify(quantities),
    });
    if (productImage) {
      cart.productImage.data = fs.readFileSync(productImage.path);
      cart.productImage.contentType = productImage.type;
    }
    // Save the cart item to your database (or handle the logic to add it to the cart)
    await cart.save();

    // Respond with a success message or the updated cart
    res.status(201).json({
      success: true,
      message: "Product added to the cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to add product to the cart",
      error: error.message,
    });
  }
};

const GetAllCartProduct = async (req, res)=>{
  try{
    const userId = req.params.userId;
    const cart = await CartItemModel
    .find({userId})
    .populate("productCategory")
    .select("-productImage")
    .limit(12)
    .sort({ createdAt: -1 });
  res.status(201).send({
    success: true,
    counTotal: cart.length,
    message: "ALlProducts ",
    cart,
  });
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error in getting products",
    error: error.message,
  });
}
}

// get photo
const SingleCartImage = async (req, res) => {
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
const deleteCartProduct = async (req, res) => {
  try {
    await CartItemModel
      .findByIdAndDelete(req.params.pid)
      .select("-productCategory");
    res.status(201).send({
      success: true,
      message: "Remove product from cart  successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "failed to remove product from cart ",
      error,
    });
  }
};




module.exports = {
  addToCartController,
  GetAllCartProduct,
  SingleCartImage,
  deleteCartProduct
};
