'use client'; // Indica que este es un Componente del Cliente

import { useRouter } from 'next/navigation'; // Importa desde next/navigation
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de que esta ruta sea correcta
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material'; // Importa componentes de MUI

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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Crear Evento
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Inicio"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fin"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Crear Evento
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateEventPage;
