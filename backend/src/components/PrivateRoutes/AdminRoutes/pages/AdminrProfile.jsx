import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Navbar from "../../../navbar/Navbar";
import AdminSidebar from "../../../sidebarAdmin/AdminSidebar";
import { ApiContext } from "../context-for-API/apicontext";
const AdminDashboard = () => {
  const baseurl = process.env.REACT_APP_API_URL
  const auth = JSON.parse(localStorage.getItem("auth"));
const {isOpen} = useContext(ApiContext)
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
  // /get-user/:userId
const GetUser = ()=>{
  if(auth ){
      
  }
  const getuser = async () => {
    try {
     if(auth){
      const { data } = await axios.get(`${baseurl}/auth/get-user/${userId}`);
      console.log(data);
      setId(data?.user?._id);
      setFullName(data?.user?.fullName);
      setAnswer(data?.user?.answer);
      setPhoneNo(data?.user?.phoneNo);
      setEmail(data?.user?.email);
      // setPassword(data?.user?.password);
      setRole(data?.user?.role);
     }
    } catch (error) {
      console.log(error);
      window.alert("Failed to get profile data  ");
    }
  };
}
  useEffect(() => {
    GetUser();
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
  /////////////////////////////////////////////////////////////

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
      GetUser()
    } catch (error) {
      console.log(error);
      window.alert("Failed to Update user");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-5 py-2">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex">
            <AdminSidebar />
            <div
              className={`w-100 mt-2 ${isOpen ? "content_isopen" : "content_close"
                }`}
            >
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
                                Email
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
                              In progress order <br />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">
                              Received Order <br />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">Total Spend <br /> </div>
                          </div>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">
                              In progress order <br />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">
                              Received Order <br />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">Total Spend <br /> </div>
                          </div>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">
                              In progress order <br />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">
                              Received Order <br />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">Total Spend <br /> </div>
                          </div>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">
                              In progress order <br />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">
                              Received Order <br />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                          <div className="m-3 counts">
                            <div className="">Total Spend <br /> </div>
                          </div>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
