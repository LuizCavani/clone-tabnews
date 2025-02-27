import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const parserUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(response.status).toBe(200);
  expect(responseBody.updated_at).toEqual(parserUpdatedAt);
  expect(responseBody.dependencies.database.version).toBe("16.0");
  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});
