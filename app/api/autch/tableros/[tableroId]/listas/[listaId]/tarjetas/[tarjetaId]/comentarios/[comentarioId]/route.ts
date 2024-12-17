import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Importamos la instancia de Prisma

export async function DELETE(req: NextRequest, { params }: { params: { tableroId: string, listaId: string, tarjetaId: string, comentarioId: string } }) {
  const { comentarioId } = params;

  try {
    // Verificamos que el comentario exista
    const comentario = await prisma.comentario.findUnique({
      where: { id: Number(comentarioId) },
    });

    if (!comentario) {
      return NextResponse.json({ error: 'Comentario no encontrado' }, { status: 404 });
    }

    // Eliminamos el comentario
    await prisma.comentario.delete({
      where: { id: Number(comentarioId) },
    });

    return NextResponse.json({ message: 'Comentario eliminado' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al eliminar el comentario' }, { status: 500 });
  }
}
