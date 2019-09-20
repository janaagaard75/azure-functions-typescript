import { Context } from "@azure/functions";
import { HttpRequest } from "@azure/functions";
import * as dayjs from "dayjs";

export async function daystochristmas(
  _context: Context,
  _request: HttpRequest
): Promise<any> {
  const now = dayjs(Date.now());
  let christmasEve = dayjs(`${now.year()}-12-24 23:59:59Z`);
  if (christmasEve.diff(now, "millisecond") < 0) {
    christmasEve = christmasEve.add(1, "year");
  }

  const days = christmasEve.diff(now, "day");

  return {
    body: `There are ${days} day(s) to Christmas Eve.`
  };
}
