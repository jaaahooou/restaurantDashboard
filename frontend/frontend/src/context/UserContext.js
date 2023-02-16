import { createContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  let { authTokens } = useContext(AuthContext);

  let getUsers = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/user/users",
      config
    );

    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  let contextData = {
    users: users,
    getUsers: getUsers,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
