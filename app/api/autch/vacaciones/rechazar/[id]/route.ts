import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Rechazar una solicitud de vacaciones
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const vacationId = parseInt(params.id);

  if (isNaN(vacationId)) {
    return NextResponse.json({ error: 'ID de vacaciones inválido' }, { status: 400 });
  }

  try {
    const updatedVacation = await prisma.vacaciones.update({
      where: { id: vacationId }, // Asegúrate de usar 'id_vacaciones' si ese es el campo correcto en tu esquema
      data: { estado_solicitud: 'Rechazado' },
    });
    return NextResponse.json(updatedVacation, { status: 200 });
  } catch (error) {
    console.error('Error rechazando la solicitud:', error);
    return NextResponse.json({ error: 'Error rechazando la solicitud' }, { status: 500 });
  }
}
