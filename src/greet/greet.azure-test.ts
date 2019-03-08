import fetch from "node-fetch"
import { TestHelper } from "../TestHelper"

describe("greet endpoint", () => {
  test("returns correct greeting", async () => {
    const response = await fetch(
      `${TestHelper.apiRootUrl}/greet?name=Jan+Aagaard`
    )
    const body = await response.text()
    expect(body).toBe("Hello Jan Aagaard.")
  })
})
