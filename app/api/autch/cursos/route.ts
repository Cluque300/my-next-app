import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Método para obtener todos los cursos
export async function GET() {
  try {
    const cursos = await prisma.cursos.findMany({
      include: {
        usuario: true, // Incluir datos del usuario que creó el curso
      },
    });
    return NextResponse.json(cursos, { status: 200 });
  } catch (error) {
    console.error('Error fetching cursos:', error);
    return NextResponse.json({ error: 'Error fetching cursos' }, { status: 500 });
  }
}

// Método para crear un nuevo curso
export async function POST(request: Request) {
  const { nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, userId } = await request.json();

  try {
    const newCurso = await prisma.cursos.create({
      data: {
        nombre,
        descripcion,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        ubicacion,
        userId,
      },
    });
    return NextResponse.json(newCurso, { status: 201 });
  } catch (error) {
    console.error('Error creating curso:', error);
    return NextResponse.json({ error: 'Error creating curso' }, { status: 500 });
  }
}
