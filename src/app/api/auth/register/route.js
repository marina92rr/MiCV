import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { name, lastname, email, password, bio, isAdmin } = await request.json();

    await connectDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      bio,
      isAdmin,
    });

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        bio: user.bio,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}