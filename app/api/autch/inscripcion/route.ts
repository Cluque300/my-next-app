import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Método para obtener todas las inscripciones de un usuario
export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const inscripciones = await prisma.inscripcionCursos.findMany({
      where: { userId: Number(userId) },
      include: {
        curso: true, // Incluir datos del curso
      },
    });
    return NextResponse.json(inscripciones, { status: 200 });
  } catch (error) {
    console.error('Error fetching inscripciones:', error);
    return NextResponse.json({ error: 'Error fetching inscripciones' }, { status: 500 });
  }
}

// Método para inscribirse en un curso
export async function POST(request: Request) {
  const { userId, cursoId } = await request.json(); // Obtener el ID del usuario y curso desde el cuerpo de la solicitud

  try {
    const existingInscripcion = await prisma.inscripcionCursos.findUnique({
      where: {
        userId_cursoId: {
          userId,
          cursoId,
        },
      },
    });

    // Verifica si el usuario ya está inscrito en el curso
    if (existingInscripcion) {
      return NextResponse.json({ message: 'Ya estás inscrito en este curso' }, { status: 400 });
    }

    const inscripcion = await prisma.inscripcionCursos.create({
      data: {
        userId,
        cursoId,
      },
    });
    return NextResponse.json(inscripcion, { status: 201 });
  } catch (error) {
    console.error('Error inscribiendo en el curso:', error);
    return NextResponse.json({ error: 'Error inscribiendo en el curso' }, { status: 500 });
  }
}
