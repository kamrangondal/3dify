import React, { useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "70vh",
  maxWidth: "70vw",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const updateDeveloper = async (productId, developer) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/developer/${productId}`,
      { developer }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating developer for product");
  }
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [developer, setDeveloper] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [clickedModelIndex, setClickedModelIndex] = React.useState([]);
  const [status, setStatus] = React.useState([]);

  const handleChange = async (event, index) => {
    const productId = rows[index]._id;
    const newDeveloper = event.target.value;

    try {
      setOpen(true);
      await updateDeveloper(productId, newDeveloper);
      setOpen(false);
      const updatedItems = [...developer];
      updatedItems[index] = newDeveloper;
      setDeveloper(updatedItems);
      console.log("developer---after---update---->", developer);
    } catch (error) {
      console.error(error);
    }
  };
  // idr hum ny ye krna ha k, admin dashboard se content otha k idr lana ha, aur errors remove krny hein, 

  const handleImageShow = (index) => {
    const images = selectedFiles[index];

    const imageList = images.map((image) => {
      return image;
    });

    setClickedModelIndex(imageList);
    setOpenModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        setRows(response.data.descriptions);
        setSelectedFiles(response.data.products);
        setDeveloper(response.data.developer);
        setStatus(response.data.status);
        console.log("developer--->", response.data.developer);

        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
        setOpen(false);
      });
  }, []);

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
                onClick={() => navigate("/admin/tasksassigned")}
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
          <Grid container xs={9} sx={{ overflow: "auto" }}>
            <strong>
              Following Tasks are{" "}
              <span style={{ color: "#c0ce00", textDecoration: "underline", textDecorationColor: "Red" }}>
                DUE TASKS
              </span>{" "}
              and needs to be assigned to a Developer. Once assigned, they will be moved to
              the Tasked-Assigned tab.
            </strong>

            <TableContainer
              component={Paper}
              sx={{ maxHeight: "82vh", overflow: "auto" }}
            >
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableBody>
                  {rows.map(
                    (row, index) =>
                      developer[index] === "Not Assigned" && (
                        <TableRow key={row._id}>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              whiteSpace: "wrap",
                              wordWrap: "break-word",
                              maxWidth: "0vw",
                            }}
                          >
                            {row.description}
                          </TableCell>
                          <TableCell style={{ width: 203 }} align="right">
                            <Button
                              variant="contained"
                              sx={{
                                bgcolor: "#01203A",
                                "&:hover": { bgcolor: "#00558D" },
                              }}
                              onClick={() => {
                                handleImageShow(index);
                              }}
                            >
                              Click to View Images
                            </Button>
                          </TableCell>
                          <TableCell style={{ width: 205 }} align="right">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Assign Task to the Developer
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={
                                  developer[index]
                                    ? developer[index]
                                    : "Not Assigned"
                                }
                                sx={{ color: "black" }}
                                label="Developer"
                                onChange={(event) => handleChange(event, index)}
                              >
                                <MenuItem value={"Not Assigned"}>
                                  Not Assigned
                                </MenuItem>
                                <MenuItem value={"Ben"}>Ben</MenuItem>
                                <MenuItem value={"John"}>John</MenuItem>
                                <MenuItem value={"James"}>James</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "auto" }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            {clickedModelIndex.map((image, index) => (
              <div key={image.label}>
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                    "&:hover": {
                      transform: "scale(2)",
                      transition: "transform 0.5s ease-in-out",
                    },
                  }}
                  src={image}
                  alt={image.label}
                />
              </div>
            ))}
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
