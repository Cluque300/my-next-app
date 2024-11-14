// /app/api/autch/admin/certificados/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Ruta completa para guardar archivos en 'public/uploads/certificados'
const CERTIFICADOS_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'certificados');

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const idCertificado = parseInt(formData.get('id_certificado') as string);

        if (!file || isNaN(idCertificado)) {
            return NextResponse.json({ error: 'Datos incompletos para subir el certificado.' }, { status: 400 });
        }

        // Verifica si la carpeta 'uploads/certificados' existe, y la crea si no
        if (!fs.existsSync(CERTIFICADOS_UPLOAD_DIR)) {
            fs.mkdirSync(CERTIFICADOS_UPLOAD_DIR, { recursive: true });
        }

        const fileName = `${uuidv4()}_${file.name}`;
        const filePath = path.join(CERTIFICADOS_UPLOAD_DIR, fileName);

        const buffer = await file.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));

        // Actualiza la base de datos con la ruta del archivo subido
        const certificado = await prisma.certificados.update({
            where: { id_certificado: idCertificado },
            data: {
                archivo_certificado: `/uploads/certificados/${fileName}`,
                usuario_sube_certificado: 'ADMIN',
            },
        });

        return NextResponse.json(certificado, { status: 201 });
    } catch (error) {
        console.error('Error al subir certificado:', error);
        return NextResponse.json({ error: 'Error al subir el certificado.' }, { status: 500 });
    }
}
