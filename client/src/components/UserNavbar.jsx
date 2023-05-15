import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./NavBar.css";

export default function UserNavbar({user}) {

  return (
    <AppBar
      position="sticky"
      sx={{ height: "95px", backgroundColor: "#01203A", boxShadow: "none"}}
    >
      <Toolbar sx={{ height: "95px", p: 0 }}>
        <img src="/logo.svg" alt="gg" style={{ height: "65px", marginRight: "30px", cursor: "pointer"}} />
        <Typography sx={{ flexgrow: 1, ml: 3 }}> {user} DASHBOARD
        </Typography>

        
      </Toolbar>
    </AppBar>
  );
}
