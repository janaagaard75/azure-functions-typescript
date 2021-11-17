import { Context, HttpRequest } from "@azure/functions";

export async function greet(
  _context: Context,
  request: HttpRequest
): Promise<any> {
  const name = extractName(request);
  if (name === undefined) {
    return {
      body: "Please pass a name on the query string or in the request body, e.g. greet?name=John.",
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
  // 'query' might be undefined - there is an error in the type system.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (request.query !== undefined && request.query.name !== undefined) {
    return request.query.name;
  }

  if (request.body !== undefined && request.body.name !== undefined) {
    return request.body.name;
  }

  return "";
}
