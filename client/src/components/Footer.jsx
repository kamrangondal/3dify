import React from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Link from '@mui/material/Link';
import { LinkedIn, GitHub } from "@mui/icons-material";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{color: "white"}}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/kamran-saif/">
        3dify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <div
      style={{
        height: "calc(100vh - 105px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#01203A",
      }}
    >
      <div style={{ maxWidth: 950, width: "100%", padding: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ color: "#4682B4" }}>
            Get in touch
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ textAlign: "center", color: "#60A8CD" }}
          >
            Interested in super-charging your eCommerce platform with 3D
            Augmented Reality product previews? Get in touch and let's chat.
          </Typography>
          <br />
          <Button
            color="inherit"
            sx={{
              height: "35px",
              width: "200px",
              backgroundColor: "#0071BC",
              borderRadius: "20px",
              "&:hover": { backgroundColor: "#66AAD7" },
            }}
          >
            Contact Us
          </Button>
          <br/>
          <br/>
          <div>
            <IconButton href="https://www.linkedin.com/in/kamran-saif/" target="_blank">
              <LinkedIn sx={{color: "white"}} fontSize="large" />
            </IconButton>
            <IconButton href="https://github.com/kamrangondal" target="_blank">
              <GitHub sx={{color: "white"}} fontSize="large" />
            </IconButton>
          </div>
          <br/>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      </div>
    </div>
  );
}
