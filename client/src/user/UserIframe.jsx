import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Backdrop } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function ModelViewer({ modelData }) {
  return (
    <>
      {console.log(modelData)}
      <model-viewer
        alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
        src={modelData}
        ar
        shadow-intensity="1"
        camera-controls
        touch-action="pan-y"
        style={{ width: "100%", height: "100%" }}
      ></model-viewer>
    </>
  );
}

export default function UserIframe() {
  const { id } = useParams();
  const [open, setOpen] = React.useState(true);
  const [modelData, setModelData] = React.useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/model/${id}`)
      .then((response) => {
        console.log(response.data);
        const id2 = response.data.fileId;
        console.log(id2);

        try {
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
            })
            .catch((error) => {
              console.error(error);
              alert("Error downloading models");
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
  }, [id]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ height: "100vh", width: "100wh" }}>
        {modelData && <ModelViewer modelData={modelData} />}
      </div>
    </>
  );
}
