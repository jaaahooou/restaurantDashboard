import * as React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listOrderDishes } from "../../actions/dishActions";
import { listDishes } from "../../actions/dishActions";
import { getOrderDetails} from "../../actions/ordersActions"

import OrderContext from "../../context/OrderContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
  console.log(id)
  const orderDishList = useSelector((state) => state.orderDishList);
  const { orderDishListError, orderDishListLoading, orderDishes } = orderDishList;
  
  const dishList = useSelector((state) => state.dishList);
  const { error:dishListError, loading:dishListloading, dishes } = dishList;
  
  const orderList = useSelector((state)=>state.orderList)
  const {error:orderListError, loading:orderListLoading, orders}= orderList

  const orderDetails = useSelector((state)=>state.orderDetails)
  const{error:orderDetailsError,loading:orderDetailsLoading, orderDetail } = orderDetails
  
  const [users, setUsers] = useState([]);
  const [isPaid, setIsPaid] = useState(false);

  console.log(orderDetails)



  const params = useParams();

  const addDishToOrder = async (filteredDish) => {
    // USE CALLBACK
    //const [dishQty, setDishQty] = useState[filteredDish.qty];
    console.log("Add dish to order:", filteredDish.id);
    // console.log(filteredDish.id);
    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: {
    //     qty: filteredDish.qty + 1,
    //   },
    // };
    // const data = await axios
    //   .post(
    //     `http://127.0.0.1:8000/orders/update-qty/${filteredDish.id}`,
    //     config
    //   )
    //   .then((response) => {
    //     axios
    //       .get(`http://127.0.0.1:8000/orders/update-qty/${filteredDish.id}`)
    //       .then((res) => {
    //         console.log(res);
    //       });
    //   });
  };

  useEffect(() => {
    dispatch(listOrderDishes());
    dispatch(listDishes());
    dispatch(getOrderDetails(id))
 
  }, [dispatch,id]);

  const setOrderAsPaid = async () => {
    setIsPaid(!isPaid);
    const isPaidInfo = {
      isPaid: isPaid,
    };
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `http://127.0.0.1:8000/orders/update-order/1`,
      isPaidInfo,
      config
    );
  };
  const updateOrder = () => {};

  return (
    <Box sx={{ margin: "20px" }}>
      {" "}
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ marginBottom: "10px" }}
        >
          <Item>Payment method :{orderDetails.order.paymentMethod} </Item>
          <Item
            onClick={() => {
              setOrderAsPaid();
            }}
          >
            {isPaid ? "Is paid" : "Set as paid"}
          </Item>
          <Item>Waiter: {orderDetails.order.user}</Item>
          <Item>Table: {orderDetails.order.table}</Item>
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
            {orderDishes
              .filter((orderedDish) => orderedDish.order == orderDetails.order.id)
              .map((filteredDish) => (
                <TableRow key={filteredDish.id}>
                  <TableCell>
                    {dishes
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
                        addDishToOrder(filteredDish);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    {filteredDish.qty}
                    <IconButton aria-label="delete">
                      <RemoveIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    {dishes
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
                    {dishes
                      .filter(
                        (dishToDisplay) => dishToDisplay.id == filteredDish.dish
                      )
                      .map((filteredDishToDisplay) => (
                        <div key={filteredDishToDisplay.id}>
                          {filteredDishToDisplay.price * filteredDish.qty}
                        </div>
                      ))}
                  </TableCell>
                </TableRow>
              ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{orderDetails.order.totalPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">50</TableCell>
              <TableCell align="right">50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">50</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
