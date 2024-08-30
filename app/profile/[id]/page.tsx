// app/profile/[id]/page.tsx
'use client'; // Asegúrate de que el componente se ejecute en el cliente

import { useParams } from 'next/navigation'; // Importa useParams en lugar de useRouter
import React from 'react';

const UserProfile = () => {
  const { id } = useParams(); // Obtiene el parámetro de la URL
  
  // Maneja el caso en que `id` podría ser indefinido
  const userId = id || 'Cargando...';

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <p>ID del Usuario: {userId}</p>
    </div>
  );
};

export default UserProfile;
