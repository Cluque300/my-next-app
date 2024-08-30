// app/profile/[id]/page.tsx

'use client';

import { useParams, useRouter } from 'next/navigation'; // Importa useRouter para redirección
import React from 'react';
import styles from './profilepage.module.css';

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  // Verifica que `id` esté definido antes de usarlo
  const userId = id || 'Cargando...';

  const handleLogout = async () => {
    try {
      // Aquí deberías agregar la lógica real para cerrar sesión
      console.log('Cierre de sesión');

      // Simulación de cierre de sesión
      // Por ejemplo, borrar cookies, tokens, etc.

      // Redirige a la página principal después de cerrar sesión
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Perfil del Usuario</h1>
      <img src="/images/profile.jpg" alt="Perfil del Usuario" className={styles.image} />
      <p>ID del Usuario: {userId}</p>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserProfile;



