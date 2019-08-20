import { NextApiRequest, NextApiResponse } from "next";
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.end(JSON.stringify({ users: [{ name: "foo" }] }));
};
