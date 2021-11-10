import { Context, HttpRequest } from "@azure/functions";
import { Substitute } from "@fluffy-spoon/substitute";
import { greet } from "./greet";

describe.each([
  ["Jan Aagaard", "Hello Jan Aagaard."],
  ["", "Please pass a name on the query string or in the request body."],
  [undefined, "Please pass a name on the query string or in the request body."],
  [" ", "Please pass a name on the query string or in the request body."],
])("greet function", (name, greeting) => {
  test(`returns correct greeting for '${name}' in the query`, async () => {
    const request = Substitute.for<HttpRequest>();
    (request.query.returns as any)({ name });
    (request.body.returns as any)({});

    const context = Substitute.for<Context>();
    (context.req as any).returns({ req: request });

    const response = await greet(context, request);

    expect(response.body).toBe(greeting);
  });

  test(`returns correct greeting for '${name}' in the body`, async () => {
    const request = Substitute.for<HttpRequest>();
    (request.query.returns as any)({});
    (request.body.returns as any)({ name });

    const context = Substitute.for<Context>();
    (context.req as any).returns({ req: request });

    const response = await greet(context, request);

    expect(response.body).toBe(greeting);
  });
});
