import { createContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

const OrderContext = createContext();

export default OrderContext;

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  let { authTokens } = useContext(AuthContext);

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

  useEffect(() => {
    getOrders();
  }, []);

  let contextData = {
    orders: orders,
    getOrders: getOrders,
  };

  return (
    <OrderContext.Provider value={contextData}>
      {children}
    </OrderContext.Provider>
  );
};
