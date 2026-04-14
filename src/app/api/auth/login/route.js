import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/middlewares/auth";


export async function POST(request) {
  const { email, password } = await request.json();

  await connectDB();

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "El correo electrónico o contraseña no son correctas" },
      { status: 401 }
    );
  }

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    isAdmin: user.isAdmin,
  });

  return NextResponse.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      bio: user.bio,
      isAdmin: user.isAdmin,
    },
  });
}