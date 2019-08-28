import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed, badRequest, setSessionCookie } from "../common";
import { register } from "../../../gateway/Users";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method.toLowerCase() !== "post") {
    return methodNotAllowed(res);
  }

  const { loginId, password } = req.body;
  if (!loginId || !password) {
    return badRequest(res);
  }

  const session = await register(loginId, password);
  if (!session) {
    return badRequest(res);
  }
  res.setHeader("content-type", "application/json");
  setSessionCookie(res, session.session);
  res.status(201);
  res.end("{}");
};
