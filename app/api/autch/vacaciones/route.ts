import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener todas las vacaciones de un usuario
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Falta el ID del usuario' }, { status: 400 });
  }

  try {
    const vacaciones = await prisma.vacaciones.findMany({
      where: { userId: parseInt(userId) },
    });

    return NextResponse.json(vacaciones, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error obteniendo vacaciones' }, { status: 500 });
  }
}

// Crear una nueva solicitud de vacaciones
export async function POST(req: Request) {
  const { tipo_vacaciones, fecha_inicio, fecha_fin, userId } = await req.json();

  if (!tipo_vacaciones || !fecha_inicio || !fecha_fin || !userId) {
    return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
  }

  // Calcular la cantidad de días de vacaciones
  const dias_vacaciones = Math.ceil(
    (new Date(fecha_fin).getTime() - new Date(fecha_inicio).getTime()) / (1000 * 60 * 60 * 24)
  ) + 1; // Se suma 1 para incluir tanto la fecha de inicio como la fecha de fin.

  try {
    const newVacaciones = await prisma.vacaciones.create({
      data: {
        tipo_vacaciones,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        dias_vacaciones: dias_vacaciones,
        dias_restantes: dias_vacaciones, // Inicialmente, se asume que tiene todos los días restantes
        userId: parseInt(userId),
      },
    });

    return NextResponse.json(newVacaciones, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creando vacaciones' }, { status: 500 });
  }
}
