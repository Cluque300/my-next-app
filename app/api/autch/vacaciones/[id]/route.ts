import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener una solicitud de vacaciones por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const vacacionesId = parseInt(params.id);

  if (isNaN(vacacionesId)) {
    return NextResponse.json({ error: 'ID de vacaciones inválido' }, { status: 400 });
  }

  try {
    const vacaciones = await prisma.vacaciones.findUnique({
      where: { id: vacacionesId },
    });

    if (!vacaciones) {
      return NextResponse.json({ error: 'Vacaciones no encontradas' }, { status: 404 });
    }

    return NextResponse.json(vacaciones, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error obteniendo vacaciones' }, { status: 500 });
  }
}

// Actualizar una solicitud de vacaciones existente
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const vacacionesId = parseInt(params.id);
  const { tipo_vacaciones, fecha_inicio, fecha_fin, estado_solicitud } = await req.json();

  if (isNaN(vacacionesId)) {
    return NextResponse.json({ error: 'ID de vacaciones inválido' }, { status: 400 });
  }

  try {
    const updatedVacaciones = await prisma.vacaciones.update({
      where: { id: vacacionesId },
      data: {
        tipo_vacaciones,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        estado_solicitud,
      },
    });

    return NextResponse.json(updatedVacaciones, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error actualizando vacaciones' }, { status: 500 });
  }
}

// Eliminar una solicitud de vacaciones
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const vacacionesId = parseInt(params.id);

  if (isNaN(vacacionesId)) {
    return NextResponse.json({ error: 'ID de vacaciones inválido' }, { status: 400 });
  }

  try {
    await prisma.vacaciones.delete({
      where: { id: vacacionesId },
    });

    return NextResponse.json({ message: 'Vacaciones eliminadas correctamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error eliminando vacaciones' }, { status: 500 });
  }
}
