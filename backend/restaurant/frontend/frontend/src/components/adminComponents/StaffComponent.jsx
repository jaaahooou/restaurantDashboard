import * as React from "react";

import {
  getUsers,
  getEmployees,
  createNewUser,
} from "../../actions/userActions";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import TextField from "@mui/material/TextField";

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

  const [openNewPerson, setOpenNewPerson] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");

  const employeeList = useSelector((state) => state.employeeList);
  const { error, loading, employees } = employeeList;
  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: userLoginError,
    loading: userLoginLoading,
    userInfo,
  } = userLogin;

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const addHandler = () => {
    console.log(name);
    console.log(email);
    console.log(position);
    console.log(password);
  };

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
                        {userLogin.userInfo.isAdmin ? (
                          <ClearIcon sx={{ color: "red" }} />
                        ) : (
                          <ClearIcon sx={{ color: "black" }} />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
            </TableBody>
            <TableBody>
              <TableCell rowSpan={1} colSpan={4}>
                {openNewPerson ? (
                  <Button
                    onClick={() => {
                      setOpenNewPerson(!openNewPerson);
                    }}
                  >
                    close
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setOpenNewPerson(!openNewPerson);
                    }}
                  >
                    Add new person
                  </Button>
                )}
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
        {openNewPerson ? (
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-name"
                label="Name"
                defaultValue="Name"
                autoComplete="current-name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                required
                id="outlined-email"
                label="email"
                defaultValue="Email"
                autoComplete="current-Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                required
                id="outlined-position"
                label="Position"
                defaultValue="Position"
                autoComplete="current-Position"
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />

              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <Button
              sx={{ marginTop: "10px", height: "56px" }}
              onClick={() => {
                dispatch(createNewUser(name, email, position, password));
                addHandler();
              }}
            >
              Add
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
