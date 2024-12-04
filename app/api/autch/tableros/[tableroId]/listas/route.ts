import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Obtener todas las listas de un tablero
export async function GET(request: Request, { params }: { params: { tableroId: string } }) {
  const tableroId = parseInt(params.tableroId, 10);  // Usamos 'tableroId'

  if (isNaN(tableroId)) {
    return NextResponse.json({ error: "ID de tablero no válido" }, { status: 400 });
  }

  try {
    const tablero = await prisma.tablero.findUnique({
      where: { id: tableroId },
      include: {
        listas: true,  // Incluir listas dentro del tablero
      },
    });

    if (!tablero) {
      return NextResponse.json({ error: "Tablero no encontrado" }, { status: 404 });
    }

    return NextResponse.json(tablero.listas);  // Retorna las listas del tablero
  } catch (error) {
    console.error("Error al obtener las listas del tablero:", error);
    return NextResponse.json({ error: "Error al obtener las listas del tablero" }, { status: 500 });
  }
}

// POST: Crear una lista en un tablero
export async function POST(request: Request, { params }: { params: { tableroId: string } }) {
  try {
    const { titulo, posicion } = await request.json();
    const tableroId = parseInt(params.tableroId, 10);

    // Crear la lista en la base de datos
    const lista = await prisma.lista.create({
      data: { titulo, posicion: posicion || 0, tableroId },
    });

    return NextResponse.json(lista, { status: 201 });
  } catch (error) {
    console.error("Error al crear la lista:", error);
    return NextResponse.json({ error: "Error al crear la lista" }, { status: 500 });
  }
}
