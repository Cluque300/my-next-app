import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Obtener todas las noticias
export async function GET() {
    try {
        const noticias = await prisma.noticia.findMany({
            orderBy: { fechaPublicacion: 'desc' }, // Asegúrate de que este nombre de campo coincida con tu modelo
        });
        return NextResponse.json(noticias);
    } catch (error) {
        console.error('Error al obtener noticias:', error); // Agrega un log para el error
        return NextResponse.json({ error: 'Error al obtener noticias' }, { status: 500 });
    }
}

// POST: Crear una nueva noticia
export async function POST(request: Request) {
    const { titulo, descripcion, userId } = await request.json(); // userId en lugar de id_usuario_fk

    // Validación simple
    if (!titulo || !descripcion || !userId) {
        return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    try {
        const noticia = await prisma.noticia.create({
            data: { 
                titulo, 
                descripcion, 
                userId, // Asegúrate de que este nombre de campo coincida con tu modelo
                fechaPublicacion: new Date() // Asegúrate de que este nombre de campo coincida con tu modelo
            }, 
        });
        return NextResponse.json(noticia);
    } catch (error) {
        console.error('Error al crear la noticia:', error); // Agrega un log para el error
        return NextResponse.json({ error: 'Error al crear la noticia' }, { status: 500 });
    }
}
