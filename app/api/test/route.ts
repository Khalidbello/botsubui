import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const GET = (req: NextApiRequest) => {
  try {
    NextResponse.json({ message: "Wops runnig fine........." });
  } catch (err) {
    NextResponse.json({ message: "Somethin went wrong" });
  }
};

export { GET };
