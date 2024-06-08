import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ApiContext = createContext();

export const APIProvider = ({ children }) => {
  const [allOrders, setAllorders] = useState([]);
  ////////////////////////////get all orgers////////////////////
  const [earning, setEarning] = useState(0);
  const [orders, setOrders] = useState(0);
  const [saleItems, setSaleItems] = useState(0);
  const [lineChartDate , setLineChartDate ] = useState(0)


  const [isOpen, setIsOpen] = useState(false);
  const baseurl = process.env.REACT_APP_API_URL
    const handleSidebar = () => {
      setIsOpen(!isOpen);
      
    }
    
  // const getAllOrdersdetail = async () => {
  //   try {
  //     const { data } = await axios.get(`${baseurl}/auth/checkout/get-order`);

  //     // Summing up the subTotalprice values using reduce
  //     const totalEarning = data.order.reduce(
  //       (sum, order) => sum + order.subTotalprice,
  //       0
  //     );
  //     setLineChartDate(data.order.createdBy )
  //     console.log(data.order)
  //     setEarning(totalEarning);

  //     setOrders(data.order.length);
  //     const totalItems = data.order.reduce(
  //       (count, order) => count + order.items.length,
  //       0
  //     );
  //     setSaleItems(totalItems);
  //   } catch (error) {
  //     console.log(error);
  //     window.alert("Failed to Get All order details");
  //   }
  // };
  // useEffect(() => {
  //   getAllOrdersdetail();
  // }, []);

// Assuming you have a useEffect for fetching data
const fetchData = async () => {
  try {
    const response = await axios.get(`${baseurl}/auth/checkout/get-order`);
    const fetchedOrders = response.data.order; // Assuming the array is directly in the response

    const totalEarning = fetchedOrders.reduce(
      (sum, order) => sum + order.subTotalprice,
      0
    );
    
    const lineChartDates = fetchedOrders.map(order => order.updatedAt);

    // setItems(fetchedOrders.length);
    // setSubTotal(totalEarning);
    // setOrderByDate(fetchedOrders);
    // setUpdatedAt(lineChartDates);

    setEarning(totalEarning);
    setOrders(fetchedOrders.length);

    const totalItems = fetchedOrders.reduce(
      (count, order) => count + order.items.length,
      0
    );
    setSaleItems(totalItems);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

useEffect(() => {
  fetchData();
}, []);


  /////////////////////////////////////////////////////////////////////////

  return (
    <ApiContext.Provider value={{ earning, orders,lineChartDate, saleItems ,isOpen , handleSidebar }}>
      {children}
    </ApiContext.Provider>
  );
};
