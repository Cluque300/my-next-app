import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener todas las solicitudes pendientes (vacaciones y permisos)
export async function GET(req: Request) {
  try {
    // Obtener solicitudes de vacaciones pendientes
    const vacaciones = await prisma.vacaciones.findMany({
      where: {
        estado_solicitud: 'Pendiente',
      },
      include: {
        usuario: {
          select: { fullname: true },
        },
      },
    });

    // Obtener solicitudes de permisos pendientes
    const permisos = await prisma.permisos.findMany({
      where: {
        estado_solicitud: 'Pendiente',
      },
      include: {
        usuario: {
          select: { fullname: true },
        },
      },
    });

    // Combinar las dos listas y unificar el formato
    const solicitudes = [
      ...vacaciones.map(vacacion => ({
        id: vacacion.id,
        tipo_solicitud: 'vacaciones',
        estado_solicitud: vacacion.estado_solicitud,
        user: vacacion.usuario,
      })),
      ...permisos.map(permiso => ({
        id: permiso.id,
        tipo_solicitud: 'permisos',
        estado_solicitud: permiso.estado_solicitud,
        user: permiso.usuario,
      })),
    ];

    return NextResponse.json(solicitudes, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo solicitudes:', error);
    return NextResponse.json({ error: 'Error obteniendo solicitudes' }, { status: 500 });
  }
}
