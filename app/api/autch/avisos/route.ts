// app/api/autch/avisos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Asegúrate de tener tu instancia de Prisma configurada

// Ruta para obtener y crear avisos
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId'); // Obtén el userId de los parámetros de la URL

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // Consultar los avisos del usuario desde la base de datos
    const avisos = await prisma.aviso.findMany({
      where: {
        userId: Number(userId), // Filtra por userId
      },
    });

    return NextResponse.json(avisos);
  } catch (error) {
    console.error('Error al obtener los avisos:', error);
    return NextResponse.json({ error: 'Error al obtener los avisos' }, { status: 500 });
  }
}

// Ruta para crear un nuevo aviso
export async function POST(request: Request) {
  try {
    const { description, date, userId } = await request.json(); // Obtén los datos del cuerpo de la solicitud

    // Validar que se haya proporcionado un userId
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // Validar que la fecha esté en formato ISO-8601
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    // Crear el nuevo aviso en la base de datos
    const nuevoAviso = await prisma.aviso.create({
      data: {
        description,
        date: parsedDate.toISOString(), // Convierte a formato ISO-8601
        userId: Number(userId), // Asegúrate de que sea un número
      },
    });

    return NextResponse.json(nuevoAviso, { status: 201 }); // Retorna el aviso creado
  } catch (error) {
    console.error('Error al crear el aviso:', error);
    return NextResponse.json({ error: 'Error al crear el aviso' }, { status: 500 });
  }
}
