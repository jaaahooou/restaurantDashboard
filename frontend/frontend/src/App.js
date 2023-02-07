import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
function App() {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  const toggle = () => {
    toggleSidebar();
    if (toggled) {
      console.log(true);
      collapseSidebar();
    } else {
      console.log(false);
      collapseSidebar();
    }
  };

  const colors = {
    colorOne: "#051821",
    colorTwo: "#1A4645",
    colorThree: "266867",
    colorFour: "F58800",
    colorFive: "F8BC24",
  };
  console.log(colors.colorOne);
  return (
    <div id="App" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar
        breakPoint="sm"
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
          <MenuItem icon={<RestaurantMenuIcon />}>Menu</MenuItem>
          <MenuItem icon={<TableRestaurantIcon />}>Tables</MenuItem>
          <MenuItem icon={<FormatListNumberedIcon />}>Orders</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Staff</MenuItem>
          <MenuItem icon={<AdminPanelSettingsIcon />}>Admin panel</MenuItem>
          <MenuItem icon={<LoginIcon />}>Login</MenuItem>
          <MenuItem icon={<LogoutIcon />}>Logout</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <h1
          style={{
            color: "white",
            marginLeft: "5rem",
          }}
          onClick={() => {
            toggle();
          }}
        >
          Header
        </h1>
        {toggled ? (
          <h1 style={{ color: "white", marginLeft: "5rem" }}>Toggled</h1>
        ) : (
          <h1 style={{ color: "white", marginLeft: "5rem" }}>Not Toggled</h1>
        )}

        {broken && (
          <h1 style={{ color: "white", marginLeft: "5rem" }}>Small screen</h1>
        )}
      </main>
    </div>
  );
}
// https://blog.logrocket.com/create-sidebar-react-pro-sidebar-mui/
export default App;
