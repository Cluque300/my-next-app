// /app/api/autch/check-session/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookie = cookies().get('user');

    if (cookie) {
      let user;
      try {
        user = JSON.parse(cookie.value);
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        return NextResponse.json({ isLoggedIn: false });
      }

      return NextResponse.json({
        isLoggedIn: true,
        userId: user.id,
        userRole: user.role, // Incluye el rol del usuario
        userData: { // Asegúrate de incluir todos los datos necesarios
          id: user.id,
          fullname: user.fullname,
          fulllastname: user.fulllastname,
          email: user.email,
          username: user.username,
          role: user.role,
          foto: user.foto,
        },
      });
    } else {
      return NextResponse.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error('Error verificando la sesión:', error);
    return NextResponse.json({ isLoggedIn: false });
  }
}
