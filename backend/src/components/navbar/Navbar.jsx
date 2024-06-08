import React, { useState, useEffect } from "react";
import "./nav.css";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const Navbar = () => {
  const baseurl = process.env.REACT_APP_API_URL
  const location = useLocation();
  const active = location.pathname;
  const navigate = useNavigate();
  var auth = JSON.parse(localStorage.getItem("auth"));
  const img = `${baseurl}/auth/get-photo/${auth?.user?._id}`
  const userId = auth?.user?._id;
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const [count, setCount] = useState("0");
  const getAllCartItem = async () => {
    if (auth) {
      try {
        const { data } = await axios.get(`${baseurl}/auth/cart/get-cart/${userId}`);
        if (auth?.user?.role !== 1) {
          setCount(data?.cart?.length);
        }
      } catch (error) {
        console.log(error);
        window.alert("Failed to Get All Product");
      }
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    getAllCartItem();
  }, [userId, auth, navigate]);

  const cartCounter = count;
  return (
    <div>
      <nav className="navbar navbar-expand-md border-none">
        <div className="container-fluid navbar_background">
          <Link
            className={`navbar-brand px-2 ${active === "/" && "active_link"}`}
            to="/"
          >
            <label className="text-dark fw-bold">SD</label>
            <label className="text-warning fw-bold">-Kitchen</label>
          </Link>

          <div className="mx-2 d-flex ">
            <button
              className="navbar-toggler border-dark "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                fill="currentColor"
                className="bi bi-menu-button-wide-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h13A1.5 1.5 0 0 0 16 3.5v-2A1.5 1.5 0 0 0 14.5 0zm1 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m9.927.427A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0l-.396-.396zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
              </svg>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item nav_item px-2">
                <Link
                  className={`nav-link ${active === "/" && "active_link"}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item nav_item px-2">
                <Link
                  className={`nav-link ${active === "/menu" && "active_link"}`}
                  aria-current="page"
                  to="/menu"
                >
                  Menu
                </Link>
              </li>
              <li className="nav-item nav_item px-2">
                <Link
                  className={`nav-link ${
                    active === "/about-us " && "active_link"
                  }`}
                  aria-current="page"
                  to="/about-us"
                >
                  About us
                </Link>
              </li>
              <li className="nav-item nav_item px-2">
                <Link
                  className={`nav-link ${
                    active === "/contact-us" && "active_link"
                  }`}
                  aria-current="page"
                  to="/contact-us"
                >
                  Contact us
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <div className="">
                <IconButton
                  sx={{ mx: 0 }}
                  aria-label="cart"
                  component={Link}
                  to="/private/auth/cat-Items"
                >
                  <StyledBadge badgeContent={cartCounter} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </div>
              {auth ? (
                <div className="d-flex mx-2 login_Smaller">
                  <div className="dropdown dropstart">
                    <div
                      className="btn  "
                      type="button"
                      id="dropdownMenu2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user && img? (
                        <img
                          className="auth_image"
                          src={`${baseurl}/auth/get-photo/${auth?.user?._id}`}
                          width="40px"
                          alt="..."
                          height="40px"
                        />
                      ) : (
                        <img
                          className="auth_image"
                          src={`${baseurl}/auth/get-photo/${auth?.user?._id}`}
                          width="40px"
                          alt="..."
                          height="40px"
                        />
                      )}
                    </div>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenu2"
                    >
                      <li>
                        <Link
                          to={
                            auth && auth?.user?.role === 0
                              ? "/private/auth/user-profile"
                              : auth && auth?.user?.role === 1
                              ? "/private/auth/admin-profile"
                              : "/login"
                          }
                          className="text-decoration-none text-dark"
                        >
                          <button className="dropdown-item" type="button">
                            Profile
                          </button>
                        </Link>
                      </li>
                      <li>
                        {auth?.user?.role !== 1 && (
                          <Link
                            to="/private/auth/order-status"
                            className="text-decoration-none text-dark"
                          >
                            <button className="dropdown-item" type="button">
                              Order Status
                            </button>
                          </Link>
                        )}
                      </li>
                      <li>
                        <button className="dropdown-item" type="button">
                          {auth && auth && auth?.user?.role === 1 && (
                            <Link
                              to={
                                auth && auth && auth?.user?.role === 1
                                  ? "/private/auth/admin-dashboard"
                                  : "/login"
                              }
                              className="text-decoration-none text-dark w-100"
                            >
                              <label className="w-100">Dashboard</label>
                            </Link>
                          )}
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" type="button">
                          <button
                            onClick={handleLogout}
                            className="btn btn-warning fw-bold text-light p-1 w-100"
                          >
                            Logout
                          </button>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="d-flex mx-2 login_Smaller">
                  <Link
                    to="/login"
                    className="btn btn-outline-dark text-warning fw-bold "
                    type="submit"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
