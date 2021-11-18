import fetch from "node-fetch";
import { TestHelper } from "../TestHelper";

describe("divide endpoint", () => {
  test("returns correct fraction supplying a dividend and a devisor.", async () => {
    const apiRootUrl = await TestHelper.getApiRootUrl();
    const response = await fetch(`${apiRootUrl}/divide/5/2`);
    expect(response.ok).toBe(true);

    const responseBody = await response.text();
    expect(responseBody).toBe("5/2 is 2.5.");
  });

  test("returns 400 Bad Request if trying to divide by zero.", async () => {
    const apiRootUrl = await TestHelper.getApiRootUrl();
    const response = await fetch(`${apiRootUrl}/divide/1/0`);
    expect(response.ok).toBe(false);
    expect(response.status).toBe(400);

    const responseBody = await response.text();
    expect(responseBody).toBe("Cannot divide by zero.");
  });
});
