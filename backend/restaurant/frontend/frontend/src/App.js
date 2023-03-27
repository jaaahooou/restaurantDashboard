import React from "react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./screens/dashboard";
import DishMenu from "./screens/DishMenu";
import Tables from "./screens/Tables";
import Orders from "./screens/orders/index";
import Admin from "./screens/admin";
import Order from "./screens/order";
import Login from "./screens/login";
import Staff from "./screens/staff";

import MenuSidebar from "./components/MenuSidebar";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
          <MenuSidebar />
          <main className="content">
            <ResponsiveAppBar />

            <Routes>
              <Route element={<Dashboard />} path="/" />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dishmenu" element={<DishMenu />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="orders/order/:id" element={<Order />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/admin-panel" element={<Admin />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
