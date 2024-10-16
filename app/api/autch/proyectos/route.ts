import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';

const allowedExtensions = ['.jpg', '.jpeg', '.png'];

export async function POST(req: Request) {
  const formData = await req.formData();
  const nombre_proyecto = formData.get('nombre_proyecto')?.toString() || '';
  const descripcion = formData.get('descripcion')?.toString() || '';
  const imagen_proyecto = formData.get('imagen_proyecto') as File;
  const userId = formData.get('userId')?.toString();
  const colaboradores = JSON.parse(formData.get('colaboradores')?.toString() || '[]'); // Colaboradores

  if (!nombre_proyecto || !descripcion || !userId) {
    return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
  }

  let imageName: string | null = null;

  if (imagen_proyecto) {
    const fileExtension = path.extname(imagen_proyecto.name).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json({ error: 'Formato de imagen no permitido' }, { status: 400 });
    }

    imageName = `${uuidv4()}${fileExtension}`;
    const uploadDir = path.join(process.cwd(), 'public/images/proyectos');
    await fs.mkdir(uploadDir, { recursive: true });
    const uploadPath = path.join(uploadDir, imageName);

    const buffer = Buffer.from(await imagen_proyecto.arrayBuffer());
    await fs.writeFile(uploadPath, buffer);
  }

  const userIdNumber = parseInt(userId);
  if (isNaN(userIdNumber)) {
    return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
  }

  try {
    // Crear el proyecto
    const project = await prisma.project.create({
      data: {
        nombre_proyecto,
        descripcion,
        imagen_proyecto: imageName,
      },
    });

    // Asociar el creador y los colaboradores al proyecto
    await prisma.projectUser.createMany({
      data: [
        { userId: userIdNumber, projectId: project.id, fecha_inicio_user: new Date(), estado_usuario: 'Activo' },
        ...colaboradores.map((colaboradorId: number) => ({
          userId: colaboradorId,
          projectId: project.id,
          fecha_inicio_user: new Date(),
          estado_usuario: 'Colaborador',
        })),
      ],
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creando proyecto:', error);
    return NextResponse.json({ error: 'Error creando proyecto' }, { status: 500 });
  }
}
