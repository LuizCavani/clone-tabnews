import email from "infra/email.js";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Test <teste@teste.com>",
      to: "test2@teste.com",
      subject: "Teste de assunto",
      text: "Teste de corpo",
    });

    await email.send({
      from: "Test <teste@teste.com>",
      to: "test2@teste.com",
      subject: "Ultimo email",
      text: "Corpo do ultimo",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<teste@teste.com>");
    expect(lastEmail.recipients[0]).toBe("<test2@teste.com>");
    expect(lastEmail.subject).toBe("Ultimo email");
    expect(lastEmail.text).toBe("Corpo do ultimo\n");
  });
});
