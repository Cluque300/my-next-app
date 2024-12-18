import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

// Definición de tipos para los parámetros
interface Params {
  id: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = params;

  try {
    const nomina = await prisma.nominas.findUnique({
      where: { id_nomina: parseInt(id) },
      include: { usuario: true }, // Incluir el usuario que subió la nómina si es necesario
    });

    if (!nomina) {
      return NextResponse.json({ error: 'Nómina no encontrada' }, { status: 404 });
    }

    return NextResponse.json(nomina, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo nómina:', error);
    return NextResponse.json({ error: 'Error obteniendo nómina' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Params }) {
  const { id } = params;
  const body = await req.formData();
  const archivo_nomina = body.get('archivo_nomina') as File;

  if (!archivo_nomina) {
    return NextResponse.json({ error: 'Se requiere el archivo de nómina' }, { status: 400 });
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public/nominadocs');
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${id}-${archivo_nomina.name}`;
    const uploadPath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await archivo_nomina.arrayBuffer());
    await fs.writeFile(uploadPath, buffer);

    await prisma.nominas.update({
      where: { id_nomina: parseInt(id) },
      data: { archivo_nomina: fileName }, // Guarda el nombre del archivo
    });

    return NextResponse.json({ message: 'Archivo de nómina subido con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error subiendo el archivo de nómina:', error);
    return NextResponse.json({ error: 'Error subiendo el archivo de nómina' }, { status: 500 });
  }
}
