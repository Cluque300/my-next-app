// app/api/inventario/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Asegúrate de que este archivo esté configurado correctamente

export async function GET() {
  try {
    const inventario = await prisma.inventario.findMany();
    return NextResponse.json(inventario, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener el inventario' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id_elemento, nombre_elemento, descripcion, cantidad, ubicacion, tipo_elemento, imagen, categoria, userId } = body;

  // Verifica que id_elemento y cantidad estén presentes
  if (!id_elemento || cantidad === undefined) {
    return NextResponse.json({ error: 'El campo id_elemento y cantidad son obligatorios.' }, { status: 400 });
  }

  try {
    const nuevoElemento = await prisma.inventario.create({
      data: {
        id_elemento,
        nombre_elemento,
        descripcion,
        cantidad: parseInt(cantidad), // Convertir cantidad a número entero
        ubicacion,
        tipo_elemento,
        imagen,
        categoria,
        userId: userId || null, // Relación opcional con el usuario
      },
    });
    return NextResponse.json(nuevoElemento, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear el elemento:", error.message); // Registra el mensaje de error
      return NextResponse.json({ error: 'Error al crear el elemento', details: error.message }, { status: 500 });
    } else {
      console.error("Error desconocido:", error);
      return NextResponse.json({ error: 'Error al crear el elemento', details: 'Error desconocido' }, { status: 500 });
    }
  }
}
