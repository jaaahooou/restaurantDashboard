import * as React from "react";

import { listTables, listRooms } from "../../actions/tablesActions";
import { getUsers, getEmployees } from "../../actions/userActions";
import { listOrders } from "../../actions/ordersActions";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { Box } from "@mui/system";

import CircularProgress from "@mui/material/CircularProgress";
import "@fontsource/public-sans";

import { TablesComponent } from "../../components/adminComponents/TablesComponent";
import { StaffComponent } from "../../components/adminComponents/StaffComponent";
import { MenuComponent } from "../../components/adminComponents/MenuComponent";
import { LoginMessageComponent } from "../../components/LoginMessageComponent";

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

export default function Admin() {
  let location = useLocation();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { error, loading, users } = userList;

  const orderList = useSelector((state) => state.orderList);
  const {
    error: orderListError,
    loading: orderListLoading,
    orders,
  } = orderList;

  const tableList = useSelector((state) => state.tableList);
  const {
    error: tableListError,
    loading: tableListLoading,
    tables,
  } = tableList;

  const roomsList = useSelector((state) => state.roomsList);
  const { error: roomsListError, loading: roomsListLoading, rooms } = roomsList;

  const employeeList = useSelector((state) => state.employeeList);
  const {
    error: employeeListError,
    loadng: employeeListLoading,
    employees,
  } = employeeList;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: userLoginError,
    loading: userLoginLoading,
    userInfo,
  } = userLogin;

  const [roomName, setroomName] = React.useState("");
  const handleChange = (event) => {
    setroomName(event.target.value);
  };

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
      {userLogin.userInfo.id ? (
        <>
          <StaffComponent />
          <TablesComponent />
          <MenuComponent />
        </>
      ) : (
        <LoginMessageComponent />
      )}
    </Box>
  );
}
