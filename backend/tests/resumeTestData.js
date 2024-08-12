const initialBasicDetails = {
  name: "Madhav Sharma",
  profilePicture: "https://dummy-image.png",
  currentJobTitle: "Software Engineer",
  email: "madhav.sharma@imagine.com",
  website: "https://hi-madhav.com",
  phoneNumber: "+91 123-456-7890",
  location: "Delhi, India",
};

const initialEducationList = [
  {
    institute: "Delhi Technological University",
    degree: "B. Tech",
    startDate: "05/2018",
    endDate: "04/2022",
    grade: "9.7/10",
  },
  {
    institute: "Delhi Public Schoool",
    degree: "Senior Secondary",
    startDate: "05/2016",
    endDate: "02/2028",
    grade: "95.6%",
  },
];

const initialLanguages = ["C++", "Python", "JavaScript", "Java"];
const initialFrameworks = ["Django", "React.js"];
const initialtools = ["Git", "Jenkins", "Docker", "Kubernetes"];

const initialAwardList = [
  {
    name: "Winner CodeMaster",
    year: "2022",
    shortDescription: "College hackathon (100+ participants)",
  },
  {
    name: "Winner KineticTech",
    year: "2021",
    shortDescription: "IOT hackathon (150+ participants)",
  },
  {
    name: "Winner ReactDevSaga",
    year: "2021",
    shortDescription: "React hackathon (500+ participants)",
  },
];

const initialExperienceList = [
  {
    organisation: "Hexagon Analytics",
    title: "SDE I",
    startDate: "06/2023",
    endDate: "Present",
    description: `Did some stuff for the company's main product that kinda helped some wealthy folks buy licenses together, and it made some money in the first quarter of 2021. 
    
    Also made a bunch of software programs by looking at what users wanted. Oh, and made some API thing with Flask/Python and SQLAlchemy that let a bunch of developers get data without showing passwords. Also made some applets for a Resume Search Engine that shows information to users on the search results page.`,
  },
  {
    organisation: "Growth Era Technologies",
    title: "SDE I",
    startDate: "05/2022",
    endDate: "06/2026",
    description: `Encouraged some development and testing during the SDLC with about 20 team members from different areas. Helped with setting up Cold Fusion, NetWare® Workstation Client-Server Edition (WSCSE), and a bunch of other database stuff. Had some discussions with management and project teams to plan QA according to project timelines and business goals. Found a problem with a mobile app used by over 90 banks, saved them from losing $850K, got promoted early by management.`,
  },
];

const initialResumeName = "My resume";

const initialProjectList = [
  {
    name: "E-commerce Platform",
    startDate: "2022-01-15",
    endDate: "2022-03-10",
    description:
      "Led the development of a comprehensive e-commerce platform that revolutionized online retail. Implemented advanced features, including a dynamic product catalog, user-friendly shopping cart, and secure payment gateways.",
    link: "https://example.com/ecommerce",
  },
  {
    name: "E-commerce Platform",
    startDate: "2022-01-15",
    endDate: "2022-03-10",
    description:
      "Led the development of a comprehensive e-commerce platform that revolutionized online retail. Implemented advanced features, including a dynamic product catalog, user-friendly shopping cart, and secure payment gateways.",
    link: "https://example.com/ecommerce",
  },
];

const resumeTemplates = {
  internship: "Internship",
  entryLevel: "Entry Level (0-2 years of Experience)",
};
const visibilityTypes = {
  private: "private",
  public: "public",
};

export const resumeTestData = {
  name: initialResumeName,
  imgData: "data:longstring",
  template: resumeTemplates.entryLevel,
  visibility: visibilityTypes.private,
  basicDetails: initialBasicDetails,
  educationList: initialEducationList,
  languages: initialLanguages,
  tools: initialtools,
  frameworks: initialFrameworks,
  awardList: initialAwardList,
  experienceList: initialExperienceList,
  projectList: initialProjectList,
};
