import { run as greet } from "./greet"

describe("greet function", () => {
  test("return correct greeting", async () => {
    const request = {
      query: {
        name: "Jan Aagaard"
      }
    }

    const context = {
      log: () => undefined,
      req: request
    }

    const response = await greet(context as any, request as any)

    expect(response.body).toBe("Hello Jan Aagaard.")
  })
})
