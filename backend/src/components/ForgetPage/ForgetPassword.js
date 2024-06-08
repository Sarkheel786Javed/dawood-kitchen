import React from "react";
import { Box, Paper, Button, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from '../navbar/Navbar'
import Footer from "../footer/Footer";

function Login() {
  const location = useLocation;
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
      const res = await axios.post(`${baseurl}/auth/forgot-password`, data);
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
        title: "Father Name is not matched" ,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <>
    {/* <Navbar/> */}
    <div className="d-flex justify-content-center align-items-center bg-warning">
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

          <div className="">
            <label className="form-label">Enter Your Father name</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom03"
              {...register("answer", { required: true })}
              placeholder="Father name "
            />
            <div>
              {errors.answer && (
                <MenuItem sx={{ color: "red" }}>Answer is Required</MenuItem>
              )}
            </div>
          </div>

          <div className="">
            <label className="form-label">New Password</label>
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
                  padding: "0px",
                  width: "20px",
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

          <div
            className="d-flex justify-content-center   my-4 "
            style={{ backgroundColor: "white" }}
          >
            <button  className="w-100 btn btn-warning" type="submit">
              Submit
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

export default Login;
