import * as React from "react";

import { useState } from "react";

import { listTables, listRooms } from "../../actions/tablesActions";
import { getUsers, getEmployees } from "../../actions/userActions";
import { listOrders } from "../../actions/ordersActions";
import { listDishes } from "../../actions/dishActions";
import { listCategories } from "../../actions/categoriesActions";

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
import FilledInput from "@mui/material/FilledInput";

import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";

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

export const MenuComponent = () => {
  const dispatch = useDispatch();
  const dishList = useSelector((state) => state.dishList);
  const { error, loading, dishes } = dishList;
  const categoriesList = useSelector((state) => state.categoriesList);
  const { categoriesError, categoriesLoading, categories } = categoriesList;

  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");

  useEffect(() => {
    dispatch(listDishes());
    dispatch(listCategories());
  }, []);

  const submitHandler = () => {
    console.log(dishName);
    console.log(dishPrice);
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
        <Typography>Menu</Typography>
      </AccordionSummary>

      {categories ? (
        <>
          {categories.map((category) => (
            <AccordionDetails key={category.id}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{category.title}</Typography>
                </AccordionSummary>
                {dishes ? (
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ maxWidth: "100%" }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">
                              Price
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dishes
                            .filter((dish) => dish.category === category.id)
                            .map((filtereDish) => (
                              <TableRow
                                key={filtereDish.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {filtereDish.title}
                                </TableCell>

                                <TableCell align="right">
                                  {filtereDish.price}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                        <TableBody>
                          <TableCell rowSpan={1} colSpan={4}>
                            <Button onClick={() => {}}>Add new dish</Button>
                          </TableCell>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box sx={{ marginTop: "10px" }}>
                      <FormControl sx={{ marginTop: "10px" }}>
                        <InputLabel htmlFor="component-outlined">
                          Name
                        </InputLabel>
                        <OutlinedInput
                          id="component-outlined"
                          defaultValue="Enter dish name"
                          label="Dish-name"
                          onChange={(e) => {
                            setDishName(e.target.value);
                          }}
                        />
                      </FormControl>

                      <FormControl sx={{ marginTop: "10px" }}>
                        <InputLabel htmlFor="component-outlined">
                          Price
                        </InputLabel>
                        <OutlinedInput
                          id="component-outlined"
                          defaultValue="Price"
                          label="Dish-price"
                          onChange={(e) => {
                            setDishPrice(e.target.value);
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
                  </AccordionDetails>
                ) : (
                  <CircularProgress color="secondary" />
                )}
              </Accordion>
            </AccordionDetails>
          ))}
        </>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </Accordion>
  );
};
