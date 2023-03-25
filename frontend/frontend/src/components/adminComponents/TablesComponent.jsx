import * as React from "react";

import { listTables, listRooms } from "../../actions/tablesActions";
import { listOrders } from "../../actions/ordersActions";
import { createNewTable, removeTable } from "../../actions/tablesActions";

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
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import OutlinedInput from "@mui/material/OutlinedInput";

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

  const [openNewTable, setOpenNewTable] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  let [numberOfPersonsSet, setNumberOfPersonsSet] = useState("");
  const [room, setRoom] = useState("");

  const handleChange = (event) => {
    setRoom(event.target.value);
  };
  const submitHandler = () => {
    try {
      numberOfPersonsSet = Number(numberOfPersonsSet);
      if (numberOfPersonsSet > 0) {
        dispatch(createNewTable(room, numberOfPersonsSet, tables, rooms));
      } else if (numberOfPersonsSet < 0) {
        alert("NUmber of persons must be greater then zero");
      } else {
        alert("Umber of persons must be a number");
      }
    } catch (error) {
      alert("error");
    }
  };

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

            {tables ? (
              <TableBody>
                {tables.map((table) => (
                  <StyledTableRow key={table.id}>
                    <StyledTableCell component="th" scope="row">
                      {table.tableNumber}
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
                    <StyledTableCell
                      component="th"
                      style={{ cursor: "pointer" }}
                      align="center"
                    >
                      <Button
                        onClick={() => {
                          console.log("DUPA");
                          dispatch(removeTable(table, rooms, tables));
                        }}
                      >
                        <ClearIcon sx={{ color: "red" }} />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            ) : (
              <></>
            )}

            <TableBody>
              <TableCell rowSpan={1} colSpan={4}>
                {openNewTable ? (
                  <Button
                    onClick={() => {
                      setOpenNewTable(!openNewTable);
                    }}
                  >
                    close
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setOpenNewTable(!openNewTable);
                    }}
                  >
                    Add new table
                  </Button>
                )}
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
        {openNewTable ? (
          <Box sx={{ marginTop: "10px" }}>
            <FormControl sx={{ marginTop: "10px", minWidth: "200px" }}>
              <InputLabel id="demo-simple-select-label">Room</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={room}
                label="Room"
                onChange={handleChange}
              >
                <MenuItem value="Lunch Bar">Lunch Bar</MenuItem>
                <MenuItem value="Dinner Room">Dinner Room</MenuItem>
                <MenuItem value="English Bar">English Bar</MenuItem>
                <MenuItem value="Cucina Italiana">Cucina Italiana</MenuItem>
                <MenuItem value="Main room">Main room</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ marginTop: "10px" }}>
              <InputLabel htmlFor="component-outlined">Persons</InputLabel>
              <OutlinedInput
                id="component-outlined"
                defaultValue="Persons"
                label="Dish-price"
                onChange={(e) => {
                  setNumberOfPersonsSet(e.target.value);
                }}
              />
            </FormControl>
            <Button
              sx={{ marginTop: "10px", height: "56px" }}
              onClick={() => {
                submitHandler();
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
