import React, { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
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

export default function UserTaskSubmitted() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [descriptions, setDescriptions] = React.useState([]);
  const [status, setStatus] = React.useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);

  const handleImageClick = (file) => {
    setClickedImageIndex(file);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        console.log(response.data);
        console.log("----------------->", response.data.descriptions);
        setDescriptions(response.data.descriptions);
        setSelectedFiles(response.data.products);
        setStatus(response.data.status);

        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
        setOpen(false);
      });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleDelete = (index) => {
    const id = descriptions[index]._id;
    axios
      .delete(`http://localhost:4000/products/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setDescriptions((prevDescriptions) => {
      const newDescriptions = [...prevDescriptions];
      newDescriptions.splice(index, 1);
      return newDescriptions;
    });

    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = [...prevSelectedFiles];
      newSelectedFiles.splice(index, 1);
      return newSelectedFiles;
    });
  };

  return (
    <>
      <UserNavbar user="USER" />
      <Box sx={{ flexGrow: 1, margin: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <Stack spacing={2}>
              <Item
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#01203A", color: "white" },
                }}
                onClick={() => navigate("/user/dashboard")}
              >
                Add new Task
              </Item>
              <Item
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#01203A", color: "white" },
                }}
                onClick={() => navigate("/user/tasks")}
              >
                Submitted Tasks
              </Item>
              <Item
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#01203A", color: "white" },
                }}
                onClick={() => navigate("/user/tasksinprogress")}
              >
                Tasks In-Progress
              </Item>
              <Item
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#01203A", color: "white" },
                }}
                onClick={() => navigate("/user/taskscompleted")}
              >
                  Completed Tasks
              </Item>
            </Stack>
          </Grid>
          <Grid container xs={9} sx={{ height: "85vh", overflow: "auto" }}>
            <strong>
              Once Tasks are reviewed by Admin and assigned to work. They are
              moved to the Task in-progress tab and can't be deleted afterwards.
            </strong>
            {descriptions.map(
              (description, index) =>
                status[index] === "submitted" && (
                  <Grid container key={description._id} xs={12}>
                    <Grid xs={7}>
                      <Grid container spacing={2}>
                        {selectedFiles[index].map((file, index) => (
                          <Grid
                            item
                            xs={12 / Math.min(selectedFiles.length, 4)}
                            key={`image-${index}`}
                            style={{ maxHeight: "150px", maxWidth: "150px" }}
                            sx={{
                              "&:hover": {
                                transform: "scale(1.2)",
                                transition: "transform 0.3s",
                                cursor: "pointer",
                              },
                            }}
                            onClick={() => {
                              handleImageClick(file);
                              handleOpenModal();
                            }}
                          >
                            <img
                              src={file}
                              alt={`Uploaded file ${index + 1} preview`}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    <Grid xs={4}>
                      <Item key={`description-${index}`}>
                        {description.description}
                      </Item>
                    </Grid>
                    <Grid xs={1}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#ff5656",
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#e20404" },
                        }}
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </Grid>
                    <Grid xs={12}>
                      <Divider>Task {index + 1} Above</Divider>
                    </Grid>
                  </Grid>
                )
            )}
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
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "auto" }}
      >
        <Box sx={style}>
          <img
            src={clickedImageIndex}
            alt="gg"
            style={{ maxHeight: "70vh", maxWidth: "70vw" }}
          />
        </Box>
      </Modal>
    </>
  );
}
