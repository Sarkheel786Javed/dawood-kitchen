import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";
import { MenuItem } from "@mui/material";

const ContactUs = () => {
  const baseurl = process.env.REACT_APP_API_URL
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
      const res = await axios.post(`${baseurl}/auth/message/get-in-touch`, data);
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
  return (
    <div>
      <Navbar />
      <main>
        <section className="abt-box">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="wrapper">
                  <h2>Contact Us</h2>
                  <ol>
                    <li>
                      Home
                      <i className="flaticon-right-arrow" />
                    </li>
                    <li>Contact Us</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ------------------------------------------------------------------ */}
        <section className="contact-wrapper">
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
                      title="Contact us"
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
      <Footer />
    </div>
  );
};

export default ContactUs;
