import { NextApiRequest, NextApiResponse } from "next";
import { notFound } from "./common";
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method.toLowerCase() !== "post") {
    return notFound(res);
  }
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.end("{}");
};
