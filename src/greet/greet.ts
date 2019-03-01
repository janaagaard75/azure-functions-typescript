import { Context } from "@azure/functions"
import { HttpRequest } from "@azure/functions"

export async function run(context: Context, request: HttpRequest) {
  const name = getName(request);
  if (!name) {
    return {
      status: 400,
      body: "Please pass a name on the query string or in the request body."
    };
  }

  return {
    body: `Hello ${name}.`
  };
};

function getName(request: any): string {
  if (request.query.name) {
    return request.query.name;
  }

  if (request.body && request.body.name) {
    return request.body.name;
  }

  return ""
}