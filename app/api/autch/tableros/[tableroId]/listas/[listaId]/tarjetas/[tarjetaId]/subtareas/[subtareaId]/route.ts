import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT: Actualizar el estado de una subtarea (completado / no completado) y la fecha de expiración
export async function PUT(request: Request, { params }: { params: { tableroId: string; listaId: string; tarjetaId: string; subtareaId: string } }) {
  try {
    const { completado, fecha_expiracion } = await request.json();
    const subtareaId = parseInt(params.subtareaId, 10);

    // Validar que subtareaId sea un número válido
    if (isNaN(subtareaId)) {
      return NextResponse.json(
        { error: "El ID de la subtarea no es válido" },
        { status: 400 }
      );
    }

    // Si se proporciona una fecha de expiración, validar que sea una fecha futura
    if (fecha_expiracion) {
      const fecha = new Date(fecha_expiracion);
      if (isNaN(fecha.getTime())) {
        return NextResponse.json(
          { error: "La fecha de expiración no es válida" },
          { status: 400 }
        );
      }
      if (fecha <= new Date()) {
        return NextResponse.json(
          { error: "La fecha de expiración debe ser una fecha futura" },
          { status: 400 }
        );
      }
    }

    // Actualizar la subtarea en la base de datos
    const subtarea = await prisma.subtarea.update({
      where: { id: subtareaId },
      data: { 
        completado, 
        fecha_expiracion: fecha_expiracion ? new Date(fecha_expiracion) : null 
      },
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
