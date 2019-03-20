import * as fs from "fs";
import fetch from "node-fetch";
import { TestHelper } from "../TestHelper";

describe("greet endpoint", () => {
  test("returns correct greeting when using GET", async () => {
    const response = await fetch(
      `${TestHelper.apiRootUrl}/greet?name=Jan+Aagaard`
    );
    const body = await response.text();
    expect(body).toBe("Hello Jan Aagaard.");
  });

  test("return correct greeting when using POST", async () => {
    const requestBody = fs.readFileSync("src/greet/sample.dat").toString();
    const response = await fetch(`${TestHelper.apiRootUrl}/greet`, {
      body: requestBody,
      method: "POST"
    });
    const responseBody = await response.text();
    expect(responseBody).toBe("Hello Jan Aagaard.");
  });
});
