// /app/api/autch/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Usamos esta API para manipular cookies

export async function POST() {
  try {
    const cookieStore = cookies(); // Obtén el almacén de cookies

    // Elimina la cookie del usuario
    cookieStore.set('user', '', { maxAge: -1, path: '/' });

    return NextResponse.json({ message: 'Sesión cerrada' });
  } catch (error) {
    console.error('Error del servidor:', error);
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
  }
}
