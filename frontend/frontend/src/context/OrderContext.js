import { createContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderContext = createContext();

export default OrderContext;

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderById, setOrderById] = useState([]);
  let { authTokens } = useContext(AuthContext);
  const params = useParams();

  let getOrders = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/orders/get-orders",
      config
    );
    setOrders(data);
  };



  
  let getOrderById = async(params) => {
   
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    };

    const { data } = await axios.get(
      `http://127.0.0.1:8000/orders/get-order/${params.id}`,
      config
    );

    setOrderById(data)
 
  
    
  }




  useEffect(() => {
    getOrders();
   
  }, []);

  let contextData = {
    orders: orders,
    orderById:orderById,
    getOrders: getOrders,
    getOrderById:getOrderById,
  };

  return (
    <OrderContext.Provider value={contextData}>
      {children}
    </OrderContext.Provider>
  );
};
