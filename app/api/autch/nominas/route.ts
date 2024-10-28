import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener todas las nóminas del usuario autenticado
export async function GET(req: Request) {
  // Obtén el userId desde el token o autenticación de sesión
  const userId = 1; // Supón que se obtiene del contexto de autenticación

  if (!userId) {
    return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
  }

  try {
    const nominas = await prisma.nominas.findMany({
      where: { userId },
      select: {
        id_nomina: true,
        nombre_nomina: true,
        fecha_subida: true,
        archivo_nomina: true,
      },
    });

    return NextResponse.json(nominas, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo nóminas:', error);
    return NextResponse.json({ error: 'Error obteniendo nóminas' }, { status: 500 });
  }
}
