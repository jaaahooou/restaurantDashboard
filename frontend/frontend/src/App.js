import MenuSidebar from "./components/MenuSidebar";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./screens/dashboard";
import DishMenu from "./screens/DishMenu";
import Tables from "./screens/Tables";
import Orders from "./screens/orders/index";
import Staff from "./screens/staff";
import Admin from "./screens/admin";
import Order from "./screens/order";

function App() {
  return (
    <Router>
      <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
        <MenuSidebar />
        <main className="content">
          <ResponsiveAppBar />

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dishmenu" element={<DishMenu />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="orders/order/:id" element={<Order />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/admin-panel" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
