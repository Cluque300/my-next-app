import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Obtener una tarjeta específica en una lista
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tarjetaId = parseInt(params.id, 10);

    const tarjeta = await prisma.tarjeta.findUnique({
      where: { id: tarjetaId },
      include: {
        comentarios: true,
        adjuntos: true,
        subtareas: true,
      },
    });

    if (!tarjeta) {
      return NextResponse.json(
        { error: "Tarjeta no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(tarjeta);
  } catch (error) {
    console.error("Error al obtener la tarjeta:", error);
    return NextResponse.json(
      { error: "Error al obtener la tarjeta" },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar una tarjeta específica junto a sus dependencias
export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { tableroId: string; listaId: string; tarjetaId: string };
  }
) {
  try {
    const tarjetaId = parseInt(params.tarjetaId, 10);
    const listaId = parseInt(params.listaId, 10);
    const tableroId = parseInt(params.tableroId, 10);

    // Verificar si la tarjeta existe en la lista y tablero correcto
    const tarjeta = await prisma.tarjeta.findFirst({
      where: {
        id: tarjetaId,
        listaId: listaId,
        lista: {
          tableroId: tableroId,
        },
      },
    });

    if (!tarjeta) {
      return NextResponse.json(
        { error: "Tarjeta no encontrada en la lista o tablero especificado" },
        { status: 404 }
      );
    }

    // Eliminar dependencias relacionadas
    await prisma.comentario.deleteMany({
      where: { tarjetaId: tarjetaId },
    });

    await prisma.adjunto.deleteMany({
      where: { tarjetaId: tarjetaId },
    });

    await prisma.subtarea.deleteMany({
      where: { tarjetaId: tarjetaId },
    });

    // Eliminar la tarjeta
    await prisma.tarjeta.delete({
      where: { id: tarjetaId },
    });

    return NextResponse.json(
      { message: "Tarjeta y sus dependencias eliminadas correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar la tarjeta:", error);
    return NextResponse.json(
      { error: "Error al eliminar la tarjeta" },
      { status: 500 }
    );
  }
}

// PUT: Actualizar una tarjeta específica en una lista
export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { tableroId: string; listaId: string; tarjetaId: string };
  }
) {
  try {
    const tarjetaId = parseInt(params.tarjetaId, 10);
    const listaId = parseInt(params.listaId, 10);
    const tableroId = parseInt(params.tableroId, 10);

    const { titulo, descripcion, posicion } = await request.json();

    // Verificar si la tarjeta existe
    const tarjeta = await prisma.tarjeta.findFirst({
      where: {
        id: tarjetaId,
        listaId: listaId,
        lista: { tableroId: tableroId },
      },
    });

    if (!tarjeta) {
      return NextResponse.json(
        { error: "Tarjeta no encontrada en la lista o tablero especificado" },
        { status: 404 }
      );
    }

    // Actualizar la tarjeta
    const updatedTarjeta = await prisma.tarjeta.update({
      where: { id: tarjetaId },
      data: {
        titulo: titulo || tarjeta.titulo,
        descripcion: descripcion || tarjeta.descripcion,
        posicion: posicion ?? tarjeta.posicion,
        listaId: listaId,
      },
    });

    return NextResponse.json(updatedTarjeta);
  } catch (error) {
    console.error("Error al actualizar la tarjeta:", error);
    return NextResponse.json(
      { error: "Error al actualizar la tarjeta" },
      { status: 500 }
    );
  }
}
