export async function run(context: any, request: any) {
  if (request.query.name || (request.body && request.body.name)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "Hello " + (request.query.name || request.body.name)
    };
  }
  else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body."
    };
  }
};