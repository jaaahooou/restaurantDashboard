import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { UserProvider } from "./context/UserContext";
import { TablesProvider } from "./context/TablesContext";
import { RoomsProvider } from "./context/RoomsContext";

import { OrderDishProvider } from "./context/OrderDishContext";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./screens/dashboard";
import DishMenu from "./screens/DishMenu";
import Tables from "./screens/Tables";
import Orders from "./screens/orders/index";
import Staff from "./screens/staff";
import Admin from "./screens/admin";
import Order from "./screens/order";
import Login from "./screens/login";
import PrivateRoutes from "./utils/PrivateRoute";

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
        <AuthProvider>
          <OrderProvider>
            <UserProvider>
              <TablesProvider>
                <RoomsProvider>
                  <OrderDishProvider>
                    <div
                      id="app"
                      style={({ height: "100vh" }, { display: "flex" })}
                    >
                      <MenuSidebar />
                      <main className="content">
                        <ResponsiveAppBar />

                        <Routes>
                          <Route element={<PrivateRoutes />}>
                            <Route element={<Dashboard />} path="/" />
                          </Route>

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
                  </OrderDishProvider>
                </RoomsProvider>
              </TablesProvider>
            </UserProvider>
          </OrderProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
