import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeIcon from "@mui/icons-material/Mode";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

function UpdateProducts() {
  const baseurl = process.env.REACT_APP_API_URL
  const params = useParams(); //
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState(null); // Initialize to null
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescriptioin] = useState("");
  /////////////////sent gategory to api////////////////////////////////
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState(0);
  const [productQuantity, setProductQuantity] = useState("");
  const [productSize, setProductSize] = useState("");
  const [id, setId] = useState("");

  //get single product
  
  const getSingleproduct = async () => {
    try {
      const { data } = await axios.get(
        `${baseurl}/auth/product/get-single-product/${params.slug}`
      );
      console.log(data);
      setId(data.product._id);
      setProductImage(data.product.productImage); // Set the product image if it exists
      setProductName(data.product.productName);
      setProductDescriptioin(data.product.productDescription);
      setProductCategory(data.product.productCategory._id);
      setProductPrice(data.product.productPrice);
      setProductDiscount(data.product.productDiscount);
      setProductQuantity(data.product.productQuantity);
      setProductSize(data.product.productSize);
    } catch (error) {
      console.log(error);
      window.alert("Failed to get This Product  ");
    }
  };
  useEffect(() => {
    getSingleproduct();
  }, []);
  ////////////----------get all product---------------\\\\\\\\\\\\\

  const [AllProduct, setAllProduct] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/product/get-product`);
      setAllProduct(data.product);
    } catch (error) {
      console.log(error);
      window.alert("Failed to Get All Product");
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  /////////////get all category////////////////////
  const [Categories, setCategories] = useState([]);
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      window.alert("Failed to get  Categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  //  --------------image Name discription category price Size-------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  //////////////end get all category///////////////

  ////////////----------update  all product---------------\\\\\\\\\\\\\
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("productName", productName); //
      // Check if productImage is not null before appending
      if (productImage) {
        productData.append("productImage", productImage);
      }
      productData.append("productDescription", productDescription); //
      productData.append("productCategory", productCategory); //
      productData.append("productPrice", productPrice); //
      productData.append("productDiscount", productDiscount); //
      productData.append("productQuantity", productQuantity);
      productData.append("productSize", productSize);
      const { data } = await axios.put(
        `${baseurl}/auth/product/update-product/${id}`,
        productData
      );
      if (data.success) {
        window.alert(data?.message);
        navigate("/private/auth/manage-product");
      } else {
        window.alert("Product Updated Successfully");
      }
      getSingleproduct()
      getAllCategory()
      getAllProduct()
    } catch (error) {
      console.log(error);
      window.alert("Faild to Update Product");
    }
  };
  //////////////////////////////////////////////////////
  //////////-----------handle delete--------------\\\\\\\\\\\\\\
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this Product ? ");
      if (!answer) return;
      await axios.delete(`${baseurl}/auth/product/delete-product/${id}`);
      window.alert("Product  Deleted Successfully");
      getSingleproduct()
      getAllCategory()
      getAllProduct()
      navigate("/private/auth/update-product");
    } catch (error) {
      console.log(error);
      window.alert("Faild to Delete Product");
    }
  };

  return (
    <div>
      <div style={styles.background}>
        <Box
          id="updateproduct"
          sx={{
            paddingTop: "80px",
            width: "100%",
          }}
        >
          <Typography style={styles.headingofProduct} variant="h4">
            Update Product
          </Typography>
          <form onSubmit={handleUpdateProduct} style={{ marginTop: "50px" }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                sx={{ backgroundColor: "lightgrey" }}
              >
                <Box style={styles.image} component={Paper}>
                  {productImage ? (
                    <Box>
                      <TextField
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {productImage && (
                        <img
                          src={URL.createObjectURL(productImage)}
                          alt="ProductImage"
                          height="400px"
                          width="100%"
                        />
                      )}
                    </Box>
                  ) : (
                    <img
                      src={`${baseurl}/auth/product/product-photo/${id}`}
                      alt="ProductImage"
                      height="400px"
                      width="100%"
                    />
                  )}
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={styles.picarea}
              >
                <TextField
                  sx={{ my: 2 }}
                  id="outlined-controlled"
                  label="Product Name"
                  fullWidth
                  type="text"
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                />
                <TextareaAutosize
                  style={{ height: "50px", width: "100%" }}
                  type="text"
                  sx={{ my: 2 }}
                  value={productDescription}
                  onChange={(e) => setProductDescriptioin(e.target.value)}
                  placeholder="Product Description"
                />
                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel id="demo-simple-select-label">
                    Select Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="category"
                    onChange={(e) => {
                      setProductCategory(e.target.value);
                    }}
                    value={productCategory}
                  >
                    {Categories.map((c) => (
                      <MenuItem key={c._id} value={c._id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  sx={{ my: 2 }}
                  id="outlined-controlled"
                  label="Price"
                  type="number"
                  fullwidth
                  value={productPrice}
                  onChange={(e) => {
                    setProductPrice(e.target.value);
                  }}
                />
                <TextField
                  sx={{ my: 2 }}
                  id="outlined-controlled"
                  label="Discount"
                  type="number"
                  fullwidth
                  value={productDiscount}
                  onChange={(e) => {
                    setProductDiscount(e.target.value);
                  }}
                />
                <TextField
                  sx={{ my: 2 }}
                  id="outlined-controlled"
                  label="Product Quantity"
                  fullWidth
                  type="number"
                  value={productQuantity}
                  onChange={(e) => {
                    setProductQuantity(e.target.value);
                  }}
                />

                <FormControl fullWidth sx={{ my: 1 }}>
                  <InputLabel id="demo-simple-select-label">
                    Product Size
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productSize}
                    label="Size"
                    onChange={(e) => {
                      setProductSize(e.target.value);
                    }}
                  >
                    <MenuItem value="Extra Small">Extra Small</MenuItem>
                    <MenuItem value="Small">Small</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Large">Large</MenuItem>
                    <MenuItem value="Extra-Large">Extra Large</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ my: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>

          {/*-------------------get all product------------------------*/}
          <Box sx={{ height: "100vh", backgroundColor: "lightgrey" }}>
            <Typography
              variant="h3"
              sx={{ width: "100%", color: "Teal", textAlign: "center" }}
            >
              All Products
            </Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "Teal" }}>
                  <TableRow sx={{ color: "white" }}>
                    <TableCell align="left">name</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Discount</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="left">Size</TableCell>
                    <TableCell align="left">Update</TableCell>
                    <TableCell align="left">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {AllProduct.map((p) => (
                    <TableRow
                      key={p._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        textDecoration: "none",
                      }}
                      component={Link} // Make the TableRow a Link component
                      to={`/private/auth/Update-product/${p.slug}`}
                    >
                      <TableCell align="left">{p.productName}</TableCell>
                      <TableCell align="left">
                        {p.productCategory?.name}
                      </TableCell>
                      <TableCell align="left">{p.productPrice}</TableCell>
                      <TableCell align="left">{p.productDiscount}</TableCell>
                      <TableCell align="left">{p.productQuantity}</TableCell>
                      <TableCell align="left">{p.productSize}</TableCell>
                      <TableCell align="left">
                        <ModeIcon />
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleDelete}
                        >
                          <DeleteForeverOutlinedIcon sx={{ color: "white" }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/*-------------------get all product------------------------*/}
        </Box>
      </div>
    </div>
  );
}

export default UpdateProducts;

const styles = {
  background: {
    backgroundColor: " white)",
  },
  picarea: {
    padding: "20px",
    height: "100vh",
  },
  image: {
    marginBottom: "20px",
    marginTop: "",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageUploadbutton: {
    backgroundColor: "Teal",
    width: "100%",
    boxShadow:
      "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headingofProduct: {
    textAlign: "center",
    marginTop: "20px",
    fontWeight: "600",
    color: "Teal",
  },
};
