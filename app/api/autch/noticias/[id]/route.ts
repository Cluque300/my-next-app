import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Obtener una noticia específica
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const noticia = await prisma.noticia.findUnique({
            where: { id: Number(id) },
        });
        return NextResponse.json(noticia);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener la noticia' }, { status: 500 });
    }
}

// PUT: Actualizar una noticia específica
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { titulo, descripcion } = await request.json();

    try {
        const noticia = await prisma.noticia.update({
            where: { id: Number(id) },
            data: { titulo, descripcion, fechaPublicacion: new Date() },
        });
        return NextResponse.json(noticia);
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar la noticia' }, { status: 500 });
    }
}

// DELETE: Eliminar una noticia específica
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.noticia.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: 'Noticia eliminada con éxito' });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar la noticia' }, { status: 500 });
    }
}
