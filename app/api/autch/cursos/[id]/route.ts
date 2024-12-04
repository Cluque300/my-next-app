import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Método para obtener un curso específico
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const curso = await prisma.cursos.findUnique({
      where: { id: Number(id) },
      include: {
        usuario: true, // Incluir datos del usuario que creó el curso
        inscripcion: true, // Incluir inscripciones
      },
    });

    if (!curso) {
      return NextResponse.json({ error: 'Curso no encontrado' }, { status: 404 });
    }

    return NextResponse.json(curso, { status: 200 });
  } catch (error) {
    console.error('Error fetching curso:', error);
    return NextResponse.json({ error: 'Error fetching curso' }, { status: 500 });
  }
}

// Método para manejar la actualización de un curso
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { nombre, descripcion, fecha_inicio, fecha_fin, ubicacion } = await request.json();

  try {
    const updatedCurso = await prisma.cursos.update({
      where: { id: Number(id) },
      data: {
        nombre,
        descripcion,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        ubicacion,
      },
    });

    return NextResponse.json(updatedCurso, { status: 200 });
  } catch (error) {
    console.error('Error updating curso:', error);
    return NextResponse.json({ error: 'Error updating curso' }, { status: 500 });
  }
}

// Método para manejar la eliminación de un curso
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.cursos.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Curso eliminado con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting curso:', error);
    return NextResponse.json({ error: 'Error deleting curso' }, { status: 500 });
  }
}

// Método para inscribirse en un curso
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { userId } = await request.json(); // Obtener el ID del usuario desde el cuerpo de la solicitud
  const cursoId = Number(params.id); // Obtener el ID del curso desde la ruta

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

