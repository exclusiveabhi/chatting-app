// src/components/JobsScreen.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import { deleteJob } from "../reducers/jobSlice";
import Label from "../components/MinimalMUILabel";

const JobOpeningTable = ({ jobOpeningList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("lastModified");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const theme = useTheme();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  if (jobOpeningList.length === 0) {
    return null;
  }

  const sortedJobOpeningList = jobOpeningList
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .sort((a, b) => {
      const isAsc = order === "asc";
      if (orderBy === "lastModified") {
        return isAsc ? a.lastModified - b.lastModified : b.lastModified - a.lastModified;
      }
      if (orderBy === "lastDate") {
        return isAsc ? a.lastDate - b.lastDate : b.lastDate - a.lastDate;
      }
      return 0;
    });

  const handleDeleteClick = (jobId) => {
    dispatch(deleteJob(jobId));
  };
  return (
    <div>
      <TableContainer component={Paper} style={{ marginTop: theme.spacing(2) }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Organisation</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "lastModified"}
                  direction={orderBy === "lastModified" ? order : "asc"}
                  onClick={createSortHandler("lastModified")}
                >
                  Last Modified
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "lastDate"}
                  direction={orderBy === "lastDate" ? order : "asc"}
                  onClick={createSortHandler("lastDate")}
                >
                  Last Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedJobOpeningList.map((job, index) => (
              <TableRow key={job._id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{job.organisation}</TableCell>
                <TableCell>{job.designation}</TableCell>
                <TableCell>{new Date(job.lastModified).toLocaleString()}</TableCell>
                <TableCell>{new Date(job.lastDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Label color={(job.status === "APPLIED" && "success") || "error"}>{job.status}</Label>
                </TableCell>
                <TableCell>
                  <Box>
                    <EditIcon
                      style={{ cursor: "pointer", marginRight: "8px" }}
                      onClick={() => navigate(`/job/${job._id}`)}
                    />
                    <DeleteIcon
                      style={{ cursor: "pointer", marginRight: "8px" }}
                      onClick={() => handleDeleteClick(job._id)}
                    />
                    <LaunchIcon style={{ cursor: "pointer" }} onClick={() => window.open(job.jobLink, "_blank")} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 16, 24]}
        component="div"
        count={jobOpeningList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default JobOpeningTable;
