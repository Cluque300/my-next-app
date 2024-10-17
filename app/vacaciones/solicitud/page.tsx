// app/vacaciones/solicitud.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function SolicitudVacacionesPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    tipo_vacaciones: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.tipo_vacaciones || !formData.fecha_inicio || !formData.fecha_fin || !userId) {
      console.error('Faltan campos obligatorios.');
      return;
    }

    try {
      await axios.post('/api/autch/vacaciones', {
        ...formData,
        userId,
      });
      router.push('/vacaciones');
    } catch (error) {
      console.error('Error creando vacaciones:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 5 }}>
        <Typography variant="h4" align="center">Solicitar Vacaciones</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tipo de Vacaciones"
            name="tipo_vacaciones"
            value={formData.tipo_vacaciones}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Fecha de Inicio"
            name="fecha_inicio"
            type="date"
            value={formData.fecha_inicio}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fecha de Fin"
            name="fecha_fin"
            type="date"
            value={formData.fecha_fin}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Solicitar Vacaciones
          </Button>
        </form>
      </Box>
    </Container>
  );
}
