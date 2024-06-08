 import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import ContactUs from "./components/Contact/ContactUs";
import AboutUs from "./components/AboutUsPage/AboutUs";
import OurMenu from "./components/OurMenuPage/OurMenu.jsx";
import Login from "./components/LoginPage/Login.js";
import Signup from "./components/SignupPage/Signup.js";
import ForgetPassword from "./components/ForgetPage/ForgetPassword";
import ErrorPage from "./components/ErrorPage/ErrorPage";
// for private routes
import PrivateRoutes from "./components/PrivateRoutes/privateRoutes";
import AdminDashboard from "./components/PrivateRoutes/AdminRoutes/pages/AdminDashboard/AdminDashboard.jsx";
import AdminrProfile from "./components/PrivateRoutes/AdminRoutes/pages/AdminrProfile.jsx";
import ManageCategory from "./components/PrivateRoutes/AdminRoutes/pages/manageCategory.js";
import ManageProducts from './components/PrivateRoutes/AdminRoutes/pages/ManageProducts.js'
import UpdateProducts from "./components/PrivateRoutes/AdminRoutes/pages/UpdateProducts.js";
import UserProfile from './components/PrivateRoutes/UserRoutes/UserProfile/UserProfile.jsx'
import CartItem from "./components/PrivateRoutes/UserRoutes/pages/CartItems/Cart.jsx";
import OrderStatus from "./components/PrivateRoutes/UserRoutes/pages/OrderStatus/taceOrder.jsx";
import Orders from "./components/PrivateRoutes/AdminRoutes/pages/order.jsx";
import ContactMessages from "./components/PrivateRoutes/AdminRoutes/pages/ContactMessages.jsx";
// import MulterFile from "./MulterFile.jsx";
function App() {
  return (
    <div>
     
        <BrowserRouter>
          <div>
            <Routes>
            {/* <Route path="/multer" element={<MulterFile />} /> */}
              <Route path="/" element={<HomePage />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/menu" element={<OurMenu />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forget" element={<ForgetPassword />} />
              <Route path="*" element={<ErrorPage />} />
              {/*//////--------admin routes---------\\\\\\\\*/}
              <Route path="/private/auth" element={<PrivateRoutes />}>
                <Route path="admin-dashboard" element={<AdminDashboard />} />
                <Route path="admin-profile" element={<AdminrProfile />} />
                <Route path="manage-category" element={<ManageCategory />} />
                <Route path="manage-product" element={<ManageProducts />} />
                <Route path="receive-orders" element={<Orders />} />
                <Route path="contact-messages" element={<ContactMessages />} />
                <Route
                  path="Update-product/:slug"
                  element={<UpdateProducts />}
                />
              </Route>

              {/*//////--------user routes---------\\\\\\\\*/}
              <Route path="/private/auth" element={<PrivateRoutes />}>
                <Route path="user-profile" element={<UserProfile />} />
                <Route path="cat-Items" element={<CartItem />} />
                <Route path="order-status" element={<OrderStatus />} />
              </Route>
              {/*//////--------end user  routes---------\\\\\\\\*/}
            </Routes>
          </div>
        </BrowserRouter>
    
    </div>
  );
}

export default App;
