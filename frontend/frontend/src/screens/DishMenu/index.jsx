import * as React from "react";
import { useState, useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const categories = [
//   "Salads",
//   "Aperitif",
//   "Soups",
//   "Main dishes",
//   "Beers",
//   "Soft drinks",
// ];

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 250),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 250),
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/dishes/get-categories"
      );
      setCategories(data);
    }

    async function fetchDishes() {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/dishes/get-dishes"
      );

      setDishes(data);
      console.log(data);
    }

    fetchCategories();
    fetchDishes();
  }, []);

  return (
    <Box style={{ margin: "20px" }} sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {categories.map((category) => (
          <Grid item xs={1} sm={4} md={4} key={category.id}>
            <Item>
              <Typography variant="h4" align="left">
                {category.title}
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dishes.map((dish) => (
                      <TableRow
                        key={dish.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {dish.category}
                        </TableCell>
                        <TableCell align="right">{dish.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
