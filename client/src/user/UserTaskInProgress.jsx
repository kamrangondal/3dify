import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UserTaskInProgress() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [descriptions, setDescriptions] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
  const [comment, setComment] = useState([]);
  const [commentModalIndex, setCommentModalIndex] = useState(0);

  const [openCommentModal, setOpenCommentModal] = React.useState(false);
  const handleOpenCommentModal = () => setOpenCommentModal(true);
  const handleCloseCommentModal = () => setOpenCommentModal(false);

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
        setComment(response.data.comment);

        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
        setOpen(false);
      });
  }, []);

  const StatusCheck = (index) => {
    if (status[index] === "in-progress") {
      return (
        <Item
          sx={{
            cursor: "pointer",
            background:
              "linear-gradient(90deg, rgba(209,209,0,1) 0%, rgba(93,201,37,1) 32%, rgba(255,248,0,1) 100%)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            color: "black",
            "&:hover": {
              transform: "scale(0.95)",
              transition: "transform 0.3s",
              boxShadow: "0 0 24px #01203A",
              animation: "gradient 3s ease infinite",
            },
          }}
        >
          Current Status: In-Progress.
        </Item>
      );
    } else if (status[index] === "donebut") {
      return (
        <Item
          sx={{
            cursor: "pointer",

            background:
              "linear-gradient(90deg, rgba(1,32,58,1) 0%, rgba(255,0,0,1) 54%, rgba(0,85,141,1) 100%)",
            backgroundSize: "400% 400%",
            color: "white",
            animation: "gradient 15s ease infinite",
            "&:hover": {
              transform: "scale(0.95)",
              transition: "transform 0.3s",
              boxShadow: "0 0 24px #01203A",
              animation: "gradient 3s ease infinite",
            },
          }}
          onClick={() => {
            handleOpenCommentModal();
            setCommentModalIndex(index);
          }}
        >
          Current Status: Sent for Revision. Click to see your comments
        </Item>
      );
    }
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
              Following Tasks are{" "}
              <span style={{ color: "Red", textDecoration: "underline" }}>
                IN-PROGRESS
              </span>{" "}
              and soon will be completed. Once completed, they will be moved to
              the Completed tab.
            </strong>

            {descriptions.map(
              (description, index) =>
                (status[index] === "in-progress" ||
                  status[index] === "donebut") && (
                  <Grid container key={description._id} xs={12}>
                    <Grid xs={6}>
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

                    <Grid xs={3}>
                      <Item key={`description-${index}`}>
                        {description.description}
                      </Item>
                    </Grid>
                    <Grid xs={3}>{StatusCheck(index)}</Grid>
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

      <Modal
        open={openCommentModal}
        onClose={handleCloseCommentModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "auto" }}
      >
        <Box sx={style}>
          <h1>Comments</h1>
          <Divider />
          <Stack spacing={2}>
            <Item>{comment[commentModalIndex]}</Item>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
