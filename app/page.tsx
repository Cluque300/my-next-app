// app/page.tsx
// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirigir automáticamente a la página de inicio de sesión
  redirect('/login');
  return null; // No se necesita retornar contenido ya que la redirección ocurre antes
}






