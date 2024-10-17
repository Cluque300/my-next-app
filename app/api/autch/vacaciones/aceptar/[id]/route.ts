import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Aceptar una solicitud de vacaciones
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const vacationId = parseInt(params.id);
  
  if (!vacationId) {
    return NextResponse.json({ error: 'ID de vacaciones es requerido' }, { status: 400 });
  }

  try {
    const updatedVacation = await prisma.vacaciones.update({
      where: { id: vacationId }, // Usamos 'id', que es la clave primaria de vacaciones
      data: { estado_solicitud: 'Aceptado' }, // Actualizamos el estado a 'Aceptado'
    });
    return NextResponse.json(updatedVacation, { status: 200 });
  } catch (error) {
    console.error('Error aceptando la solicitud:', error);
    return NextResponse.json({ error: 'Error aceptando la solicitud' }, { status: 500 });
  }
}
