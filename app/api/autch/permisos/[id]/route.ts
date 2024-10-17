import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener un permiso por su ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const permisoId = parseInt(params.id);

  if (isNaN(permisoId)) {
    return NextResponse.json({ error: 'ID de permiso inválido' }, { status: 400 });
  }

  try {
    const permiso = await prisma.permisos.findUnique({
      where: { id: permisoId },
    });

    if (!permiso) {
      return NextResponse.json({ error: 'Permiso no encontrado' }, { status: 404 });
    }

    return NextResponse.json(permiso, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error obteniendo permiso' }, { status: 500 });
  }
}

// Actualizar un permiso existente
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const permisoId = parseInt(params.id);
  const { motivo_permiso, fecha_inicio, fecha_fin, estado_solicitud } = await req.json();

  if (isNaN(permisoId)) {
    return NextResponse.json({ error: 'ID de permiso inválido' }, { status: 400 });
  }

  try {
    const updatedPermiso = await prisma.permisos.update({
      where: { id: permisoId },
      data: {
        motivo_permiso,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        estado_solicitud,
      },
    });

    return NextResponse.json(updatedPermiso, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error actualizando permiso' }, { status: 500 });
  }
}

// Eliminar un permiso existente
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const permisoId = parseInt(params.id);

  if (isNaN(permisoId)) {
    return NextResponse.json({ error: 'ID de permiso inválido' }, { status: 400 });
  }

  try {
    await prisma.permisos.delete({
      where: { id: permisoId },
    });

    return NextResponse.json({ message: 'Permiso eliminado correctamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error eliminando permiso' }, { status: 500 });
  }
}
