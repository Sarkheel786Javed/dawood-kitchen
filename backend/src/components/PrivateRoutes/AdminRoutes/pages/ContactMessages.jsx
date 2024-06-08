import { useContext, useEffect, useState } from "react";
import Navbar from "../../../navbar/Navbar";
import AdminSidebar from "../../../sidebarAdmin/AdminSidebar";
import { ApiContext } from "../context-for-API/apicontext";
import axios from "axios";
import moment from 'moment'
const ContactMessages = () => {
  const baseurl = process.env.REACT_APP_API_URL
  const { isOpen } = useContext(ApiContext);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.user._id;
  const [messages, setMessages] = useState([]);
  const getuser = async () => {
    try {
      if (auth) {
        if (auth?.user?.role === 1) {
          const { data } = await axios.get(
            `${baseurl}/auth/message/all-messages/${userId}`
          );
          setMessages(data?.message);
        }
      }
    } catch (error) {
      console.log(error);
      window.alert("Failed to get Contact messages");
    }
  };
  useEffect(() => {
    getuser();
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
              <div className="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone no</th>
                      <th scope="col"> Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((data) => (
                     <>
                      <tr key={data?._id}>
                        <th scope="row">{data?.name}</th>
                        <td scope="row">{data?.email}</td>
                        <td scope="row">{data?.phoneNo}</td>
                        <td scope="row">
                          <div>
                            <button
                              className="btn btn-warning w-100"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseExample${data._id}`}
                              aria-expanded="false"
                              aria-controls={`collapseExample${data._id}`}
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                      <td colSpan={4}>
                        <div className="collapse" id={`collapseExample${data._id}`}>
                          <div className="card card-body">
                            <div className="container-fluid">
                                <div className="row">
                                <div className="col-xm-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-3">
                                    <div className="d-flex justify-content-end align-items-center">
                                        <label></label>: <label>{moment(data.createdAt).format('MMM Do YYYY, h:mm a')}</label>
                                    </div>
                                        <label>Date</label>: <label>{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</label>
                                    </div>
                                    <div className="col-xm-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3">
                                        <label>Name</label>: <label>{data.name}</label>
                                    </div>
                                    <div className="col-xm-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3">
                                        <label>Email</label>: <label>{data.email}</label>
                                    </div>
                                    <div className="col-xm-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3">
                                        <label>Phone no</label>: <label>{data.email}</label>
                                    </div>
                                   
                                    <div className="col-xm-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-3">
                                        <label>Message</label>: <label>{data.message}</label>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                     </>
                    ))}

                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;
