import { NextApiRequest, NextApiResponse } from "next";
import { unauthorized, methodNotAllowed } from "./common";
import { login } from "../../../gateway/Users";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method.toLowerCase() !== "post") {
    return methodNotAllowed(res);
  }
  const { loginId, password } = req.body;
  if (!loginId || !password) {
    return unauthorized(res);
  }
  const session = await login(loginId, password);
  if (session == null) {
    return unauthorized(res);
  }
  res.setHeader("content-type", "application/json");
  res.setHeader("set-cookie", `MXSESSION=${session.sessionId}`);
  res.status(200);
  res.end("{}");
};
