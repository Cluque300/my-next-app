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
      orderBy: { posicion: 'asc' }, // Ordenar las tarjetas por posición
    });

    // Retornar las tarjetas obtenidas
    return NextResponse.json(tarjetas, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las tarjetas:", error);
    return NextResponse.json({ error: "Error al obtener las tarjetas" }, { status: 500 });
  }
}

// PUT: Mover una tarjeta a otra lista y posiblemente actualizar su posición
export async function PUT(request: Request, { params }: { params: { tableroId: string; listaId: string; tarjetaId: string } }) {
  try {
    const { nuevaListaId, nuevaPosicion } = await request.json();

    const tarjetaId = parseInt(params.tarjetaId, 10);
    const listaId = parseInt(params.listaId, 10);
    const nuevaListaIdParsed = parseInt(nuevaListaId, 10);

    if (isNaN(tarjetaId) || isNaN(listaId) || isNaN(nuevaListaIdParsed)) {
      return NextResponse.json({ error: "ID de tarjeta, lista o nueva lista inválido" }, { status: 400 });
    }

    // Verificar que la tarjeta existe
    const tarjetaExistente = await prisma.tarjeta.findUnique({
      where: { id: tarjetaId },
    });

    if (!tarjetaExistente) {
      return NextResponse.json({ error: "La tarjeta no existe" }, { status: 404 });
    }

    // Verificar que la nueva lista existe
    const nuevaLista = await prisma.lista.findUnique({
      where: { id: nuevaListaIdParsed },
    });

    if (!nuevaLista) {
      return NextResponse.json({ error: "La nueva lista no existe" }, { status: 404 });
    }

    // Actualizar la tarjeta con la nueva lista y posición
    const tarjetaActualizada = await prisma.tarjeta.update({
      where: { id: tarjetaId },
      data: {
        listaId: nuevaListaIdParsed,  // Cambiar la lista de la tarjeta
        posicion: nuevaPosicion,  // Cambiar la posición de la tarjeta
      },
    });

    return NextResponse.json(tarjetaActualizada, { status: 200 });
  } catch (error) {
    console.error("Error al mover la tarjeta:", error);
    return NextResponse.json({ error: "Error al mover la tarjeta" }, { status: 500 });
  }
}
