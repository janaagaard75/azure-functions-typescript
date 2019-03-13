import { Context } from "@azure/functions";
import { HttpRequest } from "@azure/functions";

export async function greet(context: Context, req: HttpRequest): Promise<any> {
  context.log("JavaScript HTTP trigger function processed a request.");

  if (req.query.name || (req.body && req.body.name)) {
    return {
      // status: 200, /* Defaults to 200 */
      body: "Hello " + (req.query.name || req.body.name)
    };
  } else {
    return {
      body: "Please pass a name on the query string or in the request body",
      status: 400
    };
  }
}
