import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { IVideo } from "../../../interface/interface";
import { Button } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  height: "70%",
};

const videoStyle = {
  maxHeight: "100%",
  maxWidth: "100%",
};

export default function BasicModal({ video, open, setOpen }: any) {
  const handleClose = () => setOpen(false);

  const renderVideoDetails = (video: IVideo) => {
    return (
      <>
        {Object.entries(video).map(([key, value]) => (
          <div key={key}>
            <Typography variant="subtitle1" component="span">
              {key}:
            </Typography>{" "}
            {Array.isArray(value) ? value.join(", ") : value}
          </div>
        ))}
      </>
    );
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div style={{ overflow: "hidden" }}>
                <video controls style={videoStyle}>
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box p={2}>
                <Typography variant="h6" component="h2">
                  {video.title}
                </Typography>
                {renderVideoDetails(video)}
              </Box>
            </Grid>
          </Grid>
          <Button onClick={handleClose} variant="contained">
            Close video
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
