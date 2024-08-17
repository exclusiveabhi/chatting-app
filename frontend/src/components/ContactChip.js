import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function AbsolutePositionedChip() {
  const chipContainerStyle = {
    position: "fixed",
    bottom: "12px",
    left: "16px",
    zIndex: 500,
    cursor: "pointer",
  };

  return (
    <div style={chipContainerStyle}>
      <Stack direction="row" spacing={1}>
        <Chip
          avatar={<Avatar alt="Natacha" src="https://i.ibb.co/1rwYrys/profile-Pic.jpg" />}
          label="By Abhishek"
          href="https://github.com/exclusiveabhi"
          component="a"
          variant="filled"
          //   color="primary"
        />
      </Stack>
    </div>
  );
}
