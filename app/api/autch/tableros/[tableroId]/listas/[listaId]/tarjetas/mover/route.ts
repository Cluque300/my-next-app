import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { tableroId: string; listaId: string } }) {
  const { tableroId, listaId } = params;
  const { tarjetaId } = await req.json(); // Obtener tarjetaId del cuerpo de la solicitud

  if (!tarjetaId) {
    console.error('tarjetaId no proporcionado en el cuerpo de la solicitud');
    return NextResponse.json({ message: 'Falta el parámetro tarjetaId en la solicitud' }, { status: 400 });
  }

  const tableroIdNumber = parseInt(tableroId, 10);
  const listaIdNumber = parseInt(listaId, 10);
  const tarjetaIdNumber = parseInt(tarjetaId, 10);

  if (isNaN(tableroIdNumber) || isNaN(listaIdNumber) || isNaN(tarjetaIdNumber)) {
    console.error(`Parámetros inválidos: tableroId(${tableroId}), listaId(${listaId}), tarjetaId(${tarjetaId})`);
    return NextResponse.json({ message: 'Los parámetros proporcionados no son válidos' }, { status: 400 });
  }

  console.log('Datos recibidos:', { tableroId, listaId, tarjetaId });
  console.log('Valores convertidos:', { tableroIdNumber, listaIdNumber, tarjetaIdNumber });

  try {
    // Paso 1: Obtener la tarjeta desde el tablero
    const tarjeta = await prisma.tarjeta.findUnique({
      where: { id: tarjetaIdNumber },
      include: { lista: true },
    });

    if (!tarjeta) {
      console.error('La tarjeta no fue encontrada en la base de datos');
      return NextResponse.json({ message: "Tarjeta no encontrada" }, { status: 404 });
    }

    console.log('Tarjeta encontrada:', tarjeta);

    // Paso 2: Verificar que la lista de destino exista
    const listaDestino = await prisma.lista.findUnique({
      where: { id: listaIdNumber },
    });

    if (!listaDestino) {
      console.error('La lista de destino no fue encontrada');
      return NextResponse.json({ message: "La lista de destino no existe" }, { status: 404 });
    }

    console.log('Lista de destino encontrada:', listaDestino);

    // Paso 3: Actualizar la tarjeta para moverla a la nueva lista
    const tarjetaMovida = await prisma.tarjeta.update({
      where: { id: tarjetaIdNumber },
      data: {
        listaId: listaIdNumber, // Cambiar la lista de la tarjeta
        updatedAt: new Date(), // Actualizar la fecha de modificación
      },
    });

    console.log('Tarjeta movida correctamente:', tarjetaMovida);

    return NextResponse.json({ message: "Tarjeta movida correctamente", tarjeta: tarjetaMovida });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al mover la tarjeta:', error);
      return NextResponse.json({ message: "Error al mover la tarjeta", error: error.message }, { status: 500 });
    }
    console.error('Error desconocido al mover la tarjeta');
    return NextResponse.json({ message: "Error desconocido al mover la tarjeta" }, { status: 500 });
  }
}
