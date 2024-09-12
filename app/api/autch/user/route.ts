import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET: Obtener todos los usuarios
export async function GET() {
    try {
        const usuarios = await prisma.user.findMany();
        return NextResponse.json(usuarios);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener los usuarios' }, { status: 500 });
    }
}

// POST: Crear un nuevo usuario
export async function POST(request: Request) {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const fullname = formData.get('fullname') as string;
    const fulllastname = formData.get('fulllastname') as string;
    const email = formData.get('email') as string;
    const estadoUsuario = formData.get('estadoUsuario') as string;

    // Validaciones
    if (!fullname || !fulllastname || !email || !username || typeof password !== 'string' || password === null) {
        return NextResponse.json({ message: 'Todos los campos son requeridos y la contraseña debe ser una cadena válida' }, { status: 400 });
    }

    if (password.length < 8) {
        return NextResponse.json({ message: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
        where: { username },
    });

    if (existingUser) {
        return NextResponse.json({ error: 'El nombre de usuario ya está en uso' }, { status: 400 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    try {
        await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                fullname,
                fulllastname,
                email,
                estadoUsuario, // Incluye aquí el campo `estadoUsuario`
            },
        });

        return NextResponse.json({ message: 'Usuario creado con éxito' }, { status: 201 });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
    }
}
