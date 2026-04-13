import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// GET /api/users --> Devuelve todos los usuarios
export async function GET() {
    try {
        await connectDB();
        const users = await User.find({});
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Detalle del error:", error);
        return NextResponse.json(
            { error: 'Error al cargar los usuarios' },
            { status: 500 }
        );
    }
};

// POST /api/users --> Crea un nuevo usuario
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const newUser = await User.create({
            name: body.name,
            email: body.email,
            photo: body.photo,
            password: body.password,
            bio: body.bio, 
        })
        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Usuario no ha sido guardado' })
    }
}