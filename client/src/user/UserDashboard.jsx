import React, { useState } from "react";
import UserNavbar from "../components/UserNavbar";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DropzoneWrapper = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px dashed #bdbdbd",
  borderRadius: "4px",
  padding: "2rem",
  minHeight: "150px",
});

const UploadButton = styled(Button)({
  marginTop: "1rem",
});

const Dropzone = ({ setSelectedFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...acceptedFiles,
      ]);
    },
  });

  return (
    <DropzoneWrapper {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        Drag and drop images here or click to select. Be advised combined size
        of all images should not exceed <strong>15 MB</strong>
      </p>
    </DropzoneWrapper>
  );
};

const getBase64 = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => {
      console.error(error);
    };
  });

export default function UserDashboard() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilesDelete = () => {
    setSelectedFiles([]);
  };

  const handleFilesUpload = async () => {
    const base64Images = [];

    await Promise.all(
      selectedFiles.map((file) =>
        getBase64(file).then((base64) => base64Images.push(base64))
      )
    );

    const data = {
      products: base64Images,
      description: description,
    };

    const MAX_SIZE = 50 * 1024 * 1024; // 50 MB in bytes

    const totalSize = base64Images.reduce(
      (size, image) => size + image.length,
      0
    );

    if (totalSize > MAX_SIZE) {
      alert("Total size of images exceeds 50 MB");
      //toast.error('Total size of images exceeds 50 MB');
      setSelectedFiles([]);
      handleClose();
      return;
    }

    axios
      .post("http://localhost:4000/upload", data)
      .then((response) => {
        // Handle success response
        console.log(response.data.message);
        handleClose();
        setSelectedFiles([]);
        setOpenSnack(true);
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
      });

    console.log("---------->>>>>", base64Images);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
          <Grid xs={9}>
            <Item elevation={0}>
              <div>
                <UploadButton
                  sx={{
                    marginRight: "1rem",
                    bgcolor: "#01203A",
                    "&:hover": { bgcolor: "#00558D" },
                  }}
                  variant="contained"
                  color="primary"
                  component="label"
                >
                  Select files
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={(event) =>
                      setSelectedFiles(Array.from(event.target.files))
                    }
                  />
                </UploadButton>
                {selectedFiles.length > 0 && (
                  <Button
                    sx={{ marginRight: "1rem" }}
                    variant="outlined"
                    onClick={handleFilesDelete}
                  >
                    Delete all files
                  </Button>
                )}
                <UploadButton
                  sx={{ bgcolor: "#01203A", "&:hover": { bgcolor: "#00558D" } }}
                  variant="contained"
                  color="primary"
                  //onClick={handleFilesUpload}
                  onClick={handleClickOpen}
                  disabled={selectedFiles.length === 0}
                >
                  Enter Details & Upload
                </UploadButton>
              </div>
              <br />
              {selectedFiles.length > 0 ? (
                <Grid container spacing={2}>
                  {selectedFiles.map((file) => (
                    <Grid
                      item
                      xs={12 / Math.min(selectedFiles.length, 4)}
                      key={file.name}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded file ${file.name} preview`}
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Dropzone setSelectedFiles={setSelectedFiles} />
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to understand your desired task, please provide us with
            complete details. Don't worry, we'll be in touch with you soon.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            id="outlined-multiline-static"
            label="Write here"
            multiline
            rows={4}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFilesUpload}>Confirm Upload</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          Data has been Uploaded!
        </Alert>
      </Snackbar>
    </>
  );
}
