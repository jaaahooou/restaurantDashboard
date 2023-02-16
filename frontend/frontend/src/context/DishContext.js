import { createContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

const DishContext = createContext();

export default DishContext;

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);

  let { authTokens } = useContext(AuthContext);

  let getDishes = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/dishes/get-dishes",
      config
    );
    setDishes(data);
  };

  let getCategories = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/dishes/get-categories",
      config
    );
    setCategories(data);
  };

  useEffect(() => {
    getDishes();
    getCategories();
  }, []);

  let contextData = {
    dishes: dishes,
    categories: categories,
  };

  return (
    <DishContext.Provider value={contextData}>{children}</DishContext.Provider>
  );
};
