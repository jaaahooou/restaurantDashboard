import * as React from "react";
import AuthContext from "../../context/AuthContext";
import OrderContext from "../../context/OrderContext";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { LinkContainer } from "react-router-bootstrap";

import "@fontsource/public-sans";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [rooms, setRooms] = useState([]);
  const [tables, setTables] = useState([]);
  // const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);
  let { orders, getOrders } = useContext(OrderContext);
  console.log("Orders: ", orders);

  useEffect(() => {
    async function fetchRooms() {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/orders/get-rooms"
      );
      setRooms(data);
    }

    async function fetchTables() {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/orders/get-tables"
      );
      setTables(data);
    }

    // async function fetchOrders() {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //       Authorization: "Bearer " + String(authTokens.access),
    //     },
    //   };

    //   const { data } = await axios.get(
    //     "http://127.0.0.1:8000/orders/get-orders",
    //     config
    //   );
    //   setOrders(data);
    // }

    async function fetchUsers() {
      const { data } = await axios.get("http://127.0.0.1:8000/user/users");
      setUsers(data);
      console.log(data);
    }

    fetchTables();
    fetchRooms();
    // fetchOrders();
    fetchUsers();
  }, []);

  // let getOrders = async () => {
  //   console.log(authTokens);
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: "Bearer " + String(authTokens.access),
  //     },
  //   };
  //   const { data } = axios.get(
  //     "http://127.0.0.1:8000/orders/get-orders",
  //     config
  //   );
  //   console.log(data);
  // };
  // getOrders();

  return (
    <Box sx={{ margin: "20px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Table no</StyledTableCell>
              <StyledTableCell align="center">Room</StyledTableCell>
              <StyledTableCell align="center">Waiter/Waitress</StyledTableCell>
              <StyledTableCell align="center">price</StyledTableCell>
              <StyledTableCell align="center">Details</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell component="th" scope="row">
                  {order.table}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {tables
                    .filter((table) => table.id == order.table)
                    .map((filteredTable) => (
                      <div key={filteredTable.id}>
                        {" "}
                        {rooms
                          .filter((room) => room.id == filteredTable.room)
                          .map((filteredRoom) => (
                            <div key={filteredRoom.id}>{filteredRoom.name}</div>
                          ))}
                      </div>
                    ))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {users
                    .filter((user) => user.id == order.user)
                    .map((filteredUsers) => (
                      <div key={filteredUsers.id}>{filteredUsers.username}</div>
                    ))}
                </StyledTableCell>
                <StyledTableCell align="center">{order.price}</StyledTableCell>
                <StyledTableCell style={{ cursor: "pointer" }} align="center">
                  <LinkContainer
                    component="button"
                    to={`order/${order.id}`}
                    onClick={() => {
                      console.log("Clicked");
                    }}
                  >
                    <Button variant="contained">details</Button>
                  </LinkContainer>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
