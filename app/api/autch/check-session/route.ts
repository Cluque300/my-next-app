// /app/api/autch/check-session/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookie = cookies().get('user'); // Obtén la cookie 'user'

    if (cookie) {
      const user = JSON.parse(cookie.value); // Parsear el valor de la cookie
      return NextResponse.json({
        isLoggedIn: true,
        userId: user.id, // Asegúrate de devolver el ID del usuario
      });
    } else {
      return NextResponse.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error('Error verificando la sesión:', error);
    return NextResponse.json({ isLoggedIn: false });
  }
}
