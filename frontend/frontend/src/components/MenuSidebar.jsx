import React, { useContext } from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AuthContext from "./../context/AuthContext";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const Item = ({ title, to, icon }) => {
  return (
    <Link style={{ textDecoration: "unset", color: "white" }} to={to}>
      {" "}
      <MenuItem icon={icon}>{title}</MenuItem>
    </Link>
  );
};

const MenuSidebar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  const { collapseSidebar, toggled, toggleSidebar, collapsed, broken } =
    useProSidebar();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggle = () => {
    toggleSidebar();
    console.log("dupa");
    if (toggled) {
      console.log(true);
      collapseSidebar();
    } else {
      console.log(false);
      collapseSidebar();
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline /> 

    <div id="App" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar
        breakPoint="md"
        transitionDuration={800}
        style={{ height: "100vh"}}
        
       
      >
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
              setIsCollapsed(!isCollapsed);
            }}
            style={{ textAlign: "center" }}
          >
            {user && `Welcome ${user.username}`}
          </MenuItem>

          <Stack direction="row" spacing={2}>
            <Avatar
              alt=""
              src="../../assets/images/domi.jpg"
              sx={
                isCollapsed
                  ? { width: 128, height: 128, margin: " 20px auto " }
                  : { width: 56, height: 56, margin: " 20px auto " }
              }
            />
          </Stack>

          {/* <Item title="Dashboard" icon={<DashboardIcon />} to="/dashboard" /> */}
          <Item title="Menu" icon={<RestaurantMenuIcon />} to="/dishmenu" />
          <Item title="Tables" icon={<TableRestaurantIcon />} to="/tables" />
          <Item title="Orders" icon={<FormatListNumberedIcon />} to="/orders" />
          <Item title="Staff" icon={<PeopleOutlinedIcon />} to="/staff" />
          <Item
            title="Admin"
            icon={<AdminPanelSettingsIcon />}
            to="/admin-panel"
          />
          {user ? (
            <MenuItem onClick={logoutUser} icon={<LogoutIcon />}>
              Logout
            </MenuItem>
          ) : (
            <Item title="Login" icon={<LoginIcon />} to="/login" />
          )}
        </Menu>
      </Sidebar>
    </div>
    </ThemeProvider>
  );
};

export default MenuSidebar;
