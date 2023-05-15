import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function AdminNavBarSignIn() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  
  return (
    <AppBar
    position="sticky"
    sx={{ height: "95px", backgroundColor: "#01203A", boxShadow: "none"}}
  >
    <Toolbar sx={{ height: "95px", p: 0 }}>
      <img src="/logo.svg" style={{ height: "65px", marginRight: "30px", cursor: "pointer"}} onClick={handleLogoClick} />
      <Typography sx={{ flexGrow: 1 }}>
      </Typography>

      <Button color="inherit" sx={{ marginLeft: "50px", height: "35px" , width: "200px", backgroundColor: "#0071BC", borderRadius: "20px", '&:hover': {backgroundColor: "#66AAD7"}}} onClick={() => {navigate("/developer/signin")}}>Developer Login</Button>
      <Button color="inherit" sx={{ marginLeft: "50px", height: "35px" , width: "200px", backgroundColor: "#0071BC", borderRadius: "20px", '&:hover': {backgroundColor: "#66AAD7"}}} onClick={() => {navigate("/signin")}}>User Login</Button>
    </Toolbar>
  </AppBar>
  );
}
