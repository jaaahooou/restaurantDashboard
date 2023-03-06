import * as React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { listOrderDishes } from "../../actions/dishActions";
import { listDishes } from "../../actions/dishActions";
import {
  getOrderDetails,
  addToOrder,
  removeFromOrder,
  deleteFromOrder,
} from "../../actions/ordersActions";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { Box } from "@mui/system";

import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Order() {
  const dispatch = useDispatch();
  let { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { error, loading, orderDetail } = orderDetails;

  const orderDishList = useSelector((state) => state.orderDishList);
  const {
    error: errorDishList,
    loading: loadingDishList,
    orderDishes,
  } = orderDishList;

  const dishList = useSelector((state) => state.dishList);
  const { error: dishListError, loading: dishListloading, dishes } = dishList;

  const [users, setUsers] = useState([]);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    dispatch(listDishes());
    dispatch(listOrderDishes(id));

    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const setOrderAsPaid = async () => {};

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <Box sx={{ margin: "20px" }}>
      {" "}
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ marginBottom: "10px" }}
        >
          <Item>Payment method :{orderDetails.order.paymentMethod}</Item>
          <Item
            onClick={() => {
              setOrderAsPaid();
            }}
          >
            {isPaid ? "Is paid" : "Set as paid"}
          </Item>
        </Stack>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dish</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Unit price</TableCell>

              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDishes.map((filteredDish) => (
              <TableRow key={filteredDish.id}>
                <TableCell>
                  {dishList.dishes
                    .filter(
                      (dishToDisplay) => dishToDisplay.id == filteredDish.dish
                    )
                    .map((filteredDishToDisplay) => (
                      <div key={filteredDishToDisplay.id}>
                        {filteredDishToDisplay.title}
                      </div>
                    ))}
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    aria-label="add"
                    onClick={() => {
                      dispatch(addToOrder(filteredDish, id));
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  {filteredDish.qty}

                  <IconButton aria-label="delete">
                    {" "}
                    {filteredDish.qty > 1 ? (
                      <RemoveIcon
                        onClick={() => {
                          dispatch(removeFromOrder(filteredDish, id));
                        }}
                      />
                    ) : (
                      <DeleteOutlineIcon
                        onClick={() => {
                          dispatch(deleteFromOrder(filteredDish, id));
                        }}
                      />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {" "}
                  {dishList.dishes
                    .filter(
                      (dishToDisplay) => dishToDisplay.id == filteredDish.dish
                    )
                    .map((filteredDishToDisplay) => (
                      <div key={filteredDishToDisplay.id}>
                        {filteredDishToDisplay.price}
                      </div>
                    ))}
                </TableCell>

                <TableCell align="right">
                  {dishList.dishes
                    .filter(
                      (dishToDisplay) => dishToDisplay.id == filteredDish.dish
                    )
                    .map((filteredDishToDisplay) => (
                      <div key={filteredDishToDisplay.id}>
                        {(
                          filteredDishToDisplay.price * filteredDish.qty
                        ).toFixed(2)}
                      </div>
                    ))}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {orderDetails.order.totalPrice}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
