// app/permisos/solicitud.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function SolicitudPermisoPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    motivo_permiso: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.motivo_permiso || !formData.fecha_inicio || !formData.fecha_fin || !userId) {
      console.error('Faltan campos obligatorios.');
      return;
    }

    try {
      await axios.post('/api/autch/permisos', {
        ...formData,
        userId,
      });
      router.push('/permisos');
    } catch (error) {
      console.error('Error creando permiso:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 5 }}>
        <Typography variant="h4" align="center">Solicitar Permiso</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Motivo del Permiso"
            name="motivo_permiso"
            value={formData.motivo_permiso}
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
            Solicitar Permiso
          </Button>
        </form>
      </Box>
    </Container>
  );
}
