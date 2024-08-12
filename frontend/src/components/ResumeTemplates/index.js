import InternshipResumePreview from "./Internship";
import EntryLevelResumePreview from "./EntryLevel";
import { resumeTemplates } from "../../constants/resumeBuilder";

export const resumeTemplateComponentMap = {
  [resumeTemplates.internship]: InternshipResumePreview,
  [resumeTemplates.entryLevel]: EntryLevelResumePreview,
};
