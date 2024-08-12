import { Fab } from "@mui/material";
import { Download } from "@mui/icons-material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";

export const FloatingAIButton = ({ handleClick, disabled }) => {
  return (
    <Tooltip title="Improve your resume with our AI" placement="top">
      <Fab
        disabled={disabled}
        onClick={handleClick}
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "48px",
          right: "184px",
          zIndex: 1000, // Adjust the z-index as needed
        }}
      >
        <AutoFixHighIcon />
      </Fab>
    </Tooltip>
  );
};
export const FloatingDownloadButton = ({ handleClick, disabled }) => {
  return (
    <Fab
      disabled={disabled}
      onClick={handleClick}
      color="primary"
      aria-label="add"
      style={{
        position: "fixed",
        bottom: "48px",
        right: "16px",
        zIndex: 1000, // Adjust the z-index as needed
      }}
    >
      <Download />
    </Fab>
  );
};
export const FloatingSaveButton = ({ handleClick, disabled }) => {
  return (
    <Fab
      disabled={disabled}
      onClick={handleClick}
      color="primary"
      aria-label="add"
      style={{
        position: "fixed",
        bottom: "48px",
        right: "100px",
        zIndex: 1000, // Adjust the z-index as needed
      }}
    >
      <SaveIcon />
    </Fab>
  );
};
