// /app/api/autch/check-session/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Usa la API 'next/headers' para acceder a las cookies en SSR

export async function GET() {
  try {
    const cookie = cookies().get('user'); // Obtén la cookie 'user'

    if (cookie) {
      return NextResponse.json({ isLoggedIn: true, user: JSON.parse(cookie.value) }); // Si hay cookie, usuario está logueado
    } else {
      return NextResponse.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error('Error verificando la sesión:', error);
    return NextResponse.json({ isLoggedIn: false });
  }
}
