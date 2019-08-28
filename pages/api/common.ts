import { NextApiResponse } from "next";

export function badRequest(res: NextApiResponse) {
  res.setHeader("content-type", "application/json");
  res.status(400);
  res.end(JSON.stringify({}));
}

export function unauthorized(res: NextApiResponse) {
  res.setHeader("content-type", "application/json");
  res.status(401);
  res.end(JSON.stringify({}));
}

export function forbidden(res: NextApiResponse) {
  res.setHeader("content-type", "application/json");
  res.status(403);
  res.end(JSON.stringify({}));
}

export function notFound(res: NextApiResponse) {
  res.setHeader("content-type", "application/json");
  res.status(404);
  res.end(JSON.stringify({}));
}

export function methodNotAllowed(res: NextApiResponse) {
  res.setHeader("content-type", "application/json");
  res.status(405);
  res.end(JSON.stringify({}));
}

export function setSessionCookie(res: NextApiResponse, session: string) {
  res.setHeader("set-cookie", `mxsession=${session}; path=/;`);
}
