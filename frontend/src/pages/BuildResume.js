import React, { useRef, useEffect } from "react";
import { TextField, Container, Grid, useMediaQuery, Drawer, MenuItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ResumeAccordion from "../components/ResumeAccordion";
import { FloatingAIButton, FloatingDownloadButton, FloatingSaveButton } from "../components/FloatingDownloadButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Backdrop from "../components/Backdrop";
import {
  addResume,
  setLoading,
  fetchResumeById,
  improveResumeWithGPT,
  updateResume,
  updateResumeName,
  setTemplate,
} from "../reducers/resumeBuilderSlice";
import { resumeTemplates } from "../constants/resumeBuilder";
import { resumeTemplateComponentMap } from "../components/ResumeTemplates/index";
import AINotification from "../components/Notification";

const ResumeBuilder = () => {
  const { id: resumeId } = useParams();
  const isCreateMode = resumeId === "new";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedResume = useSelector((state) => state.resumeBuilder.selectedResume);
  const loading = useSelector((state) => state.resumeBuilder.loading);
  const ref = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const resumeName = useSelector((state) => state.resumeBuilder.selectedResume.name);
  const template = useSelector((state) => state.resumeBuilder.selectedResume.template);

  const handleDownload = async () => {
    try {
      dispatch(setLoading(true));
      const input = ref.current;
      const canvas = await html2canvas(input, { scale: 0.95 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(selectedResume.name);
      dispatch(setLoading(false));
    } catch (error) {
      // Handle error
      console.error("Error generating PDF:", error);
    }
  };

  useEffect(() => {
    const fetchById = async () => {
      await dispatch(fetchResumeById(resumeId));
    };
    fetchById();
  }, [resumeId, dispatch]);

  const handleSave = async () => {
    try {
      dispatch(setLoading(true));
      const input = ref.current;
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");

      if (isCreateMode) {
        await dispatch(addResume({ ...selectedResume, imgData })); // Implement addJob logic in your jobSlice
      } else {
        await dispatch(updateResume({ ...selectedResume, imgData }));
      }
      // If the dispatch is successful, navigate to the "/home" route
      navigate("/home/resume");
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      // If the dispatch fails, handle the error appropriately
      console.error("Failed to save resume:", error);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleResumeNameChange = async (e) => {
    await dispatch(updateResumeName(e.target.value));
  };

  const handleTemplateChange = (e) => {
    dispatch(setTemplate(e.target.value));
  };

  const handleAIButtonClick = async (e) => {
    await dispatch(improveResumeWithGPT(selectedResume));
  };

  const resumeNameAndTemplateInput = (
    <>
      {" "}
      <TextField
        label="Resume"
        name="resumeName"
        fullWidth
        size="small"
        value={resumeName}
        onChange={handleResumeNameChange}
        margin="normal"
        disabled={loading}
      />
      <TextField
        select
        label="Template"
        name="template"
        fullWidth
        size="small"
        value={template}
        onChange={handleTemplateChange}
        margin="normal"
        disabled={loading}
      >
        {Object.values(resumeTemplates).map((templateName) => (
          <MenuItem key={templateName} value={templateName}>
            {templateName}
          </MenuItem>
        ))}
      </TextField>
    </>
  );

  // case when invalid id is present in the url
  if (!selectedResume._id && !isCreateMode) return null;

  const ResumePreviewComponent = resumeTemplateComponentMap[template];

  return (
    <Container style={{ position: "relative" }}>
      {!isMobile ? resumeNameAndTemplateInput : null}
      <Grid container spacing={3}>
        {isMobile ? (
          <>
            <Grid paddingLeft={3} container alignItems="center">
              <MenuIcon fontSize="medium" onClick={toggleDrawer} />
              {resumeNameAndTemplateInput}
            </Grid>
            <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
              <ResumeAccordion />

              <Grid padding={3} container justifyContent="flex-end">
                <ArrowBackIcon fontSize="medium" onClick={toggleDrawer} />
              </Grid>
            </Drawer>

            <ResumePreviewComponent ref={ref} />
          </>
        ) : (
          <>
            <ResumeAccordion />
            <ResumePreviewComponent ref={ref} />
          </>
        )}
      </Grid>
      {loading ? <Backdrop open={true} /> : null}
      <FloatingAIButton handleClick={handleAIButtonClick} disabled={loading} />
      <FloatingSaveButton handleClick={handleSave} disabled={loading} />
      <FloatingDownloadButton handleClick={handleDownload} disabled={loading} />
      <AINotification />
    </Container>
  );
};

export default ResumeBuilder;
