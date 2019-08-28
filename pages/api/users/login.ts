import { NextApiRequest, NextApiResponse } from "next";
import { unauthorized, methodNotAllowed, setSessionCookie } from "../common";
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
  if (!session) {
    return unauthorized(res);
  }

  res.setHeader("content-type", "application/json");
  setSessionCookie(res, session.session);
  res.status(200);
  res.end("{}");
};
