import { createContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

const RoomsContext = createContext();

export default RoomsContext;

export const RoomsProvider = ({ children }) => {
  let { authTokens } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);

  let getRooms = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/orders/get-rooms",
      config
    );
    setRooms(data);
  };

  useEffect(() => {
    getRooms();
  },[]);
  let contextData = {
    rooms: rooms,
  };
  return (
    <RoomsContext.Provider value={contextData}>
      {children}
    </RoomsContext.Provider>
  );
};
