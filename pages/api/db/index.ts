import { NextApiRequest, NextApiResponse } from "next";
import { unauthorized, methodNotAllowed } from "../common";
import { identify } from "../../../gateway/Users";
import { parse } from "../../../domain/Cookie";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method.toLowerCase() !== "post") {
    return methodNotAllowed(res);
  }

  const session = (
    parse(req.headers.cookie).find(it => it.name === "mxsession") || {
      value: undefined
    }
  ).value;
  if (!session) {
    return unauthorized(res);
  }

  const user = await identify(session);
  if (!user) {
    return unauthorized(res);
  }

  res.setHeader("content-type", "application/json");
  res.status(200);
  res.end(JSON.stringify(user));
};
