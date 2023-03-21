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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import "@fontsource/public-sans";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LinkContainer } from "react-router-bootstrap";
import { TablesComponent } from "../../components/adminComponents/TablesComponent";
import { StaffComponent } from "../../components/adminComponents/StaffComponent";
import { MenuComponent } from "../../components/adminComponents/MenuComponent";

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
  const { userInfo } = userLogin;

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
      <StaffComponent />
      <TablesComponent />
      <MenuComponent />
    </Box>
  );
}
