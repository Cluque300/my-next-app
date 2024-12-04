import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Obtener una lista específica en un tablero
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const listaId = parseInt(params.id, 10);

    const lista = await prisma.lista.findUnique({
      where: { id: listaId },
      include: { tarjetas: true },
    });

    if (!lista) {
      return NextResponse.json({ error: "Lista no encontrada" }, { status: 404 });
    }

    return NextResponse.json(lista);
  } catch (error) {
    console.error("Error al obtener la lista:", error);
    return NextResponse.json({ error: "Error al obtener la lista" }, { status: 500 });
  }
}
