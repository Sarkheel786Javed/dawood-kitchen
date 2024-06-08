import React, { useState, useEffect } from "react";
// import { ThemeContext } from "../useContext/globalContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { MenuItem } from "@mui/material";
const Main = () => {
  const baseurl = process.env.REACT_APP_API_URL
  const navigate = useNavigate();
  // const { darkMode } = useContext(ThemeContext);
  const Auth = JSON.parse(localStorage.getItem("auth"));

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [size, setSize] = useState({});

  var auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth?.user?._id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      debugger;
      data.userId = userId;
      const res = await axios.post(`${baseurl}/message/get-in-touch`, data);
      console.log(data);
      if (res.data.success) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
      getAllCategory()
      getAllProduct()
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: " Failed to sent Message successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
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
      } catch (error) {
        console.log(error);
        window.alert("Failed To Product Add to Cart ");
      }
      getAllCategory()
      getAllProduct()
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
      <main>
        <section className="slider">
          <div className="shape" />
          <div className="shape-01" />
          <div className="banner">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={0}
                  className="active"
                />
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={1}
                />
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={2}
                />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="wrapper">
                          <div className="content">
                            <h1>your favourite food delivered &amp; fresh</h1>
                            <h5>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Consequuntur, natus magnam
                              incidunt iste, architecto voluptate amet veniam
                              odio, reiciendis modi
                            </h5>
                            <ol>
                              <li>
                                <Link to="#">
                                  Order Now
                                  <span className="flaticon-right-arrow" />
                                </Link>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="wrapper">
                          <img src="assets/images/slider/slide-01.png" alt="..." />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="wrapper">
                          <div className="content">
                            <h1>your favourite food delivered &amp; fresh</h1>
                            <h5>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Consequuntur, natus magnam
                              incidunt iste, architecto voluptate amet veniam
                              odio, reiciendis modi
                            </h5>
                            <ol>
                              <li>
                                <Link to="#">
                                  Order Now
                                  <span className="flaticon-right-arrow" />
                                </Link>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="wrapper">
                          <img src="assets/images/slider/slide-02.png" alt="..." />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="wrapper">
                          <div className="content">
                            <h1>your favourite food delivered &amp; fresh</h1>
                            <h5>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Consequuntur, natus magnam
                              incidunt iste, architecto voluptate amet veniam
                              odio, reiciendis modi
                            </h5>
                            <ol>
                              <li>
                                <Link to="#">
                                  Order Now
                                  <span className="flaticon-right-arrow" />
                                </Link>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="wrapper">
                          <img src="assets/images/slider/slide-03.png" alt="..." />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </section>
        {/* --------------------------------------------------------------------------- */}
        <section className="bg-01">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-xs-6">
                <div className="wrapper">
                  <div className="content">
                    <div className="icon">
                      <span className="flaticon-clock" />
                    </div>
                    <div className="sentence">
                      <strong>Today 10:00 am-7:00 pm</strong>
                      <p>Working Hours</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-xs-6">
                <div className="wrapper">
                  <div className="content">
                    <div className="icon">
                      <span className="flaticon-pin" />
                    </div>
                    <div className="sentence">
                      <strong>Arcadia USA</strong>
                      <p>Get Directions</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-xs-6">
                <div className="wrapper">
                  <div className="content">
                    <div className="icon">
                      <span className="flaticon-call" />
                    </div>
                    <div className="sentence">
                      <strong>419-704-4407</strong>
                      <p>Call Online</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* --------------------------------------------------------------------------- */}
        <section className="bg-02" id="about-us">
          <div className="shape-02" />
          <div className="shape-03" />
          <div className="shape-04" />
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="wrapper">
                  <div className="image">
                    <img src="assets/images/about.png" alt="..." />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="content">
                  <span>About</span>
                  <h2>Food Is Important part of a balanced diet</h2>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Provident expedita et laudantium excepturi. Quia obcaecati
                    alias a sunt, magnam sint voluptate sequi
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Provident expedita et laudantium excepturi. Quia obcaecati
                    alias a sunt, magnam sint voluptate sequi
                  </p>
                  <ol>
                    <li>
                      <Link to="#">Learn More</Link>
                    </li>
                    <li>
                      <span className="flaticon-play-button" />
                      <Link to="#">Watch Video</Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* --------------------------------------------------------------------------- */}
        <section className="bg-03">
          <div className="shape-05" />
          <div className="shape-06" />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="heading">
                  <span>Work</span>
                  <h2>How It Works</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Asperiores officiis explicabo blanditiis consequuntur fugit
                    fugiat, incidunt totam consectetur veritatis minus corporis
                    doloribus, qui maxime velit nesciunt, officia praesentium
                    odit facilis.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="wrapper">
                  <div className="content">
                    <div className="icons">
                      <span className="flaticon-fish" />
                    </div>
                    <h3>Pick Meals</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Asperiores officiis explicabo blanditiis consequuntur
                      fugit
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="wrapper">
                  <div className="content">
                    <div className="icons">
                      <span className="flaticon-touch" />
                    </div>
                    <h3>choose How Often</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Asperiores officiis explicabo blanditiis consequuntur
                      fugit
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="wrapper">
                  <div className="content">
                    <div className="icons">
                      <span className="flaticon-catering" />
                    </div>
                    <h3>Fast Deliveries</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Asperiores officiis explicabo blanditiis consequuntur
                      fugit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* --------------------------------------------------------------------------- */}
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
                    doloribus, qui maxime velit nesciunt, officia praesentium
                    odit facilis.
                  </p>
                </div>
              </div>
              <div className="col-12">
                <section className="bg-04" id="our-menu">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div className="heading">
                          <span>Menu</span>
                          <h2>Explore Our Best Menu</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Asperiores officiis explicabo blanditiis
                            consequuntur fugit fugiat, incidunt totam
                            consectetur veritatis minus corporis doloribus, qui
                            maxime velit nesciunt, officia praesentium odit
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
                              } col-lg-${isOpen ? 1 : 2} col-xl-${
                                isOpen ? 1 : 2
                              }`}
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
                                    border: isOpen
                                      ? ""
                                      : "1px solid  lightgrey",
                                    padding: "10px",
                                  }}
                                >
                                  <label className="fw-bold fs-4">Filter</label>
                                  <div
                                    style={{ display: isOpen ? "none" : "" }}
                                  >
                                    {categories.map((c) => (
                                      <div
                                        className="form-check mx-3"
                                        key={c._id}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          defaultValue
                                          id="flexCheckChecked"
                                          value={checked}
                                          onChange={(e) =>
                                            handlefilterProduct(
                                              e.target.checked,
                                              c._id
                                            )
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
                              } col-lg-${isOpen ? 11 : 10} col-xl-${
                                isOpen ? 11 : 10
                              }`}
                            >
                              <div className="text-center fs-3 fw-bold">
                                Products
                              </div>

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
                                            </h3>
                                            <div className="d- flex justify-content-end">
                                              <b>Rs: {product.productPrice}</b>
                                            </div>
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
                                                setSize(
                                                  e.target.value,
                                                  product._id
                                                )
                                              }
                                            >
                                              <option value={""}></option>
                                              <option value={"Small"}>
                                                Small
                                              </option>
                                              <option value={"Medium"}>
                                                Medium
                                              </option>
                                              <option value={"Large"}>
                                                Large
                                              </option>
                                              <option value={"X-Large"}>
                                                X-Large
                                              </option>
                                            </select>
                                          </div>

                                          <>
                                            <div className="my-2 d-flex justify-content-center align-items-center">
                                              <label className="mx-2">
                                                Quantity
                                              </label>
                                              <button
                                                className="btn btn-warning"
                                                onClick={() =>
                                                  decrement(product._id)
                                                }
                                              >
                                                -
                                              </button>

                                              <div className="btn btn-warning mx-2">
                                                {quantities[product._id] || 0}
                                              </div>
                                              <button
                                                className="btn btn-warning"
                                                onClick={() =>
                                                  increment(product._id)
                                                }
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
                                              <a
                                                onClick={() =>
                                                  addToCart(product)
                                                }
                                              >
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
              </div>
            </div>
          </div>
        </section>
        {/* --------------------------------------------------------------------------- */}
        <section className="bg-05">
          <div className="shape-03" />
          <div className="shape-04" />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="heading">
                  <span>Team</span>
                  <h2>Explore Our Team</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Asperiores officiis explicabo blanditiis consequuntur fugit
                    fugiat, incidunt totam consectetur veritatis minus corporis
                    doloribus, qui maxime velit nesciunt, officia praesentium
                    odit facilis.
                  </p>
                </div>
              </div>
              <div className="main-team-card d-flex">
                <div className="team-setup">
                  <div className="team-items">
                    <div className="team-user">
                      <img src="assets/images/team/1.jpg" alt="..." />
                    </div>
                    <div className="team-user-social">
                      <ol>
                        <li>
                          <i className="flaticon-facebook" />
                        </li>
                        <li>
                          <i className="flaticon-twitter" />
                        </li>
                        <li>
                          <i className="flaticon-behance" />
                        </li>
                        <li>
                          <i className="flaticon-youtube" />
                        </li>
                      </ol>
                    </div>
                    <div className="team-name">
                      <h2>Mark Anthony</h2>
                      <b>Founder &amp; CEO</b>
                    </div>
                  </div>
                </div>
                <div className="team-setup">
                  <div className="team-items">
                    <div className="team-user">
                      <img src="assets/images/team/2.jpg" alt="..." />
                    </div>
                    <div className="team-user-social">
                      <ol>
                        <li>
                          <i className="flaticon-facebook" />
                        </li>
                        <li>
                          <i className="flaticon-twitter" />
                        </li>
                        <li>
                          <i className="flaticon-behance" />
                        </li>
                        <li>
                          <i className="flaticon-youtube" />
                        </li>
                      </ol>
                    </div>
                    <div className="team-name">
                      <h2>Jessica Lee</h2>
                      <b>Chinese Kitchen Lead</b>
                    </div>
                  </div>
                </div>
                <div className="team-setup">
                  <div className="team-items">
                    <div className="team-user">
                      <img src="assets/images/team/3.jpg" alt="..." />
                    </div>
                    <div className="team-user-social">
                      <ol>
                        <li>
                          <i className="flaticon-facebook" />
                        </li>
                        <li>
                          <i className="flaticon-twitter" />
                        </li>
                        <li>
                          <i className="flaticon-behance" />
                        </li>
                        <li>
                          <i className="flaticon-youtube" />
                        </li>
                      </ol>
                    </div>
                    <div className="team-name">
                      <h2>John Bennett</h2>
                      <b>French Kitchen Lead</b>
                    </div>
                  </div>
                </div>
                <div className="team-setup">
                  <div className="team-items">
                    <div className="team-user">
                      <img src="assets/images/team/4.jpg" alt="..." />
                    </div>
                    <div className="team-user-social">
                      <ol>
                        <li>
                          <i className="flaticon-facebook" />
                        </li>
                        <li>
                          <i className="flaticon-twitter" />
                        </li>
                        <li>
                          <i className="flaticon-behance" />
                        </li>
                        <li>
                          <i className="flaticon-youtube" />
                        </li>
                      </ol>
                    </div>
                    <div className="team-name">
                      <h2>ANDERSON JHON</h2>
                      <b>Sous Chef</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* -------------------------------------------------------------------- */}
        <section className="bg-06" id="blog">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="heading">
                  <span>Blog</span>
                  <h2>Explore Our News</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Asperiores officiis explicabo blanditiis consequuntur fugit
                    fugiat, incidunt totam consectetur veritatis minus corporis
                    doloribus, qui maxime velit nesciunt, officia praesentium
                    odit facilis.
                  </p>
                </div>
              </div>
              <div className="blog-main-card d-flex">
                <article className="blog-sub">
                  <div className="blog-content">
                    <img src="assets/images/blog/1.jpg" alt="..."/>
                  </div>
                  <div className="blog-content-section">
                    <div className="blo-content-title">
                      <h4>Possession so comparison inquietude he conviction</h4>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Neque at numquam, asperiores aut praesentium
                        facilis ratione! Voluptatibus neque dignissimos ipsa
                        atque veniam sint omnis in blanditiis, nemo fugit animi
                        assumenda.
                      </p>
                    </div>
                    <div className="blog-admin">
                      <ol>
                        <li>
                          <i className="fal fa-user-tie" /> By Admin
                        </li>
                        <li>
                          <i className="fal fa-calendar-alt" /> july 28, 2020
                        </li>
                      </ol>
                    </div>
                  </div>
                </article>
                <article className="blog-sub">
                  <div className="blog-content">
                    <img src="assets/images/blog/2.jpg" alt="..." />
                  </div>
                  <div className="blog-content-section">
                    <div className="blo-content-title">
                      <h4>Possession so comparison inquietude he conviction</h4>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Neque at numquam, asperiores aut praesentium
                        facilis ratione! Voluptatibus neque dignissimos ipsa
                        atque veniam sint omnis in blanditiis, nemo fugit animi
                        assumenda.
                      </p>
                    </div>
                    <div className="blog-admin">
                      <ol>
                        <li>
                          <i className="fal fa-user-tie" /> By Admin
                        </li>
                        <li>
                          <i className="fal fa-calendar-alt" /> july 28, 2020
                        </li>
                      </ol>
                    </div>
                  </div>
                </article>
                <article className="blog-sub">
                  <div className="blog-content">
                    <img src="assets/images/blog/3.jpg" alt="..." />
                  </div>
                  <div className="blog-content-section">
                    <div className="blo-content-title">
                      <h4>Possession so comparison inquietude he conviction</h4>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Neque at numquam, asperiores aut praesentium
                        facilis ratione! Voluptatibus neque dignissimos ipsa
                        atque veniam sint omnis in blanditiis, nemo fugit animi
                        assumenda.
                      </p>
                    </div>
                    <div className="blog-admin">
                      <ol>
                        <li>
                          <i className="fal fa-user-tie" /> By Admin
                        </li>
                        <li>
                          <i className="fal fa-calendar-alt" /> july 28, 2020
                        </li>
                      </ol>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        {/* ------------------------------------------------------------------ */}
        <section id="contact" className="contact-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="heading">
                  <h2>get in touch</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Asperiores officiis explicabo blanditiis consequuntur fugit
                    fugiat, incidunt totam consectetur veritatis minus corporis
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        {...register("name", { required: true })}
                        placeholder="Enter Your Name"
                        required="name"
                        type="text"
                      />
                      <div>
                        {errors.email && (
                          <MenuItem sx={{ color: "red" }}>
                            Full Name is required
                          </MenuItem>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        {...register("email", { required: true })}
                        placeholder="Enter Your Email"
                        required="email"
                        type="text"
                      />
                      <div>
                        {errors.email && (
                          <MenuItem sx={{ color: "red" }}>
                            Email is required
                          </MenuItem>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        {...register("phoneNo", { required: true })}
                        placeholder="Enter Your Mobilenumber"
                        type="number"
                      />
                      <div>
                        {errors.email && (
                          <MenuItem sx={{ color: "red" }}>
                            Mobile Number is required
                          </MenuItem>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        name
                        id
                        cols={30}
                        rows={8}
                        type="text"
                        {...register("message", { required: true })}
                        placeholder="Enter Your Message"
                        defaultValue={""}
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-warning w-100" type="submit">
                        send message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="wrapper">
                  <div className="map">
                    <iframe
                      style={{ width: "100%" }}
                      title="sd-kitchen"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249759.19784092825!2d79.10145254589841!3d12.009924873581818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1448883859107"
                      height={480}
                      frameBorder={0}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
