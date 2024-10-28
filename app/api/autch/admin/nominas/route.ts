import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Directorio de almacenamiento para nóminas
const NOMINAS_UPLOAD_DIR = path.join(process.cwd(), 'uploads/nominas');

export async function POST(req: Request) {
  try {
    // Verifica si el usuario es administrador
    const isAdmin = true; // Implementar validación real en producción
    if (!isAdmin) {
      return NextResponse.json({ error: 'No tienes permiso para realizar esta acción.' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = parseInt(formData.get('userId') as string);
    const nombreNomina = formData.get('nombre_nomina') as string;
    const usuarioSubeNomina = formData.get('usuario_sube_nomina') as string; // Obtener el nombre del usuario que sube la nómina

    if (!file || isNaN(userId) || !nombreNomina || !usuarioSubeNomina) {
      return NextResponse.json({ error: 'Datos incompletos para subir la nómina.' }, { status: 400 });
    }

    const fileName = `${uuidv4()}_${file.name}`;
    const filePath = path.join(NOMINAS_UPLOAD_DIR, fileName);

    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    const nomina = await prisma.nominas.create({
      data: {
        userId,
        nombre_nomina: nombreNomina,
        archivo_nomina: `/uploads/nominas/${fileName}`,
        usuario_sube_nomina: usuarioSubeNomina,
      },
    });

    return NextResponse.json(nomina, { status: 201 });
  } catch (error) {
    console.error('Error al subir nómina:', error);
    return NextResponse.json({ error: 'Error al subir la nómina.' }, { status: 500 });
  }
}
