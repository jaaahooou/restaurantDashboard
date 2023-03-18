import * as React from "react";

import { listTables, listRooms } from "../../actions/tablesActions";
import { getUsers } from "../../actions/userActions";

import { useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
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

export default function Staff() {
  let location = useLocation();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;

  const userList = useSelector((state) => state.userList);
  const { error: userListError, loading: userListloading, users } = userList;
  //const { error, loading, users } = userList;

  const tableList = useSelector((state) => state.tableList);
  const {
    error: tableListError,
    loading: tableListLoading,
    tables,
  } = tableList;

  const roomsList = useSelector((state) => state.roomsList);
  const { error: roomsListError, loading: roomsListLoading, rooms } = roomsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("USERS IN COMP: ", users);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(listOrders());
    dispatch(listTables());
    dispatch(listRooms());
  }, []);

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <Box sx={{ margin: "20px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Waiter name</StyledTableCell>
              <StyledTableCell align="center">Waiter id</StyledTableCell>
              <StyledTableCell align="center">Waiter/Waitress</StyledTableCell>

              <StyledTableCell align="center">Details</StyledTableCell>
            </TableRow>
          </TableHead>
          {users ? (
            <TableBody>
              {users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.first_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.id}
                    {/* {tables
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
                  ))} */}
                  </StyledTableCell>
                  {/* {users ? (
                <StyledTableCell align="center">
                  {" "}
                  {users
                    .filter((user) => user.id == order.user)
                    .map((filteredUsers) => (
                      <div key={filteredUsers.id}>
                        {filteredUsers.first_name}
                      </div>
                    ))}
                </StyledTableCell>
              ) : (
                <div>name</div>
              )} */}

                  <StyledTableCell style={{ cursor: "pointer" }} align="center">
                    {user.username}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <CircularProgress color="secondary" />
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
