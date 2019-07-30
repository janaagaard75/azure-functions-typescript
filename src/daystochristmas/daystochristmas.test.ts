import { Context } from "@azure/functions";
import { HttpRequest } from "@azure/functions";
import { Substitute } from "@fluffy-spoon/substitute";
import { daystochristmas } from "./daystochristmas";

describe.each([
  ["2000-12-24", 0],
  ["2015-12-23", 1],
  ["1975-05-29", 209],
  ["2000-01-01", 358],
  ["2003-12-25", 365]
])("daystochristmas function", (date, daysToChristmasEve) => {
  test(`returns correct greeting number of days for '${date}'`, async () => {
    jest.spyOn(Date, "now").mockImplementation(() => new Date(date).getTime());

    const request = Substitute.for<HttpRequest>();
    const context = Substitute.for<Context>();
    (context.req as any).returns({ req: request });

    const response = await daystochristmas(context, request);
    expect(response.body).toBe(
      `There are ${daysToChristmasEve} day(s) to Christmas Eve.`
    );
  });
});
