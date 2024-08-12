import React, { useRef, useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FloatingDownloadButton } from "../components/FloatingDownloadButton";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resumeTemplateComponentMap } from "../components/ResumeTemplates/index";
import api from "../api";
import NotFoundView from "../components/NotFound";
import { updateSelectedResume } from "../reducers/resumeBuilderSlice";

const ShareResume = () => {
  const { id: resumeId } = useParams();
  const dispatch = useDispatch();
  const selectedResume = useSelector((state) => state.resumeBuilder.selectedResume);
  const loading = useSelector((state) => state.resumeBuilder.loading);
  const [fetchError, setFetchError] = useState(false);
  const ref = useRef(null);
  const template = useSelector((state) => state.resumeBuilder.selectedResume.template);
  const ResumePreviewComponent = resumeTemplateComponentMap[template];

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(`/resumes/${resumeId}`);
        dispatch(updateSelectedResume(response.data));
        // Dispatch action to update state with fetched resume
      } catch (error) {
        console.error("Error fetching resume:", error);
        setFetchError(true);
      }
    };
    fetchResume();
  }, [resumeId, dispatch]);

  const handleDownload = async () => {
    try {
      const input = ref.current;
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(selectedResume.name);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Container>
      {fetchError ? (
        <NotFoundView />
      ) : (
        <>
          <Grid container justifyContent="center">
            <ResumePreviewComponent ref={ref} />
          </Grid>
          <FloatingDownloadButton handleClick={handleDownload} disabled={loading} />
        </>
      )}
    </Container>
  );
};

export default ShareResume;
