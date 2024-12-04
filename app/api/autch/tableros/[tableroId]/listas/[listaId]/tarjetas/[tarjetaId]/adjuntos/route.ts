import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Crear un adjunto en una tarjeta
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { nombre, url } = await request.json();
    const tarjetaId = parseInt(params.id, 10);

    if (!nombre || !url) {
      return NextResponse.json(
        { error: "El nombre y la URL del adjunto son obligatorios" },
        { status: 400 }
      );
    }

    const adjunto = await prisma.adjunto.create({
      data: { nombre, url, tarjetaId },
    });

    return NextResponse.json(adjunto, { status: 201 });
  } catch (error) {
    console.error("Error al crear el adjunto:", error);
    return NextResponse.json({ error: "Error al crear el adjunto" }, { status: 500 });
  }
}

// GET: Obtener todos los adjuntos de una tarjeta
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const tarjetaId = parseInt(params.id, 10);

    const adjuntos = await prisma.adjunto.findMany({
      where: { tarjetaId },
    });

    return NextResponse.json(adjuntos);
  } catch (error) {
    console.error("Error al obtener los adjuntos:", error);
    return NextResponse.json({ error: "Error al obtener los adjuntos" }, { status: 500 });
  }
}
