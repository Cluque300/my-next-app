"use client";

import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Importa el contexto de autenticación

export default function CreateCursoPage() {
  const router = useRouter();
  const { userId } = useAuth(); // Obtén el userId del contexto de autenticación
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/autch/cursos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        fecha_inicio,
        fecha_fin,
        ubicacion,
        userId, // Aquí se incluye el ID del admin
      }),
    });

    if (response.ok) {
      router.push('/admin/cursos'); // Redirige a la lista de cursos después de crear
    } else {
      console.error('Error al crear el curso');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Crear Curso</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          fullWidth
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          sx={{ marginBottom: 2 }} // Espacio entre campos
        />
        <TextField
          label="Descripción"
          fullWidth
          multiline
          required
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          sx={{ marginBottom: 2 }} // Espacio entre campos
        />
        <TextField
          label="Fecha de Inicio"
          type="date"
          fullWidth
          required
          value={fecha_inicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          InputLabelProps={{ shrink: true }} // Para mostrar correctamente el label
          sx={{ marginBottom: 2 }} // Espacio entre campos
        />
        <TextField
          label="Fecha de Fin"
          type="date"
          fullWidth
          required
          value={fecha_fin}
          onChange={(e) => setFechaFin(e.target.value)}
          InputLabelProps={{ shrink: true }} // Para mostrar correctamente el label
          sx={{ marginBottom: 2 }} // Espacio entre campos
        />
        <TextField
          label="Ubicación"
          fullWidth
          required
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          sx={{ marginBottom: 2 }} // Espacio entre campos
        />
        <Button type="submit" variant="contained">Crear Curso</Button>
      </form>
    </Container>
  );
}
