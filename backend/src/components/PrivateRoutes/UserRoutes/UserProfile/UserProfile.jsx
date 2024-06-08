import React, { useEffect, useState } from "react";
import "./userProfile.css";
import { Button } from "@mui/material";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Navbar from "../../../navbar/Navbar";
import { Link } from "react-router-dom";
const UserDashboard = () => {
  const baseurl = process.env.REACT_APP_API_URL

  const auth = JSON.parse(localStorage.getItem("auth"));

  const [fullName, setFullName] = useState("");
  const [answer, setAnswer] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //get single product
  const [id, setId] = useState("");
  const userId = auth.user._id;
  const image = auth.user.authimage;
  // /get-user/:userId
  const getuser = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/get-user/${userId}`);
      console.log(data);
      setId(data.user._id);
      setFullName(data.user.fullName);
      setAnswer(data.user.answer);
      setPhoneNo(data.user.phoneNo);
      setEmail(data.user.email);
      // setPassword(data.user.password);
      setRole(data.user.role);
    } catch (error) {
      console.log(error);
      window.alert("Failed to get profile data  ");
    }
  };
  useEffect(() => {
    getuser();
  }, []);

  ////////////----------update  user profile---------------\\\\\\\\\\\\\
  const [authImage, setAuthImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // Function to handle image file change
  const handleImageChange = (e) => {
    setAuthImage(e.target.files[0]);
  };
  ////////////////////// for file reader \\\\\\\\\\\\\\\\\\\\\\\\\\\\
  //////////////////////// for file reader \\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const reader = new FileReader();
  reader.onloadend = () => {
    setPreviewImage(reader.result);
  };
  if (authImage) {
    reader.readAsDataURL(authImage);
  }
  //////////////////////////get order by user id///////////////////////////////////
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `${baseurl}/auth/checkout/get-order/${userId}`
      );
      if (data.order) {
        setOrder(data?.order);
        setStatus(data?.order.status);
      }
    } catch (error) {
      console.log(error);
      window.alert("Failed to Get order by  User");
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  /////////////////////////////////////////////////////////////
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("fullName", fullName);
      userData.append("phoneNo", phoneNo);
      userData.append("email", email);
      userData.append("password", password);
      userData.append("role", role);
      userData.append("authImage", authImage); // Append the image file

      const { data } = await axios.post(`${baseurl}/auth/profile/${id}`, userData);

      if (data.success) {
        window.alert(data.message);
      } else {
        window.alert("User Updated Successfully");
      }
      getOrder()
      getuser()
    } catch (error) {
      console.log(error);
      window.alert("Failed to Update user");
    }
  };
  const delivered = order.filter((data) => data.Status === "Delivered");
  const totalSpend = order
    // .filter((data) => data.Status === "Delivered")
    .reduce((total, filteredData) => total + filteredData.subTotalprice, 0)

  return (
    <div className="">
      <Navbar />
      <div className=" container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-2 auth_Profile_background auth_Profile_height pt-5 border-end border-light">
            <div className=" fixed ">
              <div className="w-100 mt-5 ">
                <div className="img_cover">
                  <div className="img_coverinner">
                    {previewImage ? (
                      <img src={previewImage} width="200px" height="200px" />
                    ) : (
                      <>
                        <img
                          src={`${baseurl}/auth/get-photo/${auth.user._id}`}
                          alt="..."
                          width="100%"
                          height="100%"
                        />
                      </>
                    )}
                  </div>
                  <div
                    className="edit_camera_img bg-light"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <img
                      src="/assets/images/pngegg.png"
                      alt="..."                      
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
                <ul className="ul_profile mt-3">
                  <li>
                    <div className="d-flex">
                      <label className="fw-bolder">Name:</label>
                      {auth.user.fullName}
                    </div>
                    <svg
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label className="fw-bolder">FatherName:</label>
                      {auth.user.answer}
                    </div>
                    <svg
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label className="fw-bolder">Email:</label>
                      {auth.user.email}
                    </div>
                    <svg
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label className="fw-bolder">Phone no:</label>
                      {auth.user.phoneNo}
                    </div>
                    <svg
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </li>
                </ul>
              </div>
              <div>

              </div>
            </div>
          </div>
          {/* Modal */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Update Profile
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit} className="mt-5">
                    <div className="mt-3 d-flex justify-content-center align-items-center">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="..."
                          width="200px"
                          height="200px"
                        />
                      ) : (
                        <>
                          <img
                            src={`${baseurl}/auth/get-photo/${auth.user._id}`}
                            alt="..."
                            width="200px"
                            height="200px"
                          />
                        </>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Profile Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="FullName"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        placeholder="  Phone Number"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Enter Father name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom03"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="father name "
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Enter Father name
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="validationCustom03"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="father name "
                      />
                    </div>
                    <div className="">
                      <label className="form-label">password</label>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{ width: "100%" }}
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="validationCustom04"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password***********"
                          maxLength={6}
                          minLength={6}
                        />
                        <Button
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "-65px",
                          }}
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center  my-4 ">
                      <button
                        className="btn btn-warning w-100"
                        type="submit"
                      >
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 col-xxl-9 mt-5">
            <div className="container-fluid mt-5 pt-5 scroll">
              <div className="row ">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                  <div className="m-3 counts">
                    <div className="">
                      In progress order <br /> {order.length}
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                  <div className="m-3 counts">
                    <div className="">
                      Received Order <br /> {delivered.length}
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                  <div className="m-3 counts">
                    <div className="">Total Spend <br /> {totalSpend}</div>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  {order.length > 0 ? (
                    <>
                      <h1 className="text-warning text-center mt-3">
                        Order Status
                      </h1>
                      {order
                        .filter((data) => data.Status !== "Delivered")
                        .map((data) => (
                          <div className="row border my-3" key={data._id}>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 flex ">
                                    <div className="w-100">
                                      <div className="text-secondary text-center">
                                        Order Received
                                      </div>
                                      <div className="flex">
                                        <div
                                          className={`status  my-2 text-center 
                                    ${(data.Status === "Order Received" &&
                                              "step") ||
                                            (data.Status ===
                                              "Prepare for delivered" &&
                                              "step") ||
                                            (data.Status === "Out For Delivery" &&
                                              "step") ||
                                            (data.Status === "Order Placed" &&
                                              "step") ||
                                            (data.Status === "Delivered" && "step")
                                            } 
                                  `}
                                        ></div>
                                        <div
                                          className={`status_success  my-2 text-center 
                                ${(data.Status === "Order Received" &&
                                              "step_success") ||
                                            (data.Status === "Prepare for delivered" &&
                                              "step_success") ||
                                            (data.Status === "Out For Delivery" &&
                                              "step_success") ||
                                            (data.Status === "Order Placed" &&
                                              "step_success") ||
                                            (data.Status === "Delivered" &&
                                              "step_success")
                                            } 
                              `}
                                        >
                                          <div
                                            className={`flex
                                ${(data.Status === "Order Received"
                                                ? "text-light"
                                                : "text-light") ||
                                              (data.Status === "Prepare for delivered"
                                                ? "text-light"
                                                : "text-light") ||
                                              (data.Status === "Out For Delivery"
                                                ? "text-light"
                                                : "text-light") ||
                                              (data.Status === "Order Placed"
                                                ? "text-light"
                                                : "text-light") ||
                                              (data.Status === "Delivered"
                                                ? "text-light"
                                                : "text-light")
                                              } 
                              `}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width={30}
                                              height={30}
                                              fill="currentColor"
                                              className="bi bi-check-circle"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 flex ">
                                    <div className="w-100">
                                      <div className="text-secondary text-center">
                                        Prepare for delivered
                                      </div>
                                      <div className="flex">
                                        <div
                                          className={`status  my-2 text-center 
                                    ${(data.Status ===
                                              "Prepare for delivered" &&
                                              "step") ||
                                            (data.Status === "Out For Delivery" &&
                                              "step") ||
                                            (data.Status === "Order Placed" &&
                                              "step") ||
                                            (data.Status === "Delivered" && "step")
                                            } 
                                  `}
                                        ></div>
                                        <div
                                          className={`status_success  my-2 text-center 
                                ${(data.Status === "Prepare for delivered" &&
                                              "step_success") ||
                                            (data.Status === "Out For Delivery" &&
                                              "step_success") ||
                                            (data.Status === "Order Placed" &&
                                              "step_success") ||
                                            (data.Status === "Delivered" &&
                                              "step_success")
                                            } 
                              `}
                                        >
                                          <div
                                            className={`flex
                                ${(data.Status === "Order Received"
                                                ? "text-light"
                                                : "text-light") ||
                                              (data.Status === "Prepare for delivered"
                                                ? "text-light"
                                                : "text-light") ||
                                              (data.Status === "Out For Delivery"
                                                ? "text-light"
                                                : "text-light") ||
                                              (data.Status === "Order Placed"
                                                ? "text-light"
                                                : "text-light") ||
                                              (data.Status === "Delivered"
                                                ? "text-light"
                                                : "text-light")
                                              } 
                              `}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width={30}
                                              height={30}
                                              fill="currentColor"
                                              className="bi bi-check-circle"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 flex ">
                                    <div className="w-100">
                                      <div className="text-secondary text-center">
                                        Out For Delivery
                                      </div>
                                      <div className="flex">
                                        <div
                                          className={`status  my-2 text-center 
                                    ${(data.Status === "Out For Delivery" &&
                                              "step") ||
                                            (data.Status === "Order Placed" &&
                                              "step") ||
                                            (data.Status === "Delivered" && "step")
                                            } 
                                  `}
                                        ></div>
                                        <div
                                          className={`status_success  my-2 text-center 
                                ${(data.Status === "Out For Delivery" &&
                                              "step_success") ||
                                            (data.Status === "Order Placed" &&
                                              "step_success") ||
                                            (data.Status === "Delivered" &&
                                              "step_success")
                                            } 
                              `}
                                        >
                                          <div className="text-light">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width={30}
                                              height={30}
                                              fill="currentColor"
                                              className="bi bi-check-circle"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 flex ">
                                    <div className="w-100">
                                      <div className="text-secondary text-center">
                                        Order Placed
                                      </div>
                                      <div className="flex">
                                        <div
                                          className={`status  my-2 text-center 
                                    ${(data.Status === "Order Placed" &&
                                              "step") ||
                                            (data.Status === "Delivered" && "step")
                                            } 
                                  `}
                                        ></div>
                                        <div
                                          className={`status_success  my-2 text-center 
                                ${(data.Status === "Order Placed" &&
                                              "step_success") ||
                                            (data.Status === "Delivered" &&
                                              "step_success")
                                            } 
                              `}
                                        >
                                          <div className=" text-light">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width={30}
                                              height={30}
                                              fill="currentColor"
                                              className="bi bi-check-circle"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 flex ">
                                    <div className="w-100">
                                      <div className="text-secondary text-center">
                                        Delivered
                                      </div>
                                      <div className="flex">
                                        <div
                                          className={`status  my-2 text-center 
                                    ${data.Status === "Delivered" && "step"} 
                                  `}
                                        ></div>
                                        <div
                                          className={`status_success  my-2 text-center 
                                ${data.Status === "Delivered" && "step_success"
                                            } 
                              `}
                                        >
                                          <div className=" text-light">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width={30}
                                              height={30}
                                              fill="currentColor"
                                              className="bi bi-check-circle"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 flex">
                              <div className="">
                                {data.items.map((item) => (
                                  <div>
                                    <div className="">
                                      <label className="mx-2 text-dark fw-bold">
                                        Name:
                                      </label>
                                      {item.productName}
                                    </div>
                                    <div className="">
                                      <label className="mx-2 text-dark fw-bold">
                                        Quantity:
                                      </label>
                                      {item.quantity}
                                    </div>
                                  </div>
                                ))}
                                <div className="">
                                  <label className="mx-2 text-dark fw-bold">
                                    Total payment:
                                  </label>
                                  {data.subTotalprice}
                                </div>
                                <div className="">
                                  <label className="mx-2 text-dark fw-bold">
                                    Order Status:
                                  </label>
                                  {data.Status}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div className="nodata_found">
                      <Link to="/menu">
                        <h1 className="text-secondary">Place the order</h1>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default UserDashboard;
