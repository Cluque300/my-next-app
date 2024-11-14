import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user')?.value;

    if (!userCookie) {
        return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
    }

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
                usuario: { // Agregar la relación de usuario para obtener el nombre
                    select: {
                        username: true, // El nombre de usuario de quien hizo la solicitud
                    }
                }
            },
        });

        return NextResponse.json(certificados, { status: 200 });
    } catch (error) {
        console.error('Error obteniendo certificados:', error);
        return NextResponse.json({ error: 'Error obteniendo certificados' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user')?.value;

    if (!userCookie) {
        return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
    }

    const userData = JSON.parse(userCookie);
    const userId = userData.id;

    if (!userId) {
        return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
    }

    try {
        const { nombre_certificado } = await req.json();

        const solicitud = await prisma.certificados.create({
            data: {
                nombre_certificado,
                userId,
                fecha_subida: new Date(),  // Usa la fecha actual
                archivo_certificado: "",   // Cadena vacía como marcador de posición
                usuario_sube_certificado: "pendiente",  // Marca el estado de la solicitud
            },
        });

        return NextResponse.json(solicitud, { status: 201 });
    } catch (error) {
        console.error('Error registrando la solicitud de certificado:', error);
        return NextResponse.json({ error: 'Error al solicitar el certificado' }, { status: 500 });
    }
}
