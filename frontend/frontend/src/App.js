import MenuSidebar from "./components/MenuSidebar";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./screens/dashboard";
import DishMenu from "./screens/DishMenu";

function App() {
  return (
    <Router>
      <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
        <MenuSidebar />
        <main className="content">
          <ResponsiveAppBar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dishmenu" element={<DishMenu />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
