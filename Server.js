const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./dbconfig/db");
const authRoutes = require("./routes/authRoute");
const CategoryRoutes = require("./routes/CategoryRoutes");
const CreateProduct = require("./routes/ProductRoutes");
const AddToCart = require("./routes/AddToCartRoutes");
const CheckOut = require("./routes/OrderRoutes");
const Message = require("./routes/MessagesRoutes");
const path = require("path");

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// Create an Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Static files for frontend (Uncomment if you have a frontend build directory)
// app.use(express.static(path.join(__dirname, "./client/build")));

// Uncomment if you want to serve frontend files
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"), function (err) {
//     if (err) {
//       console.error(err);
//       res.status(500).send(err);
//     }
//   });
// });

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/category", CategoryRoutes);
app.use("/api/auth/product", CreateProduct);
app.use("/api/auth/cart", AddToCart);
app.use("/api/auth/checkout", CheckOut);
app.use("/api/auth/message", Message);

// Get the port from environment variables or default to 8080
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
