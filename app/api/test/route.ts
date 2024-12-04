import { NextRequest, NextResponse } from "next/server";

const GET = (req: NextRequest) => {
  try {
    return .json({ message: "Wops runnig fine........." });
  } catch (err) {
    return NextResponse.json({ message: "Somethin went wrong" });
  }
};

export { GET };
