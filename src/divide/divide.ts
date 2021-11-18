import { Context, HttpRequest } from "@azure/functions";

export async function divide(
  context: Context,
  _request: HttpRequest
): Promise<any> {
  const dividend = Number(context.bindingData.dividend);
  const devisor = Number(context.bindingData.devisor);

  if (isNaN(dividend) || isNaN(devisor)) {
    return {
      body: "Please pass a dividend and divisor in the query string, e.g. divide/6/2.5",
      status: 400,
    };
  }

  if (devisor === 0) {
    return {
      body: "Cannot divide by zero.",
      status: 400,
    };
  }

  const fraction = dividend / devisor;

  return {
    body: `${dividend}/${devisor} is ${fraction}.`,
  };
}
