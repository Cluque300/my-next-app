// app/vacaciones/editar/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';

export default function EditarVacacionesPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    tipo_vacaciones: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/autch/vacaciones/${id}`)
        .then(response => setFormData(response.data))
        .catch(error => console.error('Error obteniendo vacaciones:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/autch/vacaciones/${id}`, formData);
      router.push('/vacaciones');
    } catch (error) {
      console.error('Error actualizando vacaciones:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: '#f9f9f9' }}> {/* Estiliza el fondo del formulario */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Editar Vacaciones
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Tipo de Vacaciones"
              name="tipo_vacaciones"
              value={formData.tipo_vacaciones}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 3 }}
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
              sx={{ mb: 3 }}
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
              sx={{ mb: 4 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.5 }}>
              Actualizar Vacaciones
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
