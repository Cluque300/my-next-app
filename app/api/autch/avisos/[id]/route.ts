// app/api/autch/avisos/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Asegúrate de tener tu instancia de Prisma configurada

// Ruta para eliminar un aviso por ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const avisoId = Number(params.id); // Convertir el ID a número

    // Validar que el ID sea un número válido
    if (isNaN(avisoId)) {
      return NextResponse.json({ error: 'Invalid aviso ID' }, { status: 400 });
    }

    // Eliminar el aviso de la base de datos
    await prisma.aviso.delete({
      where: { id: avisoId },
    });

    return NextResponse.json({ message: 'Aviso eliminado' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar el aviso:', error);
    return NextResponse.json({ error: 'Error al eliminar el aviso' }, { status: 500 });
  }
}
