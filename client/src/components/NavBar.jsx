import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./NavBar.css";
import { useNavigate, Navigate } from "react-router-dom";

export default function NavBar({ handleScrollToBody }) {
  const navigate = useNavigate();
  
  return (
    <AppBar
      position="sticky"
      sx={{ height: "95px", backgroundColor: "#01203A", boxShadow: "none"}}
    >
      <Toolbar sx={{ height: "95px", p: 0 }}>
        <img src="/logo.svg" style={{ height: "65px", marginRight: "30px", cursor: "pointer"}} onClick={() => <Navigate to="/"/>} />
        <Typography sx={{ flexGrow: 1 }}>
        </Typography>

        <div className="dropdown">
          <button className="dropbtn">Dropdown</button>
          <div className="dropdown-content">
            <a onClick={() => handleScrollToBody('section1')}>Link 1</a>
            <a onClick={() => handleScrollToBody('section2')}>Link 2</a>
            <a onClick={() => handleScrollToBody('section3')}>Link 3</a>
            <a onClick={() => handleScrollToBody('section4')}>Link 4</a>
          </div>
        </div>

        <Button color="inherit" sx={{ marginLeft: "50px", height: "35px" , width: "200px", backgroundColor: "#0071BC", borderRadius: "20px", '&:hover': {backgroundColor: "#66AAD7"}}} onClick={() => {navigate("/signin")}}>Login</Button>
      </Toolbar>
    </AppBar>
  );
}
