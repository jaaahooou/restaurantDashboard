import * as React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";

import OrderContext from "../../context/OrderContext";
import UserContext from "../../context/UserContext";
import TablesContext from "../../context/TablesContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Box } from "@mui/system";

import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import DishContext from "../../context/DishContext";
import OrderDishContext from "../../context/OrderDishContext";

const TAX_RATE = 0.07;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function Order() {
 
  
  const [users, setUsers] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  let {orderDish} = useContext(OrderDishContext)
  let {orderById,getOrderById} = useContext(OrderContext)
  
  const params = useParams();
  

function getDishesForOder(orderById){
  
 console.log(typeof(orderDish[1].order))
 console.log(typeof(orderById.id))
//  dishes.filter(dish=>dish.category===category.id)
  let orderedDishes = orderDish.filter(orderedDish=>orderDish.order === orderDish[1].order)
 console.log("Filtered: ",orderedDishes)

  
 

}
  

  useEffect(() => {
    getOrderById(params)
    getDishesForOder(orderById)
  }, []);

 


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
          <Item>Payment method :{orderById.paymentMethod} </Item>
          <Item
            onClick={() => {
              setOrderAsPaid();
            }}
          >
            {isPaid ? "Is paid" : "Set as paid"}
          </Item>
          <Item>Waiter: {orderById.user}</Item>
          <Item>Table: {orderById.table}</Item>
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
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                0
              )} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
