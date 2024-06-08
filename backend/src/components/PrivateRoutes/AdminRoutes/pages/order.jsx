import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AdminSidebar from "../../../sidebarAdmin/AdminSidebar";
import Navbar from "../../../navbar/Navbar";
import { ApiContext } from "../context-for-API/apicontext";



const Orders = () => {
  const navigate = useNavigate();
  const { isOpen } =
    useContext(ApiContext);
  const [getAllOrder, setGetAllOrder] = useState([]);
  var auth = JSON.parse(localStorage.getItem("auth"));
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/auth/checkout/get-order`);
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

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/checkout/update-status`,
        statusUpdate
      );
      window.alert("Update Status successfully");
      getAllOrders()
    } catch (error) {
      console.log(error);
      window.alert("Failed to Update Status");
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
              <div className="container-fluid">
                <div className="row">
                  {/*//////////////////order status\\\\\\\\\\\\\*/}
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                    {/* order tables  getAllOrder */}
                    <div className="table-responsive ">
                      <table className="table table-light table-hover border">
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
                                        {item.productName}{" "}
                                        <label className="mx-2">
                                          {" "}
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

                                <td>Rs:{order.subTotalprice}</td>
                              </tr>
                              <tr>
                                <th colSpan={4} className="d-flex justify-content-center align-items-center">
                                  <div
                                    className="collapse w-100"
                                    id={`collapseExample${order._id}`}
                                  >
                                    <div className="w-100">
                                      <>
                                        {/* Modal  */}
                                        <div className="my-3 border d-flex justify-content-center align-items-center">
                                          <div className="w-100">
                                            {order?.items.map((item) => (
                                              <div key={item.productId}>
                                                {item.productName}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <div className="my-3 d-flex justify-content-center align-items-center">
                                          {order.email}
                                        </div>
                                        <div className="my-3 d-flex justify-content-center align-items-center">
                                          $ {order.subTotalprice}
                                        </div>
                                        <div className="my-3 d-flex justify-content-center align-items-center">
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
                                        </div>
                                        <div className="my-3 d-flex justify-content-center align-items-center">
                                          <button
                                            type="button"
                                            onClick={handleUpdateStatus}
                                            className="btn btn-warning UpdateStatus"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                          >
                                            Update Status
                                          </button>
                                        </div>
                                      </>
                                    </div>
                                  </div>
                                </th>
                              </tr>
                            </tbody>

                          </>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Orders