import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener todos los certificados del usuario autenticado o solicitar uno nuevo
export async function GET(req: Request) {
  const userId = 1; // Supón que se obtiene del contexto de autenticación

  if (!userId) {
    return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
  }

  try {
    const certificados = await prisma.certificados.findMany({
      where: { userId },
      select: {
        id_certificado: true,
        nombre_certificado: true,
        usuario_sube_certificado: true,
        fecha_subida: true,
        archivo_certificado: true,
      },
    });

    return NextResponse.json(certificados, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo certificados:', error);
    return NextResponse.json({ error: 'Error obteniendo certificados' }, { status: 500 });
  }
}

// Solicitar un nuevo certificado
export async function POST(req: Request) {
  const userId = 1; // Supón que se obtiene del contexto de autenticación
  if (!userId) {
    return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
  }

  try {
    const { nombre_certificado } = await req.json();
    const nuevoCertificado = await prisma.certificados.create({
      data: {
        userId,
        nombre_certificado,
        usuario_sube_certificado: 'Pendiente', // Indica que el certificado fue solicitado y está pendiente de subida
        archivo_certificado: '', // El archivo se subirá en otro momento
        fecha_subida: new Date(),
      },
    });

    return NextResponse.json(nuevoCertificado, { status: 201 });
  } catch (error) {
    console.error('Error solicitando certificado:', error);
    return NextResponse.json({ error: 'Error solicitando certificado' }, { status: 500 });
  }
}
