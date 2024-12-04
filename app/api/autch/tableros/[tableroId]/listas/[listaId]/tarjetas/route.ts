import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Crear una tarjeta en una lista
export async function POST(request: Request, { params }: { params: { tableroId: string; listaId: string } }) {
  try {
    // Obtener los datos enviados en el cuerpo de la solicitud
    const { titulo, descripcion, posicion } = await request.json();
    
    // Validación para asegurar que el listaId y tableroId son números válidos
    const listaId = parseInt(params.listaId, 10);
    if (isNaN(listaId)) {
      return NextResponse.json({ error: "ID de lista inválido" }, { status: 400 });
    }

    // Crear la tarjeta en la base de datos
    const tarjeta = await prisma.tarjeta.create({
      data: {
        titulo,
        descripcion,
        posicion: posicion || 0, // Si no se pasa posicion, se asigna el valor 0
        listaId,  // Aseguramos que el listaId es correcto
      },
    });

    // Retornar la tarjeta creada como respuesta
    return NextResponse.json(tarjeta, { status: 201 });
  } catch (error) {
    console.error("Error al crear la tarjeta:", error);
    return NextResponse.json({ error: "Error al crear la tarjeta" }, { status: 500 });
  }
}

// GET: Obtener todas las tarjetas de una lista
export async function GET(request: Request, { params }: { params: { tableroId: string; listaId: string } }) {
  try {
    // Obtener el listaId desde los parámetros
    const listaId = parseInt(params.listaId, 10);

    if (isNaN(listaId)) {
      return NextResponse.json({ error: "ID de lista inválido" }, { status: 400 });
    }

    // Obtener todas las tarjetas de la lista específica
    const tarjetas = await prisma.tarjeta.findMany({
      where: { listaId },  // Filtra las tarjetas por listaId
    });

    // Retornar las tarjetas obtenidas
    return NextResponse.json(tarjetas, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las tarjetas:", error);
    return NextResponse.json({ error: "Error al obtener las tarjetas" }, { status: 500 });
  }
}
