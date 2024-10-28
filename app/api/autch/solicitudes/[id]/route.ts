import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener todas las solicitudes de un usuario específico
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id);

  if (!userId) {
    return NextResponse.json({ error: 'ID de usuario es requerido' }, { status: 400 });
  }

  try {
    // Obtener todas las solicitudes de vacaciones del usuario
    const vacaciones = await prisma.vacaciones.findMany({
      where: { userId },
      select: {
        id: true,
        estado_solicitud: true,
        createdAt: true,
        tipo_vacaciones: true,
      },
    });

    // Obtener todas las solicitudes de permisos del usuario
    const permisos = await prisma.permisos.findMany({
      where: { userId },
      select: {
        id: true,
        estado_solicitud: true,
        createdAt: true,
        motivo_permiso: true,
      },
    });

    // Unir las solicitudes de vacaciones y permisos en un solo array
    const solicitudes = [
      ...vacaciones.map((v) => ({ ...v, tipo_solicitud: 'vacaciones' })),
      ...permisos.map((p) => ({ ...p, tipo_solicitud: 'permisos' })),
    ];

    return NextResponse.json(solicitudes, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo solicitudes:', error);
    return NextResponse.json({ error: 'Error obteniendo solicitudes' }, { status: 500 });
  }
}
