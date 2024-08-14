import React, { useRef, useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { PDFDocument } from "pdf-lib";
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
      const canvas = await html2canvas(input, {
        scale: 50, // Higher scale for better quality
        useCORS: true, // Ensure cross-origin resources are used correctly
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([canvas.width, canvas.height]);
      const pngImage = await pdfDoc.embedPng(imgData);

      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedResume.name}.pdf`; // Include .pdf extension
      link.click();
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
