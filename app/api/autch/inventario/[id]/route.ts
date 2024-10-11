// app/api/inventario/[id]/route.ts
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    const elemento = await prisma.inventario.findUnique({
      where: { id_elemento: id },
    });
    if (!elemento) {
      return NextResponse.json({ error: 'Elemento no encontrado' }, { status: 404 });
    }
    return NextResponse.json(elemento, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener el elemento' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const { nombre_elemento, descripcion, cantidad, ubicacion, tipo_elemento, imagen, categoria } = body;

  try {
    const elementoActualizado = await prisma.inventario.update({
      where: { id_elemento: id },
      data: {
        nombre_elemento,
        descripcion,
        cantidad,
        ubicacion,
        tipo_elemento,
        imagen,
        categoria,
      },
    });
    return NextResponse.json(elementoActualizado, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar el elemento' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.inventario.delete({
      where: { id_elemento: id },
    });
    return NextResponse.json({ message: 'Elemento eliminado' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar el elemento' }, { status: 500 });
  }
}
