import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Asegúrate de que esta ruta sea correcta
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const empleados = await prisma.general_users.findMany({
        where: { estado_usuario: 'Aceptado' },
    });
    return NextResponse.json(empleados);
}

export async function POST(request: Request) {
    const formData = await request.formData();
    const usuario = formData.get('usuario') as string;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.general_users.findUnique({
        where: { usuario },
    });
    
    if (existingUser) {
        return NextResponse.json({ error: 'El nombre de usuario ya está en uso' }, { status: 400 });
    }

    // Manejar la foto
    const foto = formData.get('foto') as File;
    const fileExtension = path.extname(foto.name).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    
    if (!allowedExtensions.includes(fileExtension)) {
        return NextResponse.json({ error: 'La extensión de la imagen no está permitida' }, { status: 400 });
    }

    // Guardar la foto
    const uploadPath = path.join(process.cwd(), 'public', 'images', 'users', `${usuario}Foto${fileExtension}`);
    fs.writeFileSync(uploadPath, Buffer.from(await foto.arrayBuffer()));

    // Insertar nuevo usuario en la base de datos
    const hashedPassword = await bcrypt.hash(formData.get('contrasena') as string, 10);
    await prisma.general_users.create({
        data: {
            usuario, // Asegúrate de rellenar todos los campos necesarios
            foto: `${usuario}Foto${fileExtension}`,
            contrasena: hashedPassword,
            // Agrega otros campos necesarios aquí
        },
    });

    return NextResponse.redirect('/users/page');
}
