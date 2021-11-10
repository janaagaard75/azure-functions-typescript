import * as fs from "fs";
import fetch from "node-fetch";
import { TestHelper } from "../TestHelper";

describe("greet endpoint", () => {
  test("returns correct greeting when using GET", async () => {
    const apiRootUrl = await TestHelper.getApiRootUrl();
    const response = await fetch(`${apiRootUrl}/greet?name=Jan+Aagaard`);
    expect(response.ok).toBe(true);

    const responseBody = await response.text();
    expect(responseBody).toBe("Hello Jan Aagaard.");
  });

  test("return correct greeting when using POST", async () => {
    const requestBody = fs.readFileSync("src/greet/sample.dat").toString();
    const apiRootUrl = await TestHelper.getApiRootUrl();
    const response = await fetch(`${apiRootUrl}/greet`, {
      body: requestBody,
      method: "POST",
    });
    expect(response.ok).toBe(true);

    const responseBody = await response.text();
    expect(responseBody).toBe("Hello Jan Aagaard.");
  });

  test("return error when name not specified", async () => {
    const apiRootUrl = await TestHelper.getApiRootUrl();
    const response = await fetch(`${apiRootUrl}/greet`);
    expect(response.ok).toBe(false);
    expect(response.status).toBe(400);

    const responseBody = await response.text();
    expect(responseBody).toBe(
      "Please pass a name on the query string or in the request body."
    );
  });
});
