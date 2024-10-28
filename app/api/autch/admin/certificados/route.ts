import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Directorio de almacenamiento para certificados
const CERTIFICADOS_UPLOAD_DIR = path.join(process.cwd(), 'uploads/certificados');

export async function POST(req: Request) {
  try {
    const isAdmin = true; // Implementar validación real en producción
    if (!isAdmin) {
      return NextResponse.json({ error: 'No tienes permiso para realizar esta acción.' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = parseInt(formData.get('userId') as string);
    const nombreCertificado = formData.get('nombre_certificado') as string;
    const usuarioSubeCertificado = formData.get('usuario_sube_certificado') as string; // Obtener el nombre del usuario que sube

    if (!file || isNaN(userId) || !nombreCertificado || !usuarioSubeCertificado) {
      return NextResponse.json({ error: 'Datos incompletos para subir el certificado.' }, { status: 400 });
    }

    const fileName = `${uuidv4()}_${file.name}`;
    const filePath = path.join(CERTIFICADOS_UPLOAD_DIR, fileName);

    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    const certificado = await prisma.certificados.create({
      data: {
        userId,
        nombre_certificado: nombreCertificado,
        archivo_certificado: `/uploads/certificados/${fileName}`,
        usuario_sube_certificado: usuarioSubeCertificado,
      },
    });

    return NextResponse.json(certificado, { status: 201 });
  } catch (error) {
    console.error('Error al subir certificado:', error);
    return NextResponse.json({ error: 'Error al subir el certificado.' }, { status: 500 });
  }
}
