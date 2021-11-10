import fetch from "node-fetch";
import { TestHelper } from "../TestHelper";

describe("daystochristmas endpoint", () => {
  test("returns correct an answer", async () => {
    const apiRootUrl = await TestHelper.getApiRootUrl();
    const response = await fetch(`${apiRootUrl}/daystochristmas`);
    expect(response.ok).toBe(true);

    const responseBody = await response.text();
    expect(responseBody).toMatch(
      /There are \d{1,3} day\(s\) to Christmas Eve./
    );
  });
});
