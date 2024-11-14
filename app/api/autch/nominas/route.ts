import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const nominas = await prisma.nominas.findMany({
      include: {
        usuario: true, // Incluir datos del usuario que hizo la solicitud
      },
    });
    return NextResponse.json(nominas, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo nóminas:', error);
    return NextResponse.json({ error: 'Error obteniendo nóminas' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const userId = body.userId; // ID del usuario que solicita la nómina
  const nombre_nomina = body.nombre_nomina; // Nombre de la nómina
  const archivo_nomina = body.archivo_nomina || null; // Ruta del archivo, puede ser nulo

  // Validación de campos
  if (!userId || !nombre_nomina) {
    return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
  }

  try {
    const nuevaNomina = await prisma.nominas.create({
      data: {
        userId: parseInt(userId), // Conectar el ID del usuario
        usuario_sube_nomina: nombre_nomina, // Guardar el nombre de la nómina
        nombre_nomina: nombre_nomina, // Guardar el nombre de la nómina
        archivo_nomina: archivo_nomina, // Ruta del archivo (puede ser nulo)
      },
    });

    return NextResponse.json(nuevaNomina, { status: 201 });
  } catch (error) {
    console.error('Error creando nómina:', error);
    return NextResponse.json({ error: 'Error creando nómina' }, { status: 500 });
  }
}
