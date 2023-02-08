import MenuSidebar from "./components/MenuSidebar";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

import React from "react";
import ReactDOM from "react-dom/client";

import { ProSidebarProvider } from "react-pro-sidebar";
function App() {
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <MenuSidebar />
      <main className="content">
        <ResponsiveAppBar />
      </main>
    </div>
  );
}

export default App;
