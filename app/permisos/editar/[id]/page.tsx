// app/permisos/editar/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

export default function EditarPermisoPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    motivo_permiso: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/autch/permisos/${id}`)
        .then(response => setFormData(response.data))
        .catch(error => console.error('Error obteniendo permiso:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/autch/permisos/${id}`, formData);
      router.push('/permisos');
    } catch (error) {
      console.error('Error actualizando permiso:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 5 }}>
        <Typography variant="h4" align="center">Editar Permiso</Typography>
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
            Actualizar Permiso
          </Button>
        </form>
      </Box>
    </Container>
  );
}
