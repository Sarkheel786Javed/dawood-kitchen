import React, { useEffect, useState } from "react";
import "./traceorder.css";
import Navbar from "../../../../navbar/Navbar";
import Footer from "../../../../footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const TaceOrder = () => {
  var auth = JSON.parse(localStorage.getItem("auth"));
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const userId = auth.user._id;

  const baseurl = process.env.REACT_APP_API_URL
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
  return (
    <div className="">
      <Navbar />
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-12">
            <div className="container">
              {order.length > 0 && order.Status != "Delivered" ? (
                <>
                  <h1 className="text-warning text-center mt-3">
                    Order Status
                  </h1>
                  {order.map((data) => (
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
                                    ${
                                      (data.Status === "Order Received" &&
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
                                ${
                                  (data.Status === "Order Received" &&
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
                                ${
                                  (data.Status === "Order Received"
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
                                    ${
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
                                ${
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
                                ${
                                  (data.Status === "Order Received"
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
                                    ${
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
                                ${
                                  (data.Status === "Out For Delivery" &&
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
                                    ${
                                      (data.Status === "Order Placed" &&
                                        "step") ||
                                      (data.Status === "Delivered" && "step")
                                    } 
                                  `}
                                  ></div>
                                  <div
                                    className={`status_success  my-2 text-center 
                                ${
                                  (data.Status === "Order Placed" &&
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
                                ${
                                  data.Status === "Delivered" && "step_success"
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
                        <table className="table table-responsive table-hover border rounded mt-3">
                          <thead>
                            <tr className="border-bottom">
                              <th>Name</th>
                              <th>Quantity</th>
                              <th>T.payment</th>
                              <th>O.Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {data.items.map((item) => (
                                  <span className="d-block">
                                    {item?.productName}
                                  </span>
                                ))}
                              </td>
                              <td>
                                {data.items.map((item) => (
                                  <span className="d-block">
                                    {item?.quantity}
                                  </span>
                                ))}
                              </td>

                              <td>{data.subTotalprice}</td>
                              <td><span className={`${data.Status === "Delivered" ? "text-success fw-bold" :"" }`}>{data.Status}</span></td>
                            </tr>
                          </tbody>
                        </table>
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
  );
};

export default TaceOrder;
