import * as React from "react";

import { listTables, listRooms } from "../../actions/tablesActions";
import { getUsers, getEmployees } from "../../actions/userActions";
import { listOrders } from "../../actions/ordersActions";

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
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

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

  const userList = useSelector((state) => state.userList);
  const { error, loading, users } = userList;
  //const { error, loading, users } = userList;

  const roomsList = useSelector((state) => state.roomsList);
  const { error: roomsListError, loading: roomsListLoading, rooms } = roomsList;

  const employeeList = useSelector((state) => state.employeeList);
  const {
    error: employeeListError,
    loadng: employeeListLoading,
    employees,
  } = employeeList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getEmployees());
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
              <StyledTableCell align="center">Person id</StyledTableCell>
              <StyledTableCell align="center">Position</StyledTableCell>

              <StyledTableCell align="center">In work</StyledTableCell>
            </TableRow>
          </TableHead>
          {employees ? (
            <TableBody>
              {employees.map((employee) => (
                <StyledTableRow key={employee.id}>
                  <StyledTableCell component="th" scope="row">
                    {employee.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.id}
                  </StyledTableCell>
                  <StyledTableCell style={{ cursor: "pointer" }} align="center">
                    {employee.position}
                  </StyledTableCell>
                  <StyledTableCell style={{ cursor: "pointer" }} align="center">
                    {employee.isActive ? (
                      <CheckIcon sx={{ color: "green" }} />
                    ) : (
                      <ClearIcon sx={{ color: "red" }} />
                    )}
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
