export const dummyJobOpeningList = [
  {
    organisation: "Google",
    designation: "SDE 1",
    lastModified: new Date(2024, 8, 15), // April 15, 2024
    lastDate: new Date(2024, 9, 1), // May 1, 2024
    jobLink: "https://google.com",
    status: "APPLIED",
  },
  {
    organisation: "Microsoft",
    designation: "Software Engineer",
    lastModified: new Date(2024, 7, 20), // March 20, 2024
    lastDate: new Date(2024, 8, 15), // April 15, 2024
    jobLink: "https://microsoft.com",
    status: "PENDING",
  },
  {
    organisation: "Facebook",
    designation: "Frontend Developer",
    lastModified: new Date(2024, 6, 10), // February 10, 2024
    lastDate: new Date(2024, 7, 1), // March 1, 2024
    jobLink: "https://facebook.com",
    status: "APPLIED",
  },
  {
    organisation: "Amazon",
    designation: "Data Scientist",
    lastModified: new Date(2024, 5, 5), // May 5, 2024
    lastDate: new Date(2024, 8, 1), // June 1, 2024
    jobLink: "https://amazon.com",
    status: "PENDING",
  },
  {
    organisation: "Apple",
    designation: "iOS Developer",
    lastModified: new Date(2024, 0, 25), // January 25, 2024
    lastDate: new Date(2024, 1, 15), // February 15, 2024
    jobLink: "https://apple.com",
    status: "APPLIED",
  },
  {
    organisation: "Twitter",
    designation: "Software Engineer",
    lastModified: new Date(2024, 3, 8), // April 8, 2024
    lastDate: new Date(2024, 4, 1), // May 1, 2024
    jobLink: "https://twitter.com",
    status: "PENDING",
  },
  {
    organisation: "LinkedIn",
    designation: "Backend Developer",
    lastModified: new Date(2024, 2, 15), // March 15, 2024
    lastDate: new Date(2024, 3, 1), // April 1, 2024
    jobLink: "https://linkedin.com",
    status: "APPLIED",
  },
  {
    organisation: "Netflix",
    designation: "UI/UX Designer",
    lastModified: new Date(2024, 0, 5), // January 5, 2024
    lastDate: new Date(2024, 0, 31), // January 31, 2024
    jobLink: "https://netflix.com",
    status: "PENDING",
  },
  {
    organisation: "Spotify",
    designation: "Data Engineer",
    lastModified: new Date(2024, 5, 10), // June 10, 2024
    lastDate: new Date(2024, 6, 1), // July 1, 2024
    jobLink: "https://spotify.com",
    status: "APPLIED",
  },
  {
    organisation: "Uber",
    designation: "Product Manager",
    lastModified: new Date(2024, 1, 28), // February 28, 2024
    lastDate: new Date(2024, 2, 15), // March 15, 2024
    jobLink: "https://uber.com",
    status: "PENDING",
  },
];

export const initialJobOpening = {
  organisation: "Dream Organisation",
  designation: "My favourite title",
  lastModified: new Date().toISOString(),
  lastDate: new Date().toISOString(),
  jobLink: "https://my-dream-job.com",
  status: "PENDING",
  resume: {
    name: null,
    _id: null,
  },
  description: "The best job anyone can get!",
  referralStatus: "NOT_TAKEN",
  referralName: "The Good Fellow",
};