import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed, badRequest } from "./common";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method.toLowerCase() !== "post") {
    return methodNotAllowed(res);
  }
  const { loginId, password } = req.body;
  if (!loginId || !password) {
    return badRequest(res);
  }
  res.setHeader("content-type", "application/json");
  res.status(201);
  res.end("{}");
};
