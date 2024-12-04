import { NextRequest, NextResponse } from "next/server";

const GET = (req: NextRequest) => {
  try {
    NextResponse.json({ message: "Wops runnig fine........." });
  } catch (err) {
    NextResponse.json({ message: "Somethin went wrong" });
  }
};

export { GET };
