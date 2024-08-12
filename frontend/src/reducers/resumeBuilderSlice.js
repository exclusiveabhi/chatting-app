// reducers/resumeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { initialEducationDetails, initialExperience, initialResumeState } from "../constants/resumeBuilder";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Async Thunks
export const fetchAllResumes = createAsyncThunk("resume/fetchAllResumes", async () => {
  const response = await api.get("resumes");
  return response.data;
});

export const improveResumeWithGPT = createAsyncThunk("resume/improveWithGPT", async (resume) => {
  const { projectList, experienceList } = resume;
  const response = await api.post("/resumes/improve", { projectList, experienceList });
  return response.data;
});

export const fetchResumeById = createAsyncThunk("resume/fetchResume", async (id) => {
  if (id === "new") return initialResumeState;
  const response = await api.get(`/resumes/${id}`);

  // this way we keep the defaults of fields as well
  // like experienceDetails key, which should be in state but not in db
  return { ...initialResumeState, ...response.data };
});

export const updateResume = createAsyncThunk("resume/updateResume", async (resume) => {
  const response = await api.patch(`/resumes/${resume._id}`, resume);
  return response.data;
});

export const deleteResume = createAsyncThunk("resume/deleteResume", async (id) => {
  await api.delete(`/resumes/${id}`);
  return id;
});

export const addResume = createAsyncThunk("resume/addResume", async (resume) => {
  const response = await api.post("/resumes", resume);
  return response.data;
});

const resumeBuilderSlice = createSlice({
  name: "resumeBuilder",
  initialState: {
    resumes: [],
    selectedResume: { ...initialResumeState },
    loading: false,
  },
  reducers: {
    updateResumeName: (state, action) => {
      state.selectedResume.name = action.payload;
    },
    updateSelectedResume: (state, action) => {
      state.selectedResume = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setTemplate: (state, action) => {
      state.selectedResume.template = action.payload;
    },
    updateBasicDetails: (state, action) => {
      state.selectedResume.basicDetails = { ...state.selectedResume.basicDetails, ...action.payload };
    },
    updateEducationDetails: (state, action) => {
      state.selectedResume.educationDetails = { ...state.selectedResume.educationDetails, ...action.payload };
    },
    addEducation: (state) => {
      state.selectedResume.educationList = [
        ...state.selectedResume.educationList,
        state.selectedResume.educationDetails,
      ];
      state.selectedResume.educationDetails = initialEducationDetails;
    },
    deleteEducation: (state, action) => {
      state.selectedResume.educationList = state.selectedResume.educationList.filter((_, i) => i !== action.payload);
    },
    updateLanguage: (state, action) => {
      state.selectedResume.languages = action.payload;
    },
    updateTool: (state, action) => {
      state.selectedResume.tools = action.payload;
    },
    updateFramework: (state, action) => {
      state.selectedResume.frameworks = action.payload;
    },
    updateAwardDetails: (state, action) => {
      state.selectedResume.awardDetails = { ...state.selectedResume.awardDetails, ...action.payload };
    },
    addAward: (state) => {
      state.selectedResume.awardList = [...state.selectedResume.awardList, state.selectedResume.awardDetails];
      state.selectedResume.awardDetails = { name: "", year: "", shortDescription: "" };
    },
    deleteAward: (state, action) => {
      state.selectedResume.awardList = state.selectedResume.awardList.filter((_, i) => i !== action.payload);
    },
    updateExperienceDetails: (state, action) => {
      state.selectedResume.experienceDetails = {
        ...state.selectedResume.experienceDetails,
        ...action.payload,
      };
    },
    addExperience: (state) => {
      state.selectedResume.experienceList = [
        ...state.selectedResume.experienceList,
        state.selectedResume.experienceDetails,
      ];
      state.selectedResume.experienceDetails = initialExperience;
    },
    deleteExperience: (state, action) => {
      state.selectedResume.experienceList = state.selectedResume.experienceList.filter((_, i) => i !== action.payload);
    },
    updateProjectDetails: (state, action) => {
      state.selectedResume.projectDetails = { ...state.selectedResume.projectDetails, ...action.payload };
    },
    addProject: (state) => {
      state.selectedResume.projectList = [...state.selectedResume.projectList, state.selectedResume.projectDetails];
      state.selectedResume.projectDetails = {
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        link: "",
      };
    },
    deleteProject: (state, action) => {
      state.selectedResume.projectList = state.selectedResume.projectList.filter((_, i) => i !== action.payload);
    },
    updateVisibility: (state, action) => {
      const { id, visibility } = action.payload;
      state.resumes = state.resumes.map((resume) => (resume._id === id ? { ...resume, visibility } : resume));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllResumes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllResumes.fulfilled, (state, action) => {
        state.resumes = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllResumes.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.selectedResume = action.payload; // Assuming action.payload is the entire resume object
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.selectedResume = { ...state.selectedResume, ...action.payload }; // Assuming action.payload is the entire resume object
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        const deletedResumeId = action.payload;
        state.resumes = state.resumes.filter((resume) => resume._id !== deletedResumeId);
      })
      .addCase(addResume.fulfilled, (state, action) => {
        state.resumes = [...state.resumes, action.payload]; // Assuming action.payload is the entire resume object
      })
      .addCase(improveResumeWithGPT.pending, (state) => {
        state.loading = true;
      })
      .addCase(improveResumeWithGPT.fulfilled, (state, action) => {
        state.loading = false;
        const updatedState = { ...state.selectedResume, ...action.payload };
        state.selectedResume = updatedState;
      })
      .addCase(improveResumeWithGPT.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  updateResumeName,
  updateBasicDetails,
  updateEducationDetails,
  addEducation,
  deleteEducation,
  updateLanguage,
  updateTool,
  updateFramework,
  updateAwardDetails,
  addAward,
  deleteAward,
  updateExperienceDetails,
  addExperience,
  deleteExperience,
  updateProjectDetails,
  addProject,
  deleteProject,
  setLoading,
  setTemplate,
  updateSelectedResume,
  updateVisibility,
} = resumeBuilderSlice.actions;

export default resumeBuilderSlice.reducer;
