import React, { useState, useEffect } from "react";
// import { ThemeContext } from "../useContext/globalContext";
import axios from "axios";
import "./Ourmenu.css";
import { useNavigate } from "react-router";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
const OurMenu = () => {
  const navigate = useNavigate();
  const baseurl = process.env.REACT_APP_API_URL
  // const { darkMode } = useContext(ThemeContext);
  const Auth = JSON.parse(localStorage.getItem("auth"));

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [size, setSize] = useState({});

 
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/category/get-category`);
      if (data?.success) {
        setCategories(data ? data.category : "");
      }
    } catch (error) {
      console.log(error);
      window.alert("Something went wrong in getting categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

 
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/product/get-product`);
      setAllProducts(data.product);
      setFilteredProducts(data?.product);
    } catch (error) {
      console.log(error);
      window.alert("Failed to Get All Product");
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  // Function to handle category filter

  const handlefilterProduct = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    if (all.length === 0) {
      setFilteredProducts(allProducts); // Show all products
    } else {
      const filteredProducts = allProducts.filter((product) =>
        all.includes(product.productCategory._id)
      );
      setFilteredProducts(filteredProducts);
    }
  };
  /////////////////-------------quantity----------------\\\\\\\\\\\\\\\\\\\\\
  // Create an object to store quantities for each product
  const [quantities, setQuantities] = useState("");

  // Function to increment the count for a specific product
  const increment = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  // Function to decrement the count for a specific product
  const decrement = (productId) => {
    if (quantities[productId] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };

  const addToCart = async (product) => {
    if (Auth) {
      try {
        const quantity = quantities[product._id] || 0; // Get the quantity for the specific product

        const ADDcartItem = {
          userId: Auth.user._id,
          productId: product._id,
          productName: product.productName,
          productCategory: product.productCategory,
          productDescription: product.productDescription,
          productDiscount: product.productDiscount,
          productPrice: product.productPrice,
          productQuantity: product.productQuantity,
          size,
          quantities: quantity,
        };

        const { data } = await axios.post(
          `${baseurl}/auth/cart/cart-items`,
          ADDcartItem
        );
        if (data?.success) {
          window.alert("Product Add to Cart ");
        }
        getAllCategory()
        getAllProduct()
      } catch (error) {
        console.log(error);
        window.alert("Failed To Product Add to Cart ");
      }
    } else {
      navigate("/");
    }
  };

  const [isOpen, setIsColosed] = useState(false);

  const handleFilterView = () => {
    setIsColosed(!isOpen);
  };

  return (
    <div>
      <Navbar />
      <section className="bg-04" id="our-menu">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="heading">
                <span>Menu</span>
                <h2>Explore Our Best Menu</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores officiis explicabo blanditiis consequuntur fugit
                  fugiat, incidunt totam consectetur veritatis minus corporis
                  doloribus, qui maxime velit nesciunt, officia praesentium odit
                  facilis.
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="container-fluid">
                <div className="row">
                  <div
                    className={`col-xs-0 col-sm-0 col-md-${
                      isOpen ? 1 : 2
                    } col-lg-${isOpen ? 1 : 2} col-xl-${isOpen ? 1 : 2}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        height: isOpen ? "70px" : "",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        {isOpen ? (
                          <button
                            className="btn btn-warning w-40px "
                            onClick={handleFilterView}
                            style={{
                              height: "30px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {">>"}
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning w-40px "
                            onClick={handleFilterView}
                            style={{
                              height: "30px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {"<<"}
                          </button>
                        )}
                      </div>
                      <div
                        style={{
                          border: isOpen ? "" : "1px solid  lightgrey",
                          padding: "10px",
                        }}
                      >
                        <label className="fw-bold fs-4">Filter</label>
                        <div style={{ display: isOpen ? "none" : "" }}>
                          {categories.map((c) => (
                            <div className="form-check mx-3" key={c._id}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue
                                id="flexCheckChecked"
                                value={checked}
                                onChange={(e) =>
                                  handlefilterProduct(e.target.checked, c._id)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                              >
                                {c.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-xs-12 col-sm-12 col-md-${
                      isOpen ? 10 : 11
                    } col-lg-${isOpen ? 11 : 10} col-xl-${isOpen ? 11 : 10}`}
                  >
                    <div className="text-center fs-3 fw-bold">Products</div>

                    <div className="container-fluid">
                      <div className="row">
                        {filteredProducts.map((product) => (
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 d-flex justify-content-center align-items-center">
                            <div
                              className="wrapper "
                              style={{
                                width: "18rem",
                                boxShadow:
                                  "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                              }}
                            >
                              <div className="tab-content">
                                <figure>
                                  <img
                                    src={
                                      product.productImage ||
                                      `${baseurl}/auth/product/product-photo/${product._id}`
                                    }
                                    alt="..."                                    
                                    height="200"
                                    width="100%"
                                  />
                                </figure>
                                <div className="sentence">
                                  <h3>
                                    <span className="produce_name">
                                      {product.productName}...
                                    </span>
                                    <span>$ {product.productPrice}</span>
                                  </h3>

                                  <p className="produce_description">
                                    {product.productDescription}...
                                  </p>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                  <label className="mx-3 fw-bold fs-5">
                                    Size
                                  </label>
                                  <select
                                    className="form-select quantity_select"
                                    value={size[product._id]}
                                    onChange={(e) =>
                                      setSize(e.target.value, product._id)
                                    }
                                  >
                                    <option value={""}></option>
                                    <option value={"Small"}>Small</option>
                                    <option value={"Medium"}>Medium</option>
                                    <option value={"Large"}>Large</option>
                                    <option value={"X-Large"}>X-Large</option>
                                  </select>
                                </div>

                                <>
                                  <div className="my-2 d-flex justify-content-center align-items-center">
                                    <label className="mx-2">Quantity</label>
                                    <button
                                      className="btn btn-warning"
                                      onClick={() => decrement(product._id)}
                                    >
                                      -
                                    </button>

                                    <div className="btn btn-warning mx-2">
                                      {quantities[product._id] || 0}
                                    </div>
                                    <button
                                      className="btn btn-warning"
                                      onClick={() => increment(product._id)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </>

                                <div className="rate-box">
                                  <ol>
                                    <li>
                                      <span className="flaticon-star" />
                                    </li>
                                    <li>
                                      <span className="flaticon-star" />
                                    </li>
                                    <li>
                                      <span className="flaticon-star" />
                                    </li>
                                    <li>
                                      <span className="flaticon-star" />
                                    </li>
                                  </ol>
                                  <div className="plus">
                                    <a onClick={() => addToCart(product)}>
                                      <span className="flaticon-plus" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OurMenu;
