import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Obtener un tablero por ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const tableroId = parseInt(params.id, 10);

    const tablero = await prisma.tablero.findUnique({
      where: { id: tableroId },
      include: {
        listas: {
          include: {
            tarjetas: true,
          },
        },
      },
    });

    if (!tablero) {
      return NextResponse.json({ error: "Tablero no encontrado" }, { status: 404 });
    }

    return NextResponse.json(tablero);
  } catch (error) {
    console.error("Error al obtener el tablero:", error);
    return NextResponse.json({ error: "Error al obtener el tablero" }, { status: 500 });
  }
}
