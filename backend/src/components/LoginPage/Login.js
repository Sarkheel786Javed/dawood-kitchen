import React from "react";
import { Button, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function Login() {
  const baseurl = process.env.REACT_APP_API_URL
  const location = useLocation;
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
      const res = await axios.post(`${baseurl}/auth/login`, data);
      if (res.data.success) {
        const Toast = Swal.mixin({
          icon: "success",
          title: res.data.message,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
        if (res.data.user.role !== 0) {
          navigate("/private/auth/admin-dashboard");
        } else {
          navigate(location.state || "/");
        }
      } else {
        Swal.fire({
          icon: "error",
          position: "top-end",
          title: res.data.message,
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: " User Login Failed",
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="auth_background d-flex justify-content-center align-items-center">
        <div
          style={{
            padding: "20px",
            margin: "50px",
            borderRadius: "10px",
            width: "50%",
            backgroundColor: "white",
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
                  className="btn btn-warning border"
                  style={{ width: "50%", borderRadius: "0px" }}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup" style={{ width: "50%" }}>
                <button
                  className="btn  border"
                  style={{ width: "50%", borderRadius: "0px" }}
                >
                  Sign up
                </button>
              </Link>
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
                    padding: "0px",
                    width: "20px",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              </div>
              <div>
                {errors.password && (
                  <MenuItem sx={{ color: "red" }}>
                    Password is Required
                  </MenuItem>
                )}
              </div>
            </div>

            <div
              className="d-flex justify-content-center   my-4 "
              style={{ backgroundColor: "white" }}
            >
              <button className="btn btn-warning w-100" type="submit">
                Login
              </button>
            </div>
            <Link to="/forget" className="text-decoration-none">
              Forget password
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
