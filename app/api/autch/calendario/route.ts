// app/api/autch/calendario/route.ts
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma'; // Asegúrate de usar la importación correcta

export async function GET() {
  try {
    const events = await prisma.calendarEvent.findMany({
      orderBy: {
        start: 'asc', // Ordenar por fecha de inicio
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  // Extraer datos del cuerpo de la solicitud
  const { title, start, end, description, userId } = await request.json();

  try {
    // Crear un nuevo evento de calendario
    const newEvent = await prisma.calendarEvent.create({
      data: {
        title,
        start: new Date(start),
        end: new Date(end),
        description,
        user: { connect: { id: userId } }, // Conectar el evento al usuario
      },
    });
    // Retornar el evento creado
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return NextResponse.error();
  }
}
