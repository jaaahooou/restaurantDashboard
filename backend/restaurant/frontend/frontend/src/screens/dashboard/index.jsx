import React from "react";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Dashboard = () => {
  return (
    <div
      style={{
        color: "white",
        maxWidth: "1024px",
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      <h1>Welcome to restaurant dashboard</h1>
      <section
        style={{
          color: "grey",
          maxWidth: "1024px",
          margin: "20px 10px",
          textAlign: "left",
        }}
      >
        <p>
          This application will help you to manage your restaurant. Read quick
          inctructions below to learn how it works.
        </p>
        <h3>Login to app</h3>
        <p>user: johnnybravo@undefined.pl</p>
        <p>password: johnnybravo</p>
        <h3>Menu</h3>
        <p>
          Click on <RestaurantMenuIcon style={{ fontSize: "large" }} /> to see
          what kind of dishes an categories are actually used in restaurant.
          These options can be changed from admin panel by user who have admin
          account.
        </p>
        <h3>Tables</h3>
        <p>
          Click on <TableRestaurantIcon style={{ fontSize: "large" }} /> to see
          all tables used in restaurant. Each table is assigned to one room.
          Every waiter and waitress can add order to table and see details of an
          arder.
        </p>
        <h3>Tables</h3>
        <p>
          Click on <FormatListNumberedIcon style={{ fontSize: "large" }} /> to
          see opened orders. Here you can find informatinos about wich table,
          room and waiter is assigned to order. Clicking "Details" button will
          take you to the order card where you can add and remove dishes.
        </p>
        <h3>Staff</h3>
        <p>
          Click on <PeopleOutlinedIcon style={{ fontSize: "large" }} /> to see
          people who work in restaurant.
        </p>
        <h3>Admin</h3>
        <p>
          Click on <AdminPanelSettingsIcon style={{ fontSize: "large" }} /> to
          get to admin panel. Here you can manage a restaurant: add and remove
          staff, tables and dishes. You have to be legged as admin to make
          changes.
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
