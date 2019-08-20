import { NextApiResponse } from "next";

export function notFound(res: NextApiResponse) {
  res.setHeader("content-type", "application/json");
  res.status(404);
  res.end(JSON.stringify({}));
}
