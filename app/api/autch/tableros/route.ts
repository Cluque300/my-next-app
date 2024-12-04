import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Obtener todos los tableros del usuario
export async function GET(request: Request) {
  const userId = request.headers.get("user-id");

  if (!userId) {
    return NextResponse.json(
      { error: "El ID del usuario es obligatorio" },
      { status: 400 }
    );
  }

  try {
    const tableros = await prisma.tablero.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { listas: true },
    });

    return NextResponse.json(tableros);
  } catch (error) {
    console.error("Error al obtener los tableros:", error);
    return NextResponse.json({ error: "Error al obtener los tableros" }, { status: 500 });
  }
}

// POST: Crear un nuevo tablero
export async function POST(request: Request) {
  try {
    const { titulo, descripcion, userId } = await request.json();

    if (!titulo || !userId) {
      return NextResponse.json(
        { error: "Título y usuario son obligatorios" },
        { status: 400 }
      );
    }

    const tablero = await prisma.tablero.create({
      data: { titulo, descripcion, userId },
    });

    return NextResponse.json(tablero, { status: 201 });
  } catch (error) {
    console.error("Error al crear el tablero:", error);
    return NextResponse.json({ error: "Error al crear el tablero" }, { status: 500 });
  }
}
