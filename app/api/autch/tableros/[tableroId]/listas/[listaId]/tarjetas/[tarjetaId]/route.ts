import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Obtener una tarjeta específica en una lista
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const tarjetaId = parseInt(params.id, 10);

    const tarjeta = await prisma.tarjeta.findUnique({
      where: { id: tarjetaId },
      include: {
        comentarios: true,
      },
    });

    if (!tarjeta) {
      return NextResponse.json({ error: "Tarjeta no encontrada" }, { status: 404 });
    }

    return NextResponse.json(tarjeta);
  } catch (error) {
    console.error("Error al obtener la tarjeta:", error);
    return NextResponse.json({ error: "Error al obtener la tarjeta" }, { status: 500 });
  }
}

// DELETE: Eliminar una tarjeta específica
export async function DELETE(request: Request, { params }: { params: { tableroId: string, listaId: string, tarjetaId: string } }) {
  try {
    const tarjetaId = parseInt(params.tarjetaId, 10);
    const listaId = parseInt(params.listaId, 10);
    const tableroId = parseInt(params.tableroId, 10);

    // Verificar si la tarjeta existe en la lista y tablero correcto
    const tarjeta = await prisma.tarjeta.findFirst({
      where: {
        id: tarjetaId,
        listaId: listaId, // Verificar que la tarjeta pertenece a la lista indicada
        lista: {
          tableroId: tableroId, // Verificar que la tarjeta pertenece al tablero correcto
        },
      },
    });

    if (!tarjeta) {
      return NextResponse.json({ error: "Tarjeta no encontrada en la lista o tablero especificado" }, { status: 404 });
    }

    // Eliminar la tarjeta de la base de datos
    await prisma.tarjeta.delete({
      where: { id: tarjetaId },
    });

    return NextResponse.json({ message: "Tarjeta eliminada correctamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar la tarjeta:", error);
    return NextResponse.json({ error: "Error al eliminar la tarjeta" }, { status: 500 });
  }
}

// PUT: Actualizar una tarjeta específica en una lista
export async function PUT(request: Request, { params }: { params: { tableroId: string, listaId: string, tarjetaId: string } }) {
  try {
    const tarjetaId = parseInt(params.tarjetaId, 10);
    const listaId = parseInt(params.listaId, 10);
    const tableroId = parseInt(params.tableroId, 10);

    // Obtener los datos del cuerpo de la solicitud (por ejemplo, nuevos datos para la tarjeta)
    const { titulo, descripcion, posicion } = await request.json();

    // Verificar si la tarjeta existe en el tablero y lista originales
    const tarjeta = await prisma.tarjeta.findFirst({
      where: {
        id: tarjetaId,
        listaId: listaId, // Verificar que la tarjeta pertenece a la lista indicada
        lista: {
          tableroId: tableroId, // Verificar que la tarjeta pertenece al tablero correcto
        },
      },
    });

    if (!tarjeta) {
      return NextResponse.json({ error: "Tarjeta no encontrada en la lista o tablero especificado" }, { status: 404 });
    }

    // Actualizar la tarjeta con los nuevos datos, y moverla si es necesario (cambiando el listaId)
    const updatedTarjeta = await prisma.tarjeta.update({
      where: { id: tarjetaId },
      data: {
        titulo: titulo || tarjeta.titulo,  // Solo actualizar si se proporciona un nuevo valor
        descripcion: descripcion || tarjeta.descripcion,  // Solo actualizar si se proporciona un nuevo valor
        posicion: posicion ?? tarjeta.posicion,  // Actualizar la posición si se proporciona un nuevo valor
        listaId: listaId,  // Actualizar el listaId para mover la tarjeta a la nueva lista
      },
    });

    return NextResponse.json(updatedTarjeta);
  } catch (error) {
    console.error("Error al actualizar la tarjeta:", error);
    return NextResponse.json({ error: "Error al actualizar la tarjeta" }, { status: 500 });
  }
}
