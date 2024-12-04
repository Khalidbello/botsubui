import { NextApiRequest, NextApiResponse } from "next";

const test = (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ m: "working fine" });
  try {
  } catch (err) {
    res.status(500).json({ message: "Somethin went wrong" });
  }
};

export default test;
