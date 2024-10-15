import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Asegúrate de que esta importación esté correcta

// Obtener un evento específico
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const event = await prisma.calendarEvent.findUnique({
      where: { id: Number(id) }, // Convertimos el id a número
    });

    if (!event) {
      return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error obteniendo el evento:', error);
    return NextResponse.error();
  }
}

// Actualizar un evento
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, start, end, description } = await request.json();

  try {
    const updatedEvent = await prisma.calendarEvent.update({
      where: { id: Number(id) },
      data: {
        title,
        start: new Date(start),
        end: new Date(end),
        description,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error actualizando el evento:', error);
    return NextResponse.error();
  }
}

// Eliminar un evento
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.calendarEvent.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Evento eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando el evento:', error);
    return NextResponse.error();
  }
}
