import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma'; // Asegúrate de que esta ruta es correcta
import { User } from '@prisma/client'; // Importa el tipo User

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  try {
    // Encuentra al usuario por correo electrónico
    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });

    // Verifica si el usuario no existe
    if (!user) {
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
    }

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const passwordMatch = await new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    // Verifica si las contraseñas no coinciden
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
    }

    // Respuesta exitosa y configuración de cookies
    const response = NextResponse.json({ redirectUrl: '/inicio' });

    response.cookies.set('user', JSON.stringify(user), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Error del servidor:', error);
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
  }
} // <- Aquí está la llave de cierre que faltaba
