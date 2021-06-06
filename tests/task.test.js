const request = require("supertest");

const app = require("../src/app");
const Task = require("../src/models/task");
const {
  testUserId,
  testUser,
  setupTestDatabase,
  taskOne,
  taskTwo,
  taskThree,
} = require("./db");

beforeEach(async () => {
  await setupTestDatabase();
});

test("Should create a task for authenticated user", async () => {
  const res = await request(app)
    .post("/tasks")
    .set("Authorization", "Bearer " + testUser.tokens[0].token)
    .send({ description: "Test task" })
    .expect(201);
  const task = await Task.findById(res.body._id);
  expect(task).not.toBeNull();
});

test("Should return tasks for authenticated user", async () => {
  const res = await request(app)
    .get("/tasks")
    .set("Authorization", "Bearer " + testUser.tokens[0].token)
    .expect(200);
  expect(res.body.length).toBe(2);
});

test("Shoult not delete another user's tasks", async () => {
  const res = await request(app)
    .delete("/tasks/" + taskTwo._id)
    .set("Authorization", "Bearer " + testUser.tokens[0].token)
    .expect(404);
  const task = await Task.findById(taskTwo._id);
  expect(task).not.toBeNull();
});
