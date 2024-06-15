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
// const path = require("path");

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();
// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"), function (err) {
//     if (err) {
//       console.error(err);
//       res.status(500).send(err);
//     }
//   });
// });


//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes 
app.use("/api/auth", authRoutes);
app.use("/api/auth/category", CategoryRoutes);
app.use("/api/auth/product", CreateProduct);
app.use("/api/auth/cart", AddToCart);
app.use("/api/auth/checkout", CheckOut);
app.use("/api/auth/message", Message);
//PORT1
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
