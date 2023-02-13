import * as React from "react";
import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Tables() {
  const [rooms, setRooms] = useState([]);
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/orders/get-rooms"
      );
      setRooms(data);
    }

    async function fetchTables() {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/orders/get-tables"
      );
      setTables(data);
    }

    async function fetchOrders() {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/orders/get-orders"
      );
      setOrders(data);
      console.log(data);
    }

    fetchTables();
    fetchRooms();
    fetchOrders();
  }, []);

  useEffect(() => {}, []);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div sx={{ maxwidth: 1024 }}>
      <Box
        style={{
          display: "flex",
          margin: "20px auto",
          maxWidth: 1024,
        }}
        sx={{ flexGrow: 1 }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {tables.map((table) => (
            <Grid item xs={1} sm={4} md={4} key={table.id}>
              <Item sx={{ cursor: "pointer" }}>
                <Typography
                  variant="h5"
                  align="left"
                  style={{
                    borderBottom: "1px solid grey",
                    marginBottom: "20px",
                  }}
                >
                  Table No: {table.tableNumber}
                </Typography>

                {rooms
                  .filter((room) => room.id == table.room)
                  .map((filteredRoom) => (
                    <div key={filteredRoom.id}>
                      <Typography align="left" variant="h6">
                        {filteredRoom.name}
                      </Typography>

                      <Typography>
                        Number of persons: {table.numberOfPersons}
                      </Typography>
                      <Typography
                        variant="h6"
                        style={
                          table.isOccupied
                            ? { color: "red" }
                            : { color: "green" }
                        }
                      >
                        {table.isOccupied ? "Occupied" : "Avaible"}
                      </Typography>
                    </div>
                  ))}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
