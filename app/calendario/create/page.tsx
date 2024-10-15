'use client'; // Indica que este es un Componente del Cliente

import { useRouter } from 'next/navigation'; // Importa desde next/navigation
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de que esta ruta sea correcta

const CreateEventPage = () => {
  const { userId } = useAuth(); // Obtén el userId del contexto
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/autch/calendario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, start, end, description, userId }), // Incluye userId en el cuerpo de la solicitud
    });

    if (res.ok) {
      router.push('/calendario');
    } else {
      console.error('Error creando el evento');
    }
  };

  return (
    <div>
      <h1>Crear Evento</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="start">Inicio</label>
        <input
          id="start"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <label htmlFor="end">Fin</label>
        <input
          id="end"
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
