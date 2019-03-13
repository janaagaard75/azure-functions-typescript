import { Context } from "@azure/functions";
import { HttpRequest } from "@azure/functions";

export async function greet(
  context: Context,
  request: HttpRequest
): Promise<any> {
  if (request.query.name || (request.body && request.body.name)) {
    return {
      // status: 200, /* Defaults to 200 */
      body: "Hello " + (request.query.name || request.body.name)
    };
  } else {
    return {
      body: "Please pass a name on the query string or in the request body",
      status: 400
    };
  }
}
