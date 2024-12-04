import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Crear una subtarea en una tarjeta
export async function POST(request: Request, { params }: { params: { tableroId: string; listaId: string; tarjetaId: string } }) {
  try {
    const { titulo, completado } = await request.json();
    const tarjetaId = parseInt(params.tarjetaId, 10); // Usamos tarjetaId de params

    // Validar que tarjetaId sea un número válido
    if (isNaN(tarjetaId)) {
      return NextResponse.json(
        { error: "El ID de la tarjeta no es válido" },
        { status: 400 }
      );
    }

    // Validar que el título esté presente
    if (!titulo) {
      return NextResponse.json(
        { error: "El título de la subtarea es obligatorio" },
        { status: 400 }
      );
    }

    // Crear la subtarea
    const subtarea = await prisma.subtarea.create({
      data: { titulo, completado: completado || false, tarjetaId },
    });

    return NextResponse.json(subtarea, { status: 201 });
  } catch (error) {
    console.error("Error al crear la subtarea:", error);
    return NextResponse.json({ error: "Error al crear la subtarea" }, { status: 500 });
  }
}

// GET: Obtener todas las subtareas de una tarjeta
export async function GET(request: Request, { params }: { params: { tableroId: string; listaId: string; tarjetaId: string } }) {
  try {
    const tarjetaId = parseInt(params.tarjetaId, 10); // Usamos tarjetaId de params

    // Validar que tarjetaId sea un número válido
    if (isNaN(tarjetaId)) {
      return NextResponse.json(
        { error: "El ID de la tarjeta no es válido" },
        { status: 400 }
      );
    }

    const subtareas = await prisma.subtarea.findMany({
      where: { tarjetaId },
    });

    return NextResponse.json(subtareas);
  } catch (error) {
    console.error("Error al obtener las subtareas:", error);
    return NextResponse.json({ error: "Error al obtener las subtareas" }, { status: 500 });
  }
}
