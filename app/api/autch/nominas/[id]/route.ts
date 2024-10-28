import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener una nómina específica por id_nomina
export async function GET(req: Request, context: { params: { id: string } }) {
  const nominaId = parseInt(context.params.id);

  if (isNaN(nominaId)) {
    return NextResponse.json({ error: 'ID de nómina inválido' }, { status: 400 });
  }

  try {
    const nomina = await prisma.nominas.findUnique({
      where: { id_nomina: nominaId },
      select: {
        id_nomina: true,
        nombre_nomina: true,
        fecha_subida: true,
        archivo_nomina: true,
      },
    });

    if (!nomina) {
      return NextResponse.json({ error: 'Nómina no encontrada' }, { status: 404 });
    }

    return NextResponse.json(nomina, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo la nómina:', error);
    return NextResponse.json({ error: 'Error obteniendo la nómina' }, { status: 500 });
  }
}
