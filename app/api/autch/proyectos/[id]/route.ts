import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
  }

  try {
    // Obtener los proyectos relacionados con el usuario a través de la tabla intermedia ProjectUser
    const proyectos = await prisma.project.findMany({
      where: {
        projectUsers: {
          some: {
            userId: userId, // Consultar la relación desde ProjectUser
          },
        },
      },
      include: {
        projectUsers: {
          include: {
            user: true, // Incluir los datos del colaborador
          },
        },
      },
    });

    // Transformar los datos para incluir colaboradores de forma más directa
    const proyectosConColaboradores = proyectos.map((proyecto) => ({
      ...proyecto,
      colaboradores: proyecto.projectUsers.map((pu) => ({
        id: pu.user.id,
        fullname: pu.user.fullname,
      })),
    }));

    return NextResponse.json(proyectosConColaboradores, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
    return NextResponse.json({ error: 'Error obteniendo proyectos' }, { status: 500 });
  }
}
