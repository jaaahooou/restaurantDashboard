import React from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";

import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const MenuSidebar = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <div id="App" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar
        breakPoint="md"
        transitionDuration={800}
        style={{ height: "100vh", color: "white" }}
        backgroundColor="rgb(38, 104, 103)"
        rtl={false}
      >
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            <h2>Admin</h2>
          </MenuItem>
          <MenuItem href="/dishmenu" icon={<RestaurantMenuIcon />}>
            Menu
            {/* <Link to="/dishmenu" /> */}
          </MenuItem>
          <MenuItem icon={<TableRestaurantIcon />}>Tables</MenuItem>
          <MenuItem icon={<FormatListNumberedIcon />}>Orders</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Staff</MenuItem>
          <MenuItem icon={<AdminPanelSettingsIcon />}>Admin panel</MenuItem>
          <MenuItem icon={<LoginIcon />}>Login</MenuItem>
          <MenuItem icon={<LogoutIcon />}>Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MenuSidebar;
