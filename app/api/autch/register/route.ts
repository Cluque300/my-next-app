import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Datos recibidos:', data);

    const { fullname, fulllastname, email, username, password, estadoUsuario } = data;

    if (!fullname || !fulllastname || !email || !username || typeof password !== 'string' || password.trim() === '') {
      console.log('Error en validaciones');
      return NextResponse.json({ message: 'Todos los campos son requeridos y la contraseña debe ser una cadena válida' }, { status: 400 });
    }

    if (password.length < 8) {
      console.log('Error: Contraseña corta');
      return NextResponse.json({ message: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      console.log('Usuario ya existe');
      return NextResponse.json({ message: 'El nombre de usuario o correo electrónico ya está en uso' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Contraseña hasheada:', hashedPassword);

    await prisma.user.create({
      data: {
        fullname,
        fulllastname,
        email,
        username,
        password: hashedPassword,
        estadoUsuario,
      },
    });

    console.log('Registro completado con éxito');
    return NextResponse.json({ message: 'Registro completado con éxito' }, { status: 201 });
  } catch (error) {
    console.error('Error del servidor:', error);
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
  }
}
