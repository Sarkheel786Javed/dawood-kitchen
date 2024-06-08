import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Navbar from "../../../../navbar/Navbar";
function Cart() {
  const baseurl = process.env.REACT_APP_API_URL
  const navigate = useNavigate();
  const [getAllCart, setGetAllCart] = useState([]);
  var auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.user._id;
  const [subTotalprice, setSubTotalprice] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  //////////////////////////////////////////////////////
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //     });
  //   }
  // }, []);

  /////////////////////////////////////////////////////
  useEffect(() => {
    setCardNumber("1234-5678-9012-3456");
    setCardExpiryDate("12/23");
    setCardCVV("123");
  }, []);



  const getAllCartItem = async () => {
    if (auth) {
      try {
        const { data } = await axios.get(`${baseurl}/auth/cart/get-cart/${userId}`);
        setGetAllCart(data.cart);
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
  }, [userId]);

  ///////////////////Initialize newQuantities with quantities from the cart\\\\\\\\\\\\\\\\\\\\\\
  const initialQuantities = {};
  getAllCart.forEach((cart) => {
    initialQuantities[cart._id] = cart.quantities;
  });

  const [newQuantities, setNewQuantities] = useState(initialQuantities);

  ///////////////////Function to increment the count for a specific product\\\\\\\\\\\\\\\\\
  const increment = (cart) => {
    setNewQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cart._id]: (prevQuantities[cart._id] || cart.quantities) + 1,
    }));
  };

  //////////////Function to decrement the count for a specific product\\\\\\\\\\\\\\\\
  const decrement = (cart) => {
    if (newQuantities[cart._id] > 0) {
      setNewQuantities((prevQuantities) => ({
        ...prevQuantities,
        [cart._id]: prevQuantities[cart._id] - 1,
      }));
    } else if (newQuantities[cart._id] >= 0) {
      setNewQuantities((prevQuantities) => ({
        ...prevQuantities,
        [cart._id]: prevQuantities[cart._id] - 0,
      }));
    }
  };
  /////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  /////////////////////Calculate the subtotal price\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  useEffect(() => {
    let subtotal = 0;

    getAllCart.forEach((cart) => {
      const quantity = newQuantities[cart._id] || cart.quantities;
      const itemSubtotal = quantity * cart.productPrice;
      subtotal += itemSubtotal;
    });

    setSubTotalprice(subtotal);
  }, [getAllCart, newQuantities]);
  //////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const checkout = async () => {
    // Create an array to hold the items in the cart for checkout
    const checkoutItems = getAllCart.map((cart) => ({
      productId: cart._id,
      productName: cart.productName,
      quantity: newQuantities[cart._id] !== undefined ? newQuantities[cart._id] : cart.quantities,
    }));
    

    try {
      const checkoutData = {
        userId: auth.user._id,
        roleOfUser: auth.user.role,
        email: auth.user.email,
        subTotalprice,
        items: checkoutItems,
        cardNumber,
        cardExpiryDate,
        cardCVV,
      };
      const { data } = await axios.post(
        `${baseurl}/auth/checkout/checkout-payments`,
        checkoutData
      );

      if (data?.success) {
        window.alert(" Payment Successfull ");
      }
      getAllCartItem()
    } catch (error) {
      console.log(error);
      window.alert("Failed Payment");
    }
  };
  ///////////// handle delete cart item\\\\\\\\\\\\\\\\\\\\\\\\\\

  const handledelete = async (cartId) => {
    try {
      await axios.delete(`${baseurl}/auth/cart/cart-delete/${cartId}`);
      window.alert("Cart Item  Deleted Successfully");
      getAllCartItem()
      navigate("/private/auth/cat-Items");
    } catch (error) {
      console.log(error);
      window.alert("Faild to Delete Cart Item");
    }
  };

  if (auth.user.role === 0) {
    return (
      <div>
        <Navbar />
        {getAllCart.length > 0 && getAllCart && (
          <div className="mt-5">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Food Name</th>

                  <th scope="col">Quantity</th>
                  <th scope="col">delete</th>
                  <th scope="col">Rs</th>
                </tr>
              </thead>

              <tbody>
                {getAllCart.map((cart) => (
                  <tr key={cart._id}>
                    <th scope="row">{cart.productName}</th>
                    <td>
                      <button
                        className="btn mx-1 my-1 py-0"
                        style={{ backgroundColor: "orangered" }}
                        onClick={() => decrement(cart)}
                      >
                        -
                      </button>
                      <button
                        className="btn mx-1 my-1 py-0"
                        style={{ backgroundColor: "orangered" }}
                      >
                        {newQuantities[cart._id] || cart.quantities}
                      </button>
                      <button
                        className="btn mx-1 my-1 py-0"
                        style={{ backgroundColor: "orangered" }}
                        onClick={() => increment(cart)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <label onClick={() => handledelete(cart._id)}>
                        <DeleteForeverIcon />
                      </label>
                    </td>

                    <td>
                      <label className="text-warniing mx-2">$</label>
                      {cart.productPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className=" w-100">
              <div className="d-flex justify-content-end align-items-center w-100 px-3">
                <h5>
                  Subtotal $ :{" "}
                  <label className="fw-bold">{subTotalprice}</label>
                </h5>
                {/* Button trigger modal */}

                <div>
                  {/* Modal */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Order Now
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body">
                          {/*/////////////order form\\\\\\\\\\\\\\\\\\ */}
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              src="https://img.freepik.com/free-vector/realistic-credit-card-design_23-2149126088.jpg?w=740&t=st=1702158466~exp=1702159066~hmac=3b080ce4d5fb243fbff635e04d20b30497bbe4196ee9517c2968ab22128ac318"
                              alt="....bank"
                              width="80%"
                              height="200px"
                            />
                          </div>

                          <from>
                            <div className="m-3 w-100 px-3">
                              <label>Card Number</label>
                              <br />
                              <input
                                className="w-100 "
                                type="text"
                                minLength={19}
                                maxLength={19}
                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                              />
                            </div>
                            <div className="d-flex justify-content-center align-items-center px-3">
                              <div className="m-3 w-50">
                                <label className="form-label">
                                  Expiry cardExpiryDate
                                </label>
                                <input
                                  type="text"
                                  placeholder="01/25"
                                  minLength={5}
                                  maxLength={5}
                                  value={cardExpiryDate}
                                  onChange={(e) =>
                                    setCardExpiryDate(e.target.value)
                                  }
                                />
                              </div>
                              <div className="m-3 w-50">
                                <label>CVV</label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  minLength={3}
                                  maxLength={3}
                                  value={cardCVV}
                                  onChange={(e) => setCardCVV(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                              <button
                                type="submit"
                                className="btn btn-warning w-100"
                                onClick={checkout}
                              >
                                Pay Now
                              </button>
                            </div>
                          </from>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center w-100 px-3">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
        {getAllCart.length == 0 && (
          <h1 className="mt-5 pt-3 text-center">No Product Added to Cart</h1>
        )}
      </div>
    );
  } else {
    navigate("/Login");
    window.alert("Please login from user id ");
  }
}

export default Cart;
//  <div> {longitude} {latitude}</div>
