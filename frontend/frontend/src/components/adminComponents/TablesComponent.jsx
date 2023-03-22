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

export const TablesComponent = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;

  const tableList = useSelector((state) => state.tableList);
  const {
    error: tableListError,
    loading: tableListLoading,
    tables,
  } = tableList;

  const roomsList = useSelector((state) => state.roomsList);
  const { error: roomsListError, loading: roomsListLoading, rooms } = roomsList;

  useEffect(() => {
    dispatch(listOrders());
    dispatch(listTables());
    dispatch(listRooms());
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
        <Typography>Tables</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Table no</StyledTableCell>
                <StyledTableCell align="center">Room</StyledTableCell>
                <StyledTableCell align="center">Max Persons</StyledTableCell>
                <StyledTableCell align="center">remove</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tables.map((table) => (
                <StyledTableRow key={table.id}>
                  <StyledTableCell component="th" scope="row">
                    {table.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {rooms
                      .filter((room) => room.id == table.room)
                      .map((filteredRoom) => (
                        <div key={filteredRoom.id}> {filteredRoom.name}</div>
                      ))}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {table.numberOfPersons}
                  </StyledTableCell>
                  {orders ? (
                    <StyledTableCell
                      style={{ cursor: "pointer" }}
                      align="center"
                    >
                      {table.isOccupied ? (
                        <div>
                          {orders
                            .filter((order) => order.table == table.id)
                            .map((filteredOrder) => (
                              <LinkContainer
                                key={filteredOrder.id}
                                component="button"
                                to={`/orders/order/${filteredOrder.id}`}
                                onClick={() => {
                                  console.log("Clicked");
                                }}
                              >
                                <Button variant="contained">details</Button>
                              </LinkContainer>
                            ))}
                        </div>
                      ) : (
                        <Button variant="contained" onClick={() => {}}>
                          add order
                        </Button>
                      )}
                    </StyledTableCell>
                  ) : (
                    <div></div>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>

            <TableBody>
              <TableCell rowSpan={1} colSpan={4}>
                <Button onClick={() => {}}>Add new table</Button>
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
