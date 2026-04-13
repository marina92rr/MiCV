import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { signToken } from "@/middlewares/auth";
import User from "@/models/User";

export async function POST(request) {
  const { email, password } = await request.json();

  await connectDB();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: "El correo electrónico o contraseña, no son correctas" }, { status: 401 });
  }

  const token = signToken({
    userId: user._id.toString(),
  });

  const res = NextResponse.json({ user: { id: user._id, name: user.name } });

  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return res;
}