import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT: Actualizar el estado de una subtarea (completado / no completado)
export async function PUT(request: Request, { params }: { params: { tableroId: string; listaId: string; tarjetaId: string; subtareaId: string } }) {
  try {
    const { completado } = await request.json();
    const subtareaId = parseInt(params.subtareaId, 10);

    // Validar que subtareaId sea un número válido
    if (isNaN(subtareaId)) {
      return NextResponse.json(
        { error: "El ID de la subtarea no es válido" },
        { status: 400 }
      );
    }

    // Actualizar el estado de la subtarea en la base de datos
    const subtarea = await prisma.subtarea.update({
      where: { id: subtareaId },
      data: { completado },
    });

    return NextResponse.json(subtarea);
  } catch (error) {
    console.error("Error al actualizar la subtarea:", error);
    return NextResponse.json({ error: "Error al actualizar la subtarea" }, { status: 500 });
  }
}

// DELETE: Eliminar una subtarea
export async function DELETE(request: Request, { params }: { params: { tableroId: string; listaId: string; tarjetaId: string; subtareaId: string } }) {
  try {
    const subtareaId = parseInt(params.subtareaId, 10);

    // Validar que subtareaId sea un número válido
    if (isNaN(subtareaId)) {
      return NextResponse.json(
        { error: "El ID de la subtarea no es válido" },
        { status: 400 }
      );
    }

    // Eliminar la subtarea de la base de datos
    const subtarea = await prisma.subtarea.delete({
      where: { id: subtareaId },
    });

    return NextResponse.json(subtarea);
  } catch (error) {
    console.error("Error al eliminar la subtarea:", error);
    return NextResponse.json({ error: "Error al eliminar la subtarea" }, { status: 500 });
  }
}
