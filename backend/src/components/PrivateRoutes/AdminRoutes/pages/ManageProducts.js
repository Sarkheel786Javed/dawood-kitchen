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
import axios from "axios";
// import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ModeIcon from "@mui/icons-material/Mode";

function ManageProducts() {
  // const navigate = useNavigate();
  const baseurl = process.env.REACT_APP_API_URL

  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescriptioin] = useState("");
  /////////////////sent gategory to api////////////////////////////////
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productSize, setProductSize] = useState("");
  /////////////get all category////////////////////
  const [Categories, setCategories] = useState([]);

  //------------------------update category--------------------------\\
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      window.alert("Failed to get  Categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  ////////////////////////////////////////////////////////////////////

  //------------image Name discription category price Size-------------------\\
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };
  /////////////////---------------------product add-------------\\\\\\\\\\\\\\\\\\\\\\\
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("productImage", productImage);
      productData.append("productName", productName);
      productData.append("productDescription", productDescription);
      productData.append("productCategory", productCategory);
      productData.append("productPrice", productPrice);
      productData.append("productDiscount", productDiscount);
      productData.append("productQuantity", productQuantity);
      productData.append("productSize", productSize);
      const { data } = await axios.post(
        `${baseurl}/auth/product/create-product`,
        productData
      );
      if (data?.success) {
        window.alert("Post  Product  Successfully");
        // navigate("/private/auth/manage-product");
      } else {
        window.alert(data?.message);
      }
      getAllCategory()
      getAllProduct()
    } catch (error) {
      console.log(error);
      window.alert("Post Product Failed");
    }
  };
  //////////////////////////////////////////////////////

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

  return (
    <div style={styles.background}>
      <Box
        sx={{
          paddingTop: "80px",
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              sx={{ padding: "15px" }}
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
                        sx
                        src={URL.createObjectURL(productImage)}
                        alt="ProductImage"
                        height="400px"
                        width="100%"
                      />
                    )}
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      display: "block",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      style={styles.imageUploadbutton}
                      placeholder="upload Image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Typography>
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
              <Box style={styles.headingofProduct}>
                <Typography variant="h4">Create Product</Typography>
              </Box>
              <TextField
                sx={{ py: 1 }}
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
                value={productDescription}
                onChange={(e) => setProductDescriptioin(e.target.value)}
                placeholder="Product Description"
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                  }}
                >
                  {Categories.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                sx={{ py: 1, mx: "1" }}
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
                sx={{ py: 1, mx: "1" }}
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
                sx={{ py: 1 }}
                id="outlined-controlled"
                label="Product Quantity"
                fullWidth
                type="number"
                value={productQuantity}
                onChange={(e) => {
                  setProductQuantity(e.target.value);
                }}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Product Size
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={productSize}
                  label="Age"
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

              <Button variant="contained" fullWidth onClick={handleSubmit}>
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
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "Teal" }}>
                <TableRow sx={{ color: "white" }}>
                  <TableCell align="left">name</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Discount</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Size</TableCell>
                  <TableCell align="left">Update</TableCell>
                  <TableCell align="left">All Details</TableCell>
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
                  >
                    <TableCell align="left">{p.productName}</TableCell>
                    <TableCell align="left">
                      {p.productCategory?.name}
                    </TableCell>
                    <TableCell align="left">{p.productPrice}</TableCell>
                    <TableCell align="left">{p.productDiscount}%</TableCell>
                    <TableCell align="left">{p.productQuantity}</TableCell>
                    <TableCell align="left">{p.productSize}</TableCell>
                    <TableCell
                      align="left"
                      component={Link} // Make the TableRow a Link component
                      to={`/private/auth/Update-product/${p.slug}`}
                    >
                      <ModeIcon />
                    </TableCell>
                    <TableCell align="left">
                      {/*-------------view  product all details-----------------------*/}
                      {/* Button trigger modal */}
                      <button
                        variant="contained"
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target={`#staticBackdrop-${p._id}`} // Append _id to the id attribute
                      >
                        More Details
                      </button>
                    </TableCell>
                    {/* Modal */}
                    <div
                      key={p._id}
                      className="modal fade"
                      id={`staticBackdrop-${p._id}`} // Append _id to the id attribute
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex="-1"
                      aria-labelledby={`staticBackdropLabel-${p._id}`} // Append _id to the aria-labelledby attribute
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button
                              type="button"
                              className="btn-close "
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <Box
                              component={Paper}
                              sx={{
                                backgroundColor: "rgba(240, 240, 240, 0.096)",
                                color: "black",
                                padding: "15px",
                              }}
                            >
                              <Grid spacing={1} sx={{ padding: "20px" }}>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                  <img
                                    src={`/api/auth/product/product-photo/${p._id}`}
                                    alt="ProductImage"
                                    height="400px"
                                    width="100%"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                  <Typography>
                                    <label
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Product Name:
                                    </label>
                                    {p.productName}
                                  </Typography>
                                  <Typography>
                                    <label
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Product Description:
                                    </label>
                                    {p.productDescription}
                                  </Typography>
                                  <Typography>
                                    <label
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Product Category:
                                    </label>
                                    {p.productCategory?.name}
                                  </Typography>
                                  <Typography>
                                    <label
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Product Price:
                                    </label>
                                    {p.productPrice}
                                  </Typography>
                                  <Typography>
                                    <label
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Product Price:
                                    </label>
                                    {p.productDiscount}%
                                  </Typography>
                                  <Typography>
                                    <label
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Product Quantity:
                                    </label>
                                    {p.productQuantity}
                                  </Typography>
                                  <Typography>
                                    <label
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Product Size:
                                    </label>
                                    {p.productSize}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/*-------------------get all product------------------------*/}
      </Box>
    </div>
  );
}

export default ManageProducts;

const styles = {
  background: {
    backgroundColor: " white)",
  },
  picarea: {
    padding: "15px",
    height: "100vh",
  },
  image: {
    marginBottom: "20px",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid dotted",
    width: "100%",
    height: "500px",
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
