// /app/components/LogoutButton.tsx
"use client";

import { Button } from '@mui/material'; // Importa el componente Button de Material UI
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth(); // Obtiene la función de logout del contexto

  const handleLogout = async () => {
    try {
      await logout(); // Llama a la función logout del contexto
      router.push('/login'); // Redirige a la página de inicio de sesión
      router.refresh();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
      sx={{ mt: 2 }} // Añade un margen superior opcional
    >
      Cerrar sesión
    </Button>
  );
}
