import React, { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../context-for-API/apicontext";
import "./admindasboard.css";
import AdminSidebar from "../../../../sidebarAdmin/AdminSidebar";
import Navbar from "../../../../navbar/Navbar";
import axios from "axios";
const AdminDashboard = () => {
  const baseurl = process.env.REACT_APP_API_URL
  const {
     earning, orders, saleItems,
    isOpen,
  } = useContext(ApiContext);
  // const formattedDates = updatedAt.map((dateString) => new Date(dateString));

  const [getAllOrder, setGetAllOrder] = useState([]);
  // var auth = JSON.parse(localStorage.getItem("auth"));
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/checkout/get-order`);
      setGetAllOrder(data.order);
      console.log(data.order.items);
    } catch (error) {
      console.log(error);
      window.alert("Failed to Get All Orders");
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const [Status, setStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const handleUpdateStatus = async () => {
    try { 
      const statusUpdate = { Status, orderId };

      const res = await axios.post(
        `${baseurl}/auth/checkout/update-status`,
        statusUpdate
      );
      console.log(res);
      getAllOrders()
      getAllUser()
      window.alert("Update Status successfully");
    } catch (error) {
      console.log(error);
      window.alert("Failed to Update Status");
    }
  };
  ///
  const [AllUser, setAllUser] = useState([]);

  const getAllUser = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/get-all-user`);
      setAllUser(data.user);
    } catch (error) {
      console.log(error);
      window.alert("Failed to Get All User");
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-5 py-2">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex">
            <AdminSidebar />
            <div
              className={`w-100 mt-2 ${
                isOpen ? "content_isopen" : "content_close"
              }`}
            >
              <div className="container-fluid mt-3">
                <div className="row ">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="m-3 counts">
                      <div className="">
                        In Progress <br />
                        <label className="text-center w-100">{saleItems}</label> 

                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="m-3 counts">
                      <div className="">
                        Sold Items <br />
                        <label className="text-center w-100">{saleItems}</label> 

                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="m-3 counts">
                      <div className="">
                        Received Order <br />
                        <label className="text-center w-100">{orders}</label> 
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="m-3 counts">
                      <div className="">
                        Total earning <br />
                        <label className="text-center w-100">{earning}</label> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid"></div>
              <div className="container-fluid">
                <div className="row">
                  {/*//////////////////order status\\\\\\\\\\\\\*/}
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 ">
                    {/* order tables  getAllOrder */}
                    <div className="table-responsive data_map">
                      <table className="table table-hover border">
                        <thead>
                          <tr>
                            <th scope="col" className="w-200px">
                              Products & Quantity
                            </th>
                            <th scope="col" className="w-200px">
                              Email
                            </th>
                            <th scope="col" className="w-200px">
                              Order Status
                            </th>
                            <th scope="col" className="w-200px">
                              Total Price
                            </th>
                          </tr>
                        </thead>
                        {getAllOrder.map((order) => (
                          <>
                            <tbody>
                              <tr key={order.userId}>
                                <th scope="row">
                                  <select className="form-select">
                                    {order?.items.map((item) => (
                                      <option key={item.productId}>
                                        {item.productName}
                                        <label className="mx-2">
                                          {item.quantity}
                                        </label>
                                      </option>
                                    ))}
                                  </select>
                                </th>
                                <td>{order.email}</td>
                                <td>
                                  {/* Button trigger modal */}
                                  <div className="">
                                    <div className="mb-2 fw-bold text-center">
                                      {order.Status}
                                    </div>
                                    <button
                                      className="btn btn-warning"
                                      onClick={() => {
                                        setOrderId(order._id);
                                      }}
                                      type="button"
                                      data-bs-toggle="collapse"
                                      aria-expanded="false"
                                      data-bs-target={`#collapseExample${order._id}`}
                                      aria-controls={`collapseExample${order._id}`}
                                    >
                                      Update Status
                                    </button>
                                    <p />
                                  </div>
                                </td>

                                <td>$ {order.subTotalprice}</td>
                              </tr>
                              <tr>
                                <th colSpan={4}>
                                  <div
                                    className="collapse w-100"
                                    id={`collapseExample${order._id}`}
                                  >
                                    <table class="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">Name(s)</th>
                                          <th scope="col">Email</th>
                                          <th scope="col">T.Price</th>
                                          <th scope="col">Update Status</th>
                                          <th scope="col">submit</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th scope="row">
                                            {" "}
                                            {order?.items.map((item) => (
                                              <span
                                                key={item.productId}
                                                className="d-block"
                                              >
                                                {item.productName}
                                              </span>
                                            ))}
                                          </th>

                                          <td>{order.email}</td>
                                          <td>Rs: {order.subTotalprice}</td>

                                          <td>
                                            <select
                                              className="form-select"
                                              value={Status}
                                              onChange={(e) =>
                                                setStatus(e.target.value)
                                              }
                                            >
                                              <option>{order.Status}</option>
                                              <option value="Prepare for delivered">
                                                Prepare for delivered
                                              </option>
                                              <option value="Out For Delivery">
                                                Out For Delivery
                                              </option>
                                              <option value="Order Placed">
                                                Order Placed
                                              </option>
                                              <option value="Delivered">
                                                Delivered
                                              </option>
                                            </select>
                                          </td>
                                          <td>
                                            <button
                                              onClick={handleUpdateStatus}
                                              className="btn btn-warning UpdateStatus"
                                            >
                                              Update
                                            </button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </th>
                              </tr>
                            </tbody>
                          </>
                        ))}
                      </table>
                    </div>
                  </div>
                  {/*//////////////////end order status\\\\\\\\\\\\\*/}
                  {/*//////////////////****************\\\\\\\\\\\\\*/}
                  {/*//////////////////  user  \\\\\\\\\\\\\*/}

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 px-2 ">
                    <div className="table-responsive data_map ">
                      <table className="table table-light table-hover ">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Phone no</th>
                            <th scope="col">Recovery</th>
                            <th scope="col">Email</th>
                          </tr>
                        </thead>
                        {AllUser.map((user) => (
                          <tbody key={user._id}>
                            <tr>
                              <td>{user.fullName}</td>
                              <td>{user.phoneNo}</td>
                              <td>{user.answer}</td>
                              <td>{user.email}</td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                  {/*////////////////// end user \\\\\\\\\\\\\*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
