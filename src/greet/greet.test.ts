import { Context } from "@azure/functions";
import { HttpRequest } from "@azure/functions";
import { Substitute } from "@fluffy-spoon/substitute";
import { greet } from "./greet";

describe("greet function", () => {
  test("returns correct greeting", async () => {
    const request = Substitute.for<HttpRequest>();
    (request.query.returns as any)({
      name: "Jan Aagaard"
    });

    const context = Substitute.for<Context>();
    (context.req as any).returns({
      req: request
    });

    const response = await greet(context, request);

    expect(response.body).toBe("Hello Jan Aagaard");
  });
});
