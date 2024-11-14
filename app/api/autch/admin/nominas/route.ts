import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Manejo del método GET para obtener todas las nóminas
export async function GET(req: Request) {
  try {
    // Obtener todas las nóminas solicitadas por los usuarios
    const nominas = await prisma.nominas.findMany({
      include: {
        usuario: true, // Incluir datos del usuario que hizo la solicitud
      },
    });
    return NextResponse.json(nominas, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo nóminas:', error);
    return NextResponse.json({ error: 'Error obteniendo nóminas' }, { status: 500 });
  }
}
