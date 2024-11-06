import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user')?.value;

    if (!userCookie) {
        return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
    }

    // Parsea el JSON para obtener el userId
    const userData = JSON.parse(userCookie);
    const userId = userData.id;

    if (!userId) {
        return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
    }

    try {
        const certificados = await prisma.certificados.findMany({
            where: { userId },
            select: {
                id_certificado: true,
                nombre_certificado: true,
                fecha_subida: true,
                archivo_certificado: true,
                usuario_sube_certificado: true, // Mantenemos esta línea para el usuario que subió el certificado
                usuario: { // Incluimos la relación para obtener el usuario que solicitó
                    select: {
                        id: true,
                        username: true, // O cualquier otro campo que desees mostrar
                    },
                },
            },
        });

        return NextResponse.json(certificados, { status: 200 });
    } catch (error) {
        console.error('Error obteniendo certificados:', error);
        return NextResponse.json({ error: 'Error obteniendo certificados' }, { status: 500 });
    }
}
