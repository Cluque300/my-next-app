// /app/api/autch/admin/certificados/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Directorio de almacenamiento para certificados
const CERTIFICADOS_UPLOAD_DIR = path.join(process.cwd(), 'uploads/certificados');

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const idCertificado = parseInt(formData.get('id_certificado') as string); // Obtenemos el id del certificado

        if (!file || isNaN(idCertificado)) {
            return NextResponse.json({ error: 'Datos incompletos para subir el certificado.' }, { status: 400 });
        }

        const fileName = `${uuidv4()}_${file.name}`;
        const filePath = path.join(CERTIFICADOS_UPLOAD_DIR, fileName);

        const buffer = await file.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));

        // Actualizar la solicitud del certificado del usuario con el archivo subido
        const certificado = await prisma.certificados.update({
            where: { id_certificado: idCertificado }, // Usar id_certificado para actualizar
            data: {
                archivo_certificado: `/uploads/certificados/${fileName}`,
                usuario_sube_certificado: 'ADMIN', // O el nombre del admin que sube, si es necesario
            },
        });

        return NextResponse.json(certificado, { status: 201 });
    } catch (error) {
        console.error('Error al subir certificado:', error);
        return NextResponse.json({ error: 'Error al subir el certificado.' }, { status: 500 });
    }
}
