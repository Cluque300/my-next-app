import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Crear un comentario en una tarjeta
export async function POST(request: Request, { params }: { params: { tableroId: string; listaId: string; tarjetaId: string } }) {
  try {
    const { contenido, usuarioId } = await request.json();
    const tarjetaId = parseInt(params.tarjetaId, 10);

    // Crear el comentario
    const comentario = await prisma.comentario.create({
      data: { contenido, tarjetaId, usuarioId },
    });

    // Obtener el comentario con los datos del usuario (fullname)
    const comentarioConUsuario = await prisma.comentario.findUnique({
      where: { id: comentario.id },
      include: {
        usuario: {
          select: {
            fullname: true,  // Incluimos el fullname del usuario
          },
        },
      },
    });

    // Retornar el comentario con los datos del usuario
    return NextResponse.json(comentarioConUsuario, { status: 201 });
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    return NextResponse.json({ error: "Error al crear el comentario" }, { status: 500 });
  }
}

// GET: Obtener los comentarios de una tarjeta
export async function GET(request: Request, { params }: { params: { tableroId: string; listaId: string; tarjetaId: string } }) {
  try {
    const tarjetaId = parseInt(params.tarjetaId, 10);

    // Obtener comentarios con los datos del usuario
    const comentarios = await prisma.comentario.findMany({
      where: { tarjetaId },
      include: {
        usuario: {
          select: {
            fullname: true,  // Incluimos el fullname del usuario
          },
        },
      },
    });

    return NextResponse.json(comentarios);
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    return NextResponse.json({ error: "Error al obtener los comentarios" }, { status: 500 });
  }
}
