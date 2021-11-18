import fetch from "node-fetch";
import { TestHelper } from "../TestHelper";

describe("divide endpoint", () => {
  test("returns correct fraction supplying a dividend and a devisor.", async () => {
    const apiRootUrl = await TestHelper.getApiRootUrl();
    const response = await fetch(`${apiRootUrl}/divide/5.5/2.5`);
    expect(response.ok).toBe(true);

    const responseBody = await response.text();
    expect(responseBody).toBe("5.5/2.5 is 2.2.");
  });
});
