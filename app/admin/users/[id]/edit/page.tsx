'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correcto para Client Components

interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
}

const EditUserPage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    role: '',
    phone: '',
    email: '',
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/autch/user/${params.id}`, user);
      alert('Usuario actualizado correctamente');
      router.push(`/admin/users/${params.id}`);
    } catch (error) {
      console.error('Error actualizando usuario:', error);
    }
  };

  return (
    <div>
      <h1>Editar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rol:
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Teléfono:
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Correo:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditUserPage;

