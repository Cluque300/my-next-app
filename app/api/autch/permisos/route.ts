import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener todos los permisos de un usuario
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Falta el ID del usuario' }, { status: 400 });
  }

  try {
    const permisos = await prisma.permisos.findMany({
      where: { userId: parseInt(userId) },
    });

    return NextResponse.json(permisos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error obteniendo permisos' }, { status: 500 });
  }
}

// Crear un nuevo permiso
export async function POST(req: Request) {
  const { motivo_permiso, fecha_inicio, fecha_fin, userId } = await req.json();

  if (!motivo_permiso || !fecha_inicio || !fecha_fin || !userId) {
    return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
  }

  // Calcular la duración del permiso en horas y minutos
  const start = new Date(fecha_inicio);
  const end = new Date(fecha_fin);
  const diffMs = end.getTime() - start.getTime(); // Diferencia en milisegundos
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Convertir a horas
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Convertir el sobrante a minutos

  const horas_de_permiso = `${diffHours} horas y ${diffMinutes} minutos`;

  try {
    const newPermiso = await prisma.permisos.create({
      data: {
        motivo_permiso,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        horas_de_permiso, // Aquí se asigna el cálculo de las horas
        userId: parseInt(userId),
      },
    });

    return NextResponse.json(newPermiso, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creando permiso' }, { status: 500 });
  }
}
