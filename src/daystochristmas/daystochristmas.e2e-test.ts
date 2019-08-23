import fetch from "node-fetch";
import { TestHelper } from "../TestHelper";

describe("daystochristmas endpoint", () => {
  test("returns correct an answer", async () => {
    const response = await fetch(`${TestHelper.apiRootUrl}/daystochristmas`);
    expect(response.ok).toBe(true);

    const responseBody = await response.text();
    expect(responseBody).toMatch(
      /There are \d{1,3} day\(s\) to Christmas Eve./
    );
  });
});
