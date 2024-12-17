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

// DELETE: Eliminar una lista específica de un tablero
export async function DELETE(request: Request, { params }: { params: { tableroId: string, listaId: string } }) {
  try {
    const listaId = parseInt(params.listaId, 10);

    // Eliminar la lista en la base de datos
    const listaEliminada = await prisma.lista.delete({
      where: { id: listaId },
    });

    return NextResponse.json(listaEliminada, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar la lista:", error);
    return NextResponse.json({ error: "Error al eliminar la lista" }, { status: 500 });
  }
}
