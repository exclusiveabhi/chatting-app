// src/components/SkeletonTable.js
import React from "react";
import { Skeleton } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const SkeletonTable = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Organisation</TableCell>
          <TableCell>Designation</TableCell>
          <TableCell>Last Modified</TableCell>
          <TableCell>Last Date</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Manage</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            {[...Array(7)].map((_, cellIndex) => (
              <TableCell key={cellIndex}>
                <Skeleton variant="text" width={80} height={12} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkeletonTable;
