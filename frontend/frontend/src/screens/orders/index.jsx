import * as React from "react";
import AuthContext from "../../context/AuthContext";

import UserContext from "../../context/UserContext";
import TablesContext from "../../context/TablesContext";
import RoomsContext from "../../context/RoomsContext";

import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

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

import { listOrders } from "../../actions/ordersActions";

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
  let location = useLocation();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  let { users } = useContext(UserContext);
  let { tables } = useContext(TablesContext);
  let { rooms } = useContext(RoomsContext);

  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;
  useEffect(() => {
    dispatch(listOrders());
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <Box sx={{ margin: "20px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Table no</StyledTableCell>
              <StyledTableCell align="center">Room</StyledTableCell>
              <StyledTableCell align="center">Waiter/Waitress</StyledTableCell>

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
