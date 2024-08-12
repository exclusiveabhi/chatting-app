// src/components/JobsScreen.js
import addJobOpeningImage from "../assets/add-job.svg";
import JobOpeningTable from "./JobTable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../reducers/jobSlice";
import SkeletonTable from "./SkeletonTable";

const JobsScreen = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const loading = useSelector((state) => state.jobs.loading);

  useEffect(() => {
    // Fetch jobs when the component mounts
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <SkeletonTable />
      ) : jobs.length > 0 ? (
        <JobOpeningTable jobOpeningList={jobs} />
      ) : (
        <img
          src={addJobOpeningImage}
          alt="No job openings available"
          style={{ width: "50%", height: "auto", marginTop: "24px" }}
        />
      )}
    </>
  );
};

export default JobsScreen;
