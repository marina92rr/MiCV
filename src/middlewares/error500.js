
import { NextResponse } from "next/server";

export function errorMiddleware(fn, req) {
  try {
    return fn(req);
  } catch {
    return new NextResponse("Error 500", { status: 500 });
  }
}