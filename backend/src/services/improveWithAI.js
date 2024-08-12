import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const improveWithGPT = async (resumeTextList) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `I am giving you an array, each item in the array is a string, each string is part of a resume of a candidate, update each string by making it more impactful and each item should be atleast 60 words long. Return me a JSON, it should have a key "response" and its value should be the updated array (the sequence of items should be the same)
            this is the array - ${resumeTextList}`,
      },
    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });

  const jsonResponse = JSON.parse(completion.choices[0].message.content);
  const improvedResumeTextList = jsonResponse["response"];
  return improvedResumeTextList;
};

export const improveResumeWithGPT = async (inputResume) => {
  const originalProjectDescriptions = inputResume.projectList.map((item) => item.description);
  const originalExperienceDescriptions = inputResume.experienceList.map((item) => item.description);

  const resumeTextListToImprove = [...originalProjectDescriptions, ...originalExperienceDescriptions];
  const improvedResumeTextList = await improveWithGPT(resumeTextListToImprove);

  const updatedProjectDescriptions = improvedResumeTextList.splice(0, originalProjectDescriptions.length);
  const updatedExperienceDescriptions = improvedResumeTextList;

  const improvedResumeJSON = JSON.parse(JSON.stringify(inputResume));

  // Update project descriptions
  improvedResumeJSON.projectList.forEach((item, index) => {
    item.description = updatedProjectDescriptions[index];
  });

  // Update experience descriptions
  improvedResumeJSON.experienceList.forEach((item, index) => {
    item.description = updatedExperienceDescriptions[index];
  });

  return improvedResumeJSON;
};
