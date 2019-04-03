import { run as greet } from "./index";

describe("greet function", () => {
  test("returns correct greeting", async () => {
    // TODO: Add helpers for creating the request and the context.
    const request = {
      query: {
        name: "Jan Aagaard"
      }
    };

    const context = {
      log: () => undefined,
      req: request
    };

    await greet(context as any, request as any);
    const response = (context as any).res;

    expect(response.body).toBe("Hello Jan Aagaard");
  });
});
