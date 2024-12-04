import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

// Ruta para guardar las imágenes
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Asegúrate de que la carpeta de uploads exista
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// GET: Obtener una noticia específica
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const noticia = await prisma.noticia.findUnique({
            where: { id: Number(id) },
        });
        return NextResponse.json(noticia);
    } catch (error) {
        console.error('Error al obtener la noticia:', error);
        return NextResponse.json({ error: 'Error al obtener la noticia' }, { status: 500 });
    }
}

// PUT: Actualizar una noticia específica
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const formData = await request.formData();
        const titulo = formData.get('titulo')?.toString();
        const descripcion = formData.get('descripcion')?.toString();
        const imagenFile = formData.get('imagen') as File | null;

        if (!titulo || !descripcion) {
            return NextResponse.json({ error: 'Título y descripción son obligatorios' }, { status: 400 });
        }

        let imagenUrl: string | null = null;

        // Manejar la subida de imagen si está presente
        if (imagenFile && imagenFile.size > 0) {
            const buffer = await imagenFile.arrayBuffer();
            const fileName = `${Date.now()}-${imagenFile.name}`;
            const filePath = path.join(UPLOAD_DIR, fileName);
            fs.writeFileSync(filePath, Buffer.from(buffer));
            imagenUrl = `/uploads/${fileName}`;
        }

        const updateData: any = { titulo, descripcion, fechaPublicacion: new Date() };

        // Solo actualizar la imagen si hay una nueva
        if (imagenUrl) {
            updateData.imagen = imagenUrl;
        }

        const noticia = await prisma.noticia.update({
            where: { id: Number(id) },
            data: updateData,
        });

        return NextResponse.json(noticia);
    } catch (error) {
        console.error('Error al actualizar la noticia:', error);
        return NextResponse.json({ error: 'Error al actualizar la noticia' }, { status: 500 });
    }
}

// DELETE: Eliminar una noticia específica
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const noticia = await prisma.noticia.findUnique({ where: { id: Number(id) } });

        // Eliminar la imagen asociada si existe
        if (noticia?.imagen) {
            const filePath = path.join(process.cwd(), 'public', noticia.imagen);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await prisma.noticia.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: 'Noticia eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la noticia:', error);
        return NextResponse.json({ error: 'Error al eliminar la noticia' }, { status: 500 });
    }
}
