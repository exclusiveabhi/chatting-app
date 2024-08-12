// Import necessary modules and files
import supertest from "supertest";
import User from "../src/models/UserModel";
import app from "../index";
import bcrypt from "bcrypt";

describe("Authentication Endpoints", () => {
  // Mock user data for testing
  const mockUser = {
    email: "test@example.com",
    password: "testPassword",
  };

  const mockUserInvalid = {
    password: "testPassword",
  };

  beforeEach(async () => {
    // Clean up the database before each test
    await User.deleteMany();
  });

  describe("POST /auth/register", () => {
    it("should register a new user", async () => {
      const response = await supertest(app).post("/auth/register").send(mockUser).expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email", mockUser.email);
      expect(response.body).toHaveProperty("token");
    });

    it("should return 500 if registration fails", async () => {
      await supertest(app).post("/auth/register").send(mockUserInvalid).expect(500);
    });
  });

  describe("POST /auth/login", () => {
    beforeEach(async () => {
      // Create a user for login tests
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(mockUser.password, salt);
      await User.create({
        email: mockUser.email,
        password: hashedPassword,
        fullName: mockUser.fullName,
      });
    });

    it("should login an existing user", async () => {
      const response = await supertest(app)
        .post("/auth/login")
        .send({ email: mockUser.email, password: mockUser.password })
        .expect(200);

      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email", mockUser.email);
      expect(response.body).toHaveProperty("token");
    });

    it("should return 404 if user is not found", async () => {
      await supertest(app)
        .post("/auth/login")
        .send({ email: "nonexistent@example.com", password: "password" })
        .expect(404);
    });

    it("should return 401 if password is incorrect", async () => {
      await supertest(app)
        .post("/auth/login")
        .send({ email: mockUser.email, password: "incorrectPassword" })
        .expect(401);
    });
  });

  describe("GET /auth/users", () => {
    it("should return all users for debugging", async () => {
      // Create some mock users
      await User.create(mockUser);
      await User.create({ email: "user2@example.com", password: "password", fullName: "User 2" });

      const response = await supertest(app).get("/auth/users").expect(201);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2); // Assuming there are only 2 users created in this test
    });
  });
});
