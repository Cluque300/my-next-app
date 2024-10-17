import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Rechazar una solicitud de permiso
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const permisoId = parseInt(params.id);

  if (isNaN(permisoId)) {
    return NextResponse.json({ error: 'ID de permiso inválido' }, { status: 400 });
  }

  try {
    const updatedPermiso = await prisma.permisos.update({
      where: { id: permisoId }, // Asegúrate de usar el nombre correcto del campo en tu esquema
      data: { estado_solicitud: 'Rechazado' },
    });
    return NextResponse.json(updatedPermiso, { status: 200 });
  } catch (error) {
    console.error('Error rechazando la solicitud:', error);
    return NextResponse.json({ error: 'Error rechazando la solicitud' }, { status: 500 });
  }
}
