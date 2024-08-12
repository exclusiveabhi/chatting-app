// src/components/SkeletonCards.js
import React from "react";
import { Card, CardContent, CardActions, IconButton, Typography, Box, Skeleton } from "@mui/material";

const SkeletonResumeCard = () => {
  return (
    <Card style={{ marginTop: 16, maxWidth: 320 }}>
      <CardContent>
        <Typography variant="h6" component="div" align="left">
          <Skeleton animation="wave" width="80%" />
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          <Skeleton animation="wave" width="40%" />
        </Typography>
        <Skeleton variant="rectangular" animation="wave" width="40%" height={100} style={{ borderRadius: 8 }} />
        {/* Visibility Label (Optional) */}
      </CardContent>
      <CardActions>
        <Box ml="auto">
          <IconButton aria-label="view" size="small" disabled>
            <Skeleton variant="circular" animation="wave" width={24} height={24} />
          </IconButton>
          <IconButton aria-label="edit" size="small" disabled>
            <Skeleton variant="circular" animation="wave" width={24} height={24} />
          </IconButton>
          <IconButton aria-label="delete" size="small" disabled>
            <Skeleton variant="circular" animation="wave" width={24} height={24} />
          </IconButton>
          <IconButton aria-label="share" size="small" disabled>
            <Skeleton variant="circular" animation="wave" width={24} height={24} />
          </IconButton>
          <IconButton aria-label="duplicate" size="small" disabled>
            <Skeleton variant="circular" animation="wave" width={24} height={24} />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};
const SkeletonCards = ({ count }) => {
  return (
    <>
      <SkeletonResumeCard key={1} />
      <SkeletonResumeCard key={2} />
    </>
  );
};

export default SkeletonCards;
