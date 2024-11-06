import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const certificadoId = parseInt(params.id);

    if (isNaN(certificadoId)) {
        return NextResponse.json({ error: 'ID de certificado inválido' }, { status: 400 });
    }

    try {
        const certificado = await prisma.certificados.findUnique({
            where: { id_certificado: certificadoId },
            select: {
                id_certificado: true,
                nombre_certificado: true,
                fecha_subida: true,
                archivo_certificado: true,
            },
        });

        if (!certificado) {
            return NextResponse.json({ error: 'Certificado no encontrado' }, { status: 404 });
        }

        return NextResponse.json(certificado, { status: 200 });
    } catch (error) {
        console.error('Error obteniendo el certificado:', error);
        return NextResponse.json({ error: 'Error obteniendo el certificado' }, { status: 500 });
    }
}
