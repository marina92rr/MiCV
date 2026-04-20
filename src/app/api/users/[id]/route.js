
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

//GET/api/users/[id]   --> Conseguir datos usuario id
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const userId = await User.findById(id);
        return NextResponse.json(userId, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'No se ha obtenido el usuario' })
    }
}

//PUT/api/users/[id] --> Actualizar usuario por id
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const body = await request.json();

        const userUpdate = await User.findByIdAndUpdate(
            id,
            {
                name: body.name,
                lasname: body.lastname,
                email: body.email,
                photo: body.photo,
                password: body.password,
                bio: body.bio,
            }
        );
        return NextResponse.json(userUpdate);

    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar el usuario' })
    }

}

//DELETE/api/users/[id] --> Eliminar usuario por id
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ error: "No se encontró el usuario" }, { status: 404 });
        }

        return NextResponse.json({ message: "Usuario eliminado" });

    } catch (error) {

        return NextResponse.json(
            { error: "Error al eliminar", details: error.message },
            { status: 500 }
        );
    }
}