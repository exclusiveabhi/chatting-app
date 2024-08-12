// Import necessary modules and files
import supertest from "supertest";
import app from "../index.js"; // Assuming your Express app instance is exported from 'index.js'
import User from "../src/models/UserModel.js";
import Job from "../src/models/JobModel.js"; // Import the Job model
import bcrypt from "bcrypt";
import { jobData } from "./jobTestData.js";

describe("Job Controller", () => {
  let authToken;
  let job;
  let user;
  const mockUserData = {
    email: "test@example.com",
    password: "testPassword",
  };
  beforeEach(async () => {
    await Job.deleteMany();
    await User.deleteMany();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mockUserData.password, salt);
    user = await User.create({
      email: mockUserData.email,
      password: hashedPassword,
    });
    const loginResponse = await supertest(app).post("/auth/login").send(mockUserData); // Assuming valid credentials for testing
    authToken = loginResponse.body.token;
  });

  describe("POST /jobs", () => {
    it("should create a new job application", async () => {
      await supertest(app).post("/jobs").set("Authorization", `Bearer ${authToken}`).send(jobData).expect(201);
    });
  });

  describe("GET /jobs", () => {
    beforeEach(async () => {
      const response = await supertest(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${authToken}`)
        .send(jobData)
        .expect(201);
      job = response.body;
      await User.findByIdAndUpdate(user._id, { $push: { jobIds: job._id } }, { new: true });
    });
    it("should get all job applications", async () => {
      await supertest(app).get("/jobs").set("Authorization", `Bearer ${authToken}`).expect(200);
    });
    it("should get a specific job application by ID", async () => {
      await supertest(app).get(`/jobs/${job._id}`).set("Authorization", `Bearer ${authToken}`).expect(200);
    });
  });
  describe("PATCH /jobs/:id", () => {
    it("should update a job application by ID", async () => {
      const res = await supertest(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${authToken}`)
        .send(jobData)
        .expect(201);

      await supertest(app)
        .patch(`/jobs/${res.body._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ organisation: "new org" })
        .expect(200);
    });
  });

  describe("DELETE /jobs/:id", () => {
    it("should delete a job application by ID", async () => {
      const res = await supertest(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${authToken}`)
        .send(jobData)
        .expect(201);

      await supertest(app).delete(`/jobs/${res.body._id}`).set("Authorization", `Bearer ${authToken}`).expect(204);
    });
  });
});
