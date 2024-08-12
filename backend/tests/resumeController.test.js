// Import necessary modules and files
import supertest from "supertest";
import app from "../index"; // Assuming your Express app instance is exported from 'index.js'
import User from "../src/models/UserModel"; // Import the User model
import Resume from "../src/models/resumeModel"; // Import the Resume model
import bcrypt from "bcrypt";
import { resumeTestData } from "./resumeTestData";
import { getResumeThumbnail } from "../src/utils/cloudinary"; // Import the mocked function

jest.mock("../src/utils/cloudinary", () => ({
  getResumeThumbnail: jest.fn(() => Promise.resolve("https://fake.com/test.png")),
  deleteResumeThumbail: jest.fn(() => Promise.resolve("https://fake.com/test.png")),
}));

describe("Resume Controller", () => {
  let authToken;
  let user;
  const mockUserData = {
    email: "test@example.com",
    password: "testPassword",
  };
  beforeEach(async () => {
    await User.deleteMany();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mockUserData.password, salt);
    user = await User.create({
      email: mockUserData.email,
      password: hashedPassword,
    });
    const loginResponse = await supertest(app).post("/auth/login").send(mockUserData);
    authToken = loginResponse.body.token;
  });

  describe("POST /resumes", () => {
    it("should create a new resume", async () => {
      const res = await supertest(app)
        .post("/resumes")
        .set("Authorization", `Bearer ${authToken}`)
        .send(resumeTestData)
        .expect(201);
    });
  });

  describe("GET /resumes", () => {
    it("should get all resumes", async () => {
      await supertest(app).get("/resumes").set("Authorization", `Bearer ${authToken}`).expect(200);
    });
  });

  describe("GET /resumes/:id", () => {
    it("should get a specific resume by ID", async () => {
      const res = await supertest(app)
        .post("/resumes")
        .set("Authorization", `Bearer ${authToken}`)
        .send(resumeTestData)
        .expect(201);
      await supertest(app).get(`/resumes/${res.body._id}`).set("Authorization", `Bearer ${authToken}`).expect(200);
    });
  });

  describe("PATCH /resumes/:id", () => {
    it("should update a resume by ID", async () => {
      const res = await supertest(app)
        .post("/resumes")
        .set("Authorization", `Bearer ${authToken}`)
        .send(resumeTestData)
        .expect(201);

      await supertest(app)
        .patch(`/resumes/${res.body._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ name: "new name" })
        .expect(200);
    });
  });

  describe("DELETE /resumes/:id", () => {
    it("should delete a resume by ID", async () => {
      const res = await supertest(app)
        .post("/resumes")
        .set("Authorization", `Bearer ${authToken}`)
        .send(resumeTestData);

      await supertest(app).delete(`/resumes/${res.body._id}`).set("Authorization", `Bearer ${authToken}`).expect(204);
    });
  });
});
