import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

// GET para obtener un usuario por ID
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener el usuario' }, { status: 500 });
    }
}

// PATCH para actualizar un usuario por ID
export async function PATCH(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const formData = await request.formData();

    if (!id) {
        return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });
    }

    const usuarioId = Number(id);
    let fotoPath: string | undefined;
    const foto = formData.get('foto') as File | null;

    if (foto) {
        const fileExtension = path.extname(foto.name).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];

        if (!allowedExtensions.includes(fileExtension)) {
            return NextResponse.json({ error: 'La extensión de la imagen no está permitida' }, { status: 400 });
        }

        const uploadPath = path.join(process.cwd(), 'public', 'images', 'users', `${usuarioId}Foto${fileExtension}`);
        fs.writeFileSync(uploadPath, Buffer.from(await foto.arrayBuffer())); // Convertir ArrayBuffer a Buffer
        fotoPath = `${usuarioId}Foto${fileExtension}`;
    }

    const contrasena = formData.get('contrasena') as string | null;
    let hashedPassword: string | undefined;

    if (typeof contrasena === 'string' && contrasena.trim() !== '') {
        try {
            hashedPassword = await bcrypt.hash(contrasena, 10);
        } catch (error) {
            return NextResponse.json({ error: 'Error al hashear la contraseña' }, { status: 500 });
        }
    }

    const updateData: { foto?: string; password?: string } = {};
    if (fotoPath) updateData.foto = fotoPath;
    if (hashedPassword) updateData.password = hashedPassword;

    try {
        await prisma.user.update({
            where: { id: usuarioId },
            data: updateData,
        });
        return NextResponse.redirect(`/users/${usuarioId}`);
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar el usuario' }, { status: 500 });
    }
}

// DELETE para eliminar un usuario por ID
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });
    }

    try {
        await prisma.user.delete({
            where: { id: Number(id) },
        });
        return NextResponse.redirect('/users');
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar el usuario' }, { status: 500 });
    }
}





