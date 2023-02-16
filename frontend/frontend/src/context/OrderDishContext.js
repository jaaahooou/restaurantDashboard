import { createContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

const OrderDishContext = createContext();

export default OrderDishContext;

export const OrderDishProvider = ({ children }) => {
  const [orderDish, setOrderDish] = useState([]);

  let { authTokens } = useContext(AuthContext);

  let getOrderDishes = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/dishes/get-order-dishes",
      config
    );
    setOrderDish(data);
  };

  useEffect(() => {
    getOrderDishes();
  }, []);

  let contextData = {
    orderDish: orderDish,
  };

  return (
    <OrderDishContext.Provider value={contextData}>
      {children}
    </OrderDishContext.Provider>
  );
};
