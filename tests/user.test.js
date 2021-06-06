const request = require("supertest");

const app = require("../src/app");
const User = require("../src/models/user");
const { testUserId, testUser, setupTestDatabase } = require("./db");

beforeEach(async () => {
  await setupTestDatabase();
});

test("Should sign up a new user", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      name: "Test User",
      email: "mmm@mfmm.com",
      age: 24,
      password: "12345678",
    })
    .expect(201);

  expect(res.body.password).toBeUndefined();
});

test("Should login an existing user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);

  const user = await User.findById(res.body.user._id);
  expect(res.body.token).toBe(user.tokens[1].token);
});

test("Should not login a nonexisting user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: testUser.email,
      password: "dfijdsfije",
    })
    .expect(400);
});

test("Should get profile for authenticated user", async () => {
  const res = await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer " + testUser.tokens[0].token)
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete profile for authenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", "Bearer " + testUser.tokens[0].token)
    .expect(200);

  const user = await User.findById(testUserId);
  expect(user).toBeNull();
});

test("Should not delete profile for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload an avatar for authenticated user", async () => {
  const res = await request(app)
    .post("/users/me/avatar")
    .set("Authorization", "Bearer " + testUser.tokens[0].token)
    .attach(
      "avatar",
      "D:/Courses/The Complete Node.js Developer Course (3rd Edition)/My Work/task-manager/tests/fixtures/profile-pic.jpg"
    )
    .expect(200);

  const user = await User.findById(testUserId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  const res = await request(app)
    .patch("/users/me")
    .set("Authorization", "Bearer " + testUser.tokens[0].token)
    .send({ name: "Unit" })
    .expect(200);
  const user = await User.findById(testUser._id);
  expect(user.name).toBe("Unit");
});

test("Should not update invalid user fields", async () => {
  const res = await request(app)
    .patch("/users/me")
    .set("Authorization", "Bearer " + testUser.tokens[0].token)
    .send({ size: 10 })
    .expect(400);
});
