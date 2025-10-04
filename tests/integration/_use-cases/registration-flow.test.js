import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.deleteAllEmails();
});

describe("Use case: Registration Flow (All successful)", () => {
  test("Create user account", async () => {
    const createUserResponse = await fetch(
      "http://localhost:3000/api/v1/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "RegistrationFlow",
          email: "registration.flow@email.com",
          password: "RegistrationFlow",
        }),
      },
    );

    expect(createUserResponse.status).toBe(201);

    const createdUserResponseBody = await createUserResponse.json();

    expect(createdUserResponseBody).toEqual({
      id: createdUserResponseBody.id,
      username: "RegistrationFlow",
      email: "registration.flow@email.com",
      password: createdUserResponseBody.password,
      features: ["read:activation_token"],
      created_at: createdUserResponseBody.created_at,
      updated_at: createdUserResponseBody.updated_at,
    });
  });

  test("Receive activation email", async () => {});

  test("Activate Account", async () => {});

  test("Login", async () => {});

  test("Get user information", async () => {});
});
