// this andles loggin in

import { NextResponse } from "next/server";

export async function GET () {
  return  NextResponse.json({title: 'we are doing great'});
}