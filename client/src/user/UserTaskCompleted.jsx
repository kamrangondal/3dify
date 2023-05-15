import React, { useEffect, useState } from "react";
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
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { saveAs } from "file-saver";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// state ka issue ha , kal a k krna ha

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function UserTaskCompleted() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [descriptions, setDescriptions] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
  const [openSlider, setOpenSlider] = React.useState(false);
  const [sliderModelIndex, setSliderModelIndex] = React.useState(100);
  const [notSatifiedComments, setNotSatifiedComments] = React.useState("");
  const [notSatifiedCommentsModal, setNotSatifiedCommentsModal] =
    React.useState(false);
  const [modelData, setModelData] = React.useState([]);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [objectID, setObjectID] = React.useState("");
  const [iframeHeight, setIframeHeight] = React.useState("");
  const [iframeWidth, setIframeWidth] = React.useState("");
  const [iframeModal, setIframeModal] = React.useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleOpenCommentsModal = () => setNotSatifiedCommentsModal(true);
  const handleCloseCommentsModal = () => setNotSatifiedCommentsModal(false);

  const handleOpenIframeModal = () => setIframeModal(true);
  const handleCloseIframeModal = () => setIframeModal(false);

  const updateStatus = (productId, status2) => {
    axios
      .put(`http://localhost:4000/status/${productId}`, { status2 })
      .then((response) => {
        console.log(response.data);
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
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Error updating developer for product");
      });
  };

  const handleChangeStatus = async (gg, index) => {
    const productId = descriptions[index]._id;
    const status2 = gg;

    console.log("Index------->", index);
    console.log("productId------->", productId);
    console.log("status2------->", status2);

    try {
      setOpen(true);
      updateStatus(productId, status2);
      setOpen(false);
      console.log("status---update----");
    } catch (error) {
      console.error(error);
    }
  };

  const updateComments = (productId, comment) => {
    axios
      .put(`http://localhost:4000/comment/${productId}`, { comment })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Error updating comments for product");
      });
  };

  const handleNotSatisfied = () => {
    const productId = descriptions[sliderModelIndex]._id;
    const comment = notSatifiedComments;

    console.log("productId------->", productId);
    console.log("comments------->", comment);

    try {
      setOpen(true);
      updateComments(productId, comment);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (file) => {
    setClickedImageIndex(file);
  };

  const handleClickOpenSlider = () => {
    setOpenSlider(true);
  };

  const handleCloseSlider = () => {
    setOpenSlider(false);
    // window.location.reload();
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

  const satisfaction = (index) => {
    if (status[index] === "done") {
      return (
        <Item
          sx={{
            cursor: "pointer",
            bgcolor: "#ffe500",
            "&:hover": {
              bgcolor: "#dbc500",
              transform: "scale(0.95)",
              transition: "transform 0.3s",
              boxShadow: "0 0 24px #ffe500",
            },
          }}
        >
          Select{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>Satisfy</span> or{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>Not Satisfy</span>{" "}
          inside view 3D model button.
        </Item>
      );
    } else if (status[index] === "donebut") {
      return (
        <Item
          sx={{
            cursor: "pointer",
            bgcolor: "#ff7f7f",
            "&:hover": {
              bgcolor: "#e50000",
              transform: "scale(0.95)",
              transition: "transform 0.3s",
              boxShadow: "0 0 24px #ff7f7f",
            },
          }}
        >
          Not Satisfied, Sent for Revision
        </Item>
      );
    } else if (status[index] === "donedone") {
      return (
        <Item
          sx={{
            cursor: "pointer",
            bgcolor: "#4cff00",
            "&:hover": {
              bgcolor: "#38bc00",
              transform: "scale(0.95)",
              transition: "transform 0.3s",
              boxShadow: "0 0 24px #4cff00",
            },
          }}
        >
          Satisfied... Thank You
        </Item>
      );
    } else if (status[index] === "donefromrevision") {
      return (
        <Item
          sx={{
            cursor: "pointer",
            bgcolor: "#ff9400",
            "&:hover": {
              bgcolor: "#d67900",
              transform: "scale(0.95)",
              transition: "transform 0.3s",
              boxShadow: "0 0 24px #ff9400",
            },
          }}
        >
          Came Back from Revision... Have a look!
        </Item>
      );
    }
  };

  const DownloadModel = async (index) => {
    const id = descriptions[index]._id;
    setObjectID(id);
    console.log(id);
    setOpen(true);
    axios
      .get(`http://localhost:4000/model/${id}`)
      .then((response) => {
        console.log(response.data);
        const id2 = response.data.fileId;
        console.log(id2);

        try {
          console.log("DownloadModel");
          const gh = id2;
          axios
            .get(`http://localhost:4000/fileDownload/${gh}`, {
              responseType: "blob", // Set the response type to 'blob' to receive the file data
            })
            .then((response) => {
              const modelBlob = response.data;
              const modelURL = URL.createObjectURL(modelBlob);
              setModelData(modelURL);
              setOpen(false);
              handleClickOpenSlider();
            })
            .catch((error) => {
              console.error(error);
              alert("Error downloading models");
              setGhq(-2);
              setOpen(false);
            });
        } catch (error) {
          console.log("Error downloading file");
          alert("No model found for this product");
          setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [ghq, setGhq] = useState(-1);

  const View3DModel = (index) => {
    if (ghq !== index) {
      DownloadModel(index);
      console.log("Inside,,,,");
      setGhq(index);
    } else {
      handleClickOpenSlider();
    }
  };

  const DownloadUserRequestedModel = () => {
    setOpen(true);
    saveAs(modelData, "model_file.glb");
    setOpen(false);
  };

  return (
    <>
      <UserNavbar user={"USER"} />
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
                COMPLETED TASKS
              </span>
              . Please have a look and click satisfied or unsatisfied button. If
              unsatisfied, then give comments for improvement.
            </strong>

            {descriptions.map(
              (description, index) =>
                (status[index] === "done" ||
                  status[index] === "donedone" ||
                  status[index] === "donebut" ||
                  status[index] === "donefromrevision") && (
                  <Grid container key={description._id} xs={12}>
                    <Grid xs={5}>
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
                    <Grid xs={2}>
                      <Item
                        sx={{
                          cursor: "pointer",
                          bgcolor: "#01203A",
                          color: "white",
                          "&:hover": {
                            transform: "scale(0.95)",
                            transition: "transform 0.3s",
                            boxShadow: "0 0 24px #01203A",
                          },
                        }}
                        onClick={() => {
                          setSliderModelIndex(index);

                          View3DModel(index);
                        }}
                      >
                        View 3D Model
                      </Item>
                    </Grid>
                    <Grid xs={2}>{satisfaction(index)}</Grid>
                    <Grid xs={12}>
                      <Divider>Completed Task {index + 1} Above</Divider>
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

      <Dialog
        fullScreen
        open={openSlider}
        onClose={handleCloseSlider}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: "#01203A" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenSlider(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Viewing 3D Model
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                handleOpenIframeModal();
              }}
              sx={{
                "&:hover": {
                  bgcolor: "#00558D",
                  fontWeight: "bold",
                },
              }}
            >
              Copy Iframe
            </Button>

            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                const url = `http://localhost:3000/user/iframe/${objectID}`;
                window.open(url, "_blank");
              }}
              sx={{
                "&:hover": {
                  bgcolor: "#00558D",
                  fontWeight: "bold",
                },
              }}
            >
              Open Model in new tab
            </Button>

            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                DownloadUserRequestedModel();
              }}
              sx={{
                "&:hover": {
                  bgcolor: "#00558D",
                  fontWeight: "bold",
                },
              }}
            >
              Download Model
            </Button>

            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                handleChangeStatus("donedone", sliderModelIndex);
                handleCloseSlider();
              }}
              sx={{
                "&:hover": {
                  bgcolor: "#00558D",
                  color: "green",
                  fontWeight: "bold",
                },
              }}
            >
              Satisfied
            </Button>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                handleOpenCommentsModal();
                handleChangeStatus("donebut", sliderModelIndex);
              }}
              sx={{
                "&:hover": {
                  bgcolor: "#00558D",
                  color: "red",
                  fontWeight: "bold",
                },
              }}
            >
              Not Satisfied
            </Button>
          </Toolbar>
        </AppBar>
        <model-viewer
          alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
          src={modelData}
          ar
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
          style={{ width: "100%", height: "100%" }}
        ></model-viewer>
      </Dialog>

      <Modal
        open={notSatifiedCommentsModal}
        onClose={handleCloseCommentsModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "auto" }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="div">
                Please give your comments for improvement
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Comments"
                multiline
                rows={4}
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={(e) => setNotSatifiedComments(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  handleNotSatisfied();
                  handleCloseCommentsModal();
                  handleCloseSlider();
                }}
                sx={{
                  "&:hover": {
                    bgcolor: "#00558D",
                    color: "red",
                    fontWeight: "bold",
                  },
                }}
                disabled={notSatifiedComments === ""}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={iframeModal}
        onClose={handleCloseIframeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "auto" }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h6" component="div">
                Enter the Height of the IFrame
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(e) => setIframeHeight(e.target.value)}
                id="outlined-multiline-static"
                label="IFrame Height"
                multiline
                rows={1}
                defaultValue=""
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" component="div">
                Enter the Width of the IFrame
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(e) => setIframeWidth(e.target.value)}
                id="outlined-multiline-static"
                label="IFrame Height"
                multiline
                rows={1}
                defaultValue=""
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  const iframeCode = `<iframe src='http://localhost:3000/user/iframe/${objectID}' width="${iframeWidth}" height="${iframeHeight}"></iframe>`;
                  navigator.clipboard
                    .writeText(iframeCode)
                    .then(() => {
                      console.log("Text copied to clipboard");
                      setOpenSnack(true);
                    })
                    .catch((error) => {
                      console.error("Failed to copy text: ", error);
                    });
                  setIframeModal(false);
                }}
                sx={{
                  "&:hover": {
                    bgcolor: "#00558D",
                    color: "black",
                    fontWeight: "bold",
                  },
                }}
                disabled={iframeHeight === "" || iframeWidth === ""}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          Link has been copied!
        </Alert>
      </Snackbar>
    </>
  );
}
