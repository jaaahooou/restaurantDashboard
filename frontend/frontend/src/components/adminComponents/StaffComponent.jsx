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

export const StaffComponent = () => {
  const dispatch = useDispatch();

  const employeeList = useSelector((state) => state.employeeList);
  const { error, loading, employees } = employeeList;

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Staff</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell component="th">Waiter name</StyledTableCell>
                <StyledTableCell align="center">Person id</StyledTableCell>
                <StyledTableCell align="center">Position</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees ? (
                <>
                  {employees.map((employee) => (
                    <StyledTableRow key={employee.id}>
                      <StyledTableCell component="th" scope="row">
                        {employee.name}
                      </StyledTableCell>
                      <StyledTableCell component="th" align="center">
                        {employee.id}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        style={{ cursor: "pointer" }}
                        align="center"
                      >
                        {employee.position}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        style={{ cursor: "pointer" }}
                        align="center"
                      >
                        <ClearIcon sx={{ color: "red" }} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              ) : (
                <CircularProgress color="secondary" />
              )}
            </TableBody>
            <TableBody>
              <TableCell rowSpan={1} colSpan={4}>
                <Button onClick={() => {}}>Add new person</Button>
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
