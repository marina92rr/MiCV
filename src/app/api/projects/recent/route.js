import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(3);

    const projectsWithShortDesc = projects.map((p) => ({
      ...p.toObject(),
      description:
        p.description.length > 100
          ? p.description.slice(0, 100) + "..."
          : p.description,
    }));

    return NextResponse.json(projectsWithShortDesc, { status: 200 });
  } catch (error) {
    console.error("ERROR REAL:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}