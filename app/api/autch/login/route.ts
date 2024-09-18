// /app/api/autch/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma'; // Asegúrate de que esta ruta es correcta
import { User, Role } from '@prisma/client'; // Importa el tipo User y Role

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Encuentra al usuario por nombre de usuario
    const user: User | null = await prisma.user.findUnique({
      where: { username },
    });

    // Verifica si el usuario no existe
    if (!user) {
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
    }

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Verifica si las contraseñas no coinciden
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
    }

    // Determina la URL de redirección basado en el rol del usuario
    const redirectUrl: string = user.role === Role.ADMIN ? `/admin` : `/users/${user.id}`;
    const response = NextResponse.json({ redirectUrl });

    // Configuración de cookies
    response.cookies.set('user', JSON.stringify(user), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return response;
  } catch (error) {
    console.error('Error del servidor:', error);
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
  }
}

