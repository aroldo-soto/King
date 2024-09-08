import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.json();
  console.log(formData);

  return NextResponse.json("Data recibed correctly");
}
