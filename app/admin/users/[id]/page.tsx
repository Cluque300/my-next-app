'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
}

const AdminUserDetailPage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/autch/user/${params.id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [params.id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detalles del Usuario</h1>
      <img src={`/images/users/${user.avatar}`} alt="User Avatar" />
      <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Rol:</strong> {user.role}</p>
      <p><strong>Teléfono:</strong> +57 {user.phone}</p>
      <p><strong>Correo:</strong> <a href={`mailto:${user.email}`}>{user.email}</a></p>
      <button onClick={() => router.push(`/admin/users/${user.id}/edit`)}>Editar Usuario</button>
    </div>
  );
};

export default AdminUserDetailPage;

