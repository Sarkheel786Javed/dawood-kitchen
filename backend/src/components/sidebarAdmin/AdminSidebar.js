import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { ApiContext } from "../PrivateRoutes/AdminRoutes/context-for-API/apicontext";
import { DashboardOutlined } from "@mui/icons-material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import ContactMailIcon from '@mui/icons-material/ContactMail';
const AdminSidebar = () => {
  const { isOpen, handleSidebar } = useContext(ApiContext);
  const location = useLocation();
  const pathName = location.pathname;
  const routes = [
    {
      path: "/private/auth/admin-dashboard",
      name: "Dashboard",
      icon: <AddHomeWorkOutlinedIcon />,
    },
    {
      path: "/private/auth/manage-category",
      name: "Manage Category",
      icon: <CategoryOutlinedIcon />,
    },
    {
      path: "/private/auth/manage-product",
      name: "Manage Product",
      icon: <Inventory2OutlinedIcon />,
    },
    {
      path: "/private/auth/receive-orders",
      name: "Orders",
      icon: <RingVolumeIcon />,
    },
    {
      path: "/private/auth/contact-messages",
      name: "Messages",
      icon: <ContactMailIcon />,
    },
  ];
  return (
    <div>
      <div
        className={`sidebar ${isOpen ? "sidebar_isopen" : "sidebar_isclose"}`}
      >
        <div className="d-flex logo_toggle  fs-5">
          <div
            className={`${
              isOpen ? "d-flex justify-content-center" : "d-none "
            }`}
          >
            {/* <label className="text-dark fw-bold">SD</label>
            <label className="logo_name fw-bold">-Kitchen</label> */}
          </div>
          <div className="px-2">
            <div className=" ">
              <DashboardOutlined
                className="logo_name"
                onClick={handleSidebar}
              />
            </div>
          </div>
        </div>
        <div className="w-100">
          {routes.map((page) => (
            <div className="">
              <Link
                to={page.path}
                key={page.name}
                className={`w-100 px-2 my-2 fw-bold ${
                  page.path === pathName ? "isactive " : "isnotactive"
                }`}
              >
                <span className="">
                  {page.icon}
                  <span className="mx-3">{isOpen ? page.name : ""}</span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
