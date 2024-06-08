import React from "react";
import './login.css'
import { Button, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
// import Navbar from '../navbar/Navbar'
import Footer from "../footer/Footer";
function Signup() {
  const baseurl = process.env.REACT_APP_API_URL
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //---------------validations---------------\\
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //---------------validations---------------\\
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${baseurl}/auth/register`, data);

      if (res.data.success) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/login");
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: " Register User Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
    {/* <Navbar/> */}
    <div className="d-flex justify-content-center align-items-center auth_background">
      <div
        style={{
          padding: "20px",
          margin: "50px",
          borderRadius: "10px",
          backgroundColor:"white",
          width:"50%"
        }}
      >
        <form
          className="needs-validation d-block"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-100">
            <Link to="/login" style={{ width: "50%" }}>
            <button
                 className="btn  border"
                  style={{ width: "50%", borderRadius: "0px" }}
                >
                  Login
                </button>
            </Link>
            <Link to="/signup" style={{ width: "50%" }}>
            <button
                 className="btn btn-warning border"
                  style={{ width: "50%", borderRadius: "0px" }}
                >
                  Sign up
                </button>
            </Link>
          </div>
          <div className="">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              {...register("fullName", { required: true })}
              placeholder="FullName"
            />
            <div>
              {errors.email && (
                <MenuItem sx={{ color: "red" }}>
                  
                  Full Name is required
                </MenuItem>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              {...register("email", { required: true })}
            />
            <div>
              {errors.email && (
                <MenuItem sx={{ color: "red" }}>
                  Enter Valid Email is required
                </MenuItem>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom02"
              {...register("phoneNo", { required: true })}
              placeholder="  Phone Number"
            />
            <div>
              {errors.phoneNo && (
                <MenuItem sx={{ color: "red" }}>Phone No is Required</MenuItem>
              )}
            </div>
          </div>

          <div className="">
            <label className="form-label">Enter Father name</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom03"
              {...register("answer", { required: true })}
              placeholder="father name "
            />
            <div>
              {errors.answer && (
                <MenuItem sx={{ color: "red" }}>Father Name is Required</MenuItem>
              )}
            </div>
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
                {...register("password", { required: true })}
                placeholder="Password***********"
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
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            </div>
            <div>
              {errors.password && (
                <MenuItem sx={{ color: "red" }}>Password is Required</MenuItem>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-center  my-4 ">
            <button className="btn btn-warning w-100" type="submit">
              Sign up
            </button>
          </div>
          <Link to="/login" className="text-decoration-none">
            i already have an account
          </Link>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Signup;
