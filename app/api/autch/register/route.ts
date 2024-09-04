import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { fullname, fulllastname, email, username, password } = await request.json();

  try {
    // Validaciones
    if (!fullname || !fulllastname || !email || !username || typeof password !== 'string' || password === null) {
      return NextResponse.json({ message: 'Todos los campos son requeridos y la contraseña debe ser una cadena válida' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 });
    }

    // Verifica si el usuario ya existe
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'El nombre de usuario o correo electrónico ya está en uso' }, { status: 400 });
    }

    // Hash de la contraseña
    const hashedPassword = await new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err || hash === null) {
          reject(new Error('Error al generar el hash de la contraseña'));
        } else {
          resolve(hash);
        }
      });
    });

    // Inserta el nuevo usuario en la base de datos
    await prisma.user.create({
      data: {
        fullname,
        fulllastname,
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Registro completado con éxito' });
  } catch (error) {
    console.error('Error del servidor:', error);
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
  }
}
