import React from "react";
import UserNavbar from "../components/UserNavbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ModelAdd() {
  const navigate = useNavigate();

  return (
    <>
      <UserNavbar user="ADMIN" />

      <Box sx={{ flexGrow: 1, margin: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <Stack spacing={2}>
              <Item
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#01203A", color: "white" },
                }}
                onClick={() => navigate("/admin/dashboard")}
              >
                Due Tasks
              </Item>
              <Item
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#01203A", color: "white" },
                }}
              >
                Tasks Assigned
              </Item>
              <Item
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#01203A", color: "white" },
                }}
                onClick={() => navigate("/admin/addmodel")}
              >
                Tasks Completed
              </Item>
              <Item
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#01203A", color: "white" },
                }}
              >
                Messages
              </Item>
            </Stack>
          </Grid>
          <Grid container xs={9} sx={{ overflow: "auto", bgcolor: "gray", height: "70vh" }}>
            <model-viewer
              alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
              src="/go7.glb"
              ar
              shadow-intensity="1"
              camera-controls
              touch-action="pan-y"
              style={{ width: "100%", height: "100%" }}
            ></model-viewer>
          </Grid>
        </Grid>
      </Box>

      <iframe src="https://res.cloudinary.com/dlgwvuu5d/image/upload/v1681706779/2_dpeajf.jpg" style={{height: "500px", width: "500px"}}></iframe>
    </>
  );
}
