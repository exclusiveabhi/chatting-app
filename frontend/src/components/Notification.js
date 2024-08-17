import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { hasSeenAINotification } from "../constants/resumeBuilder";

export default function AINotification() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenNotification = localStorage.getItem(hasSeenAINotification);
    if (!hasSeenNotification) {
      setOpen(true);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    localStorage.setItem(hasSeenAINotification, "true");
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar open={open} onClose={handleClose} message="Use our AI to make your resume standout!" action={action} />
  );
}
