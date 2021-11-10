import { Context, HttpRequest } from "@azure/functions";

export async function greet(
  _context: Context,
  request: HttpRequest
): Promise<any> {
  const name = extractName(request);
  if (name === undefined) {
    return {
      body: "Please pass a name on the query string or in the request body.",
      status: 400,
    };
  }

  return {
    body: `Hello ${name}.`,
  };
}

function extractName(request: HttpRequest): string | undefined {
  const name = getNameFromQueryOrBody(request).trim();

  if (name.length === 0) {
    return undefined;
  }

  return name;
}

function getNameFromQueryOrBody(request: HttpRequest): string {
  if (request.query.name !== undefined) {
    return request.query.name;
  }

  if (typeof request.body.name === "string") {
    return request.body.name;
  }

  return "";
}
