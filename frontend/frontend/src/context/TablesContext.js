import { createContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

const TableContext = createContext();

export default TableContext;

export const TablesProvider = ({ children }) => {
  let { authTokens } = useContext(AuthContext);
  const [tables, setTables] = useState([]);

  let getTables = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/orders/get-tables",
      config
    );
    setTables(data);
  };

  useEffect(() => {
    getTables();
  }, []);

  let contextData = {
    tables: tables,
  };

  return (
    <TableContext.Provider value={contextData}>
      {children}
    </TableContext.Provider>
  );
};
