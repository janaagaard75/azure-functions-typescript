import { run as greet } from "./index";

describe("greet function", () => {
  test("returns correct greeting", async () => {
    const request = {
      query: {
        name: "Jan Aagaard"
      }
    };

    const context = {
      log: () => undefined,
      req: request
    };

    await greet(context, request);
    const response = (context as any).res;

    expect(response.body).toBe("Hello Jan Aagaard");
  });
});
