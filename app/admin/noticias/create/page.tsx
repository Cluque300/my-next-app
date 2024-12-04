'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Input } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';

export default function CrearNoticiaPage() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const router = useRouter();
  const { userId } = useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImagen(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error('El usuario no está autenticado.');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('userId', userId.toString());
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      const response = await fetch('/api/autch/noticias', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/admin/noticias');
      } else {
        const errorData = await response.json();
        console.error('Error al crear la noticia:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Crear Noticia
      </Typography>
      <TextField
        label="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        fullWidth
        required
        sx={{ my: 2 }}
      />
      <TextField
        label="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        fullWidth
        multiline
        rows={4}
        required
        sx={{ my: 2 }}
      />
      <Typography variant="body1" sx={{ mb: 1 }}>
        Subir Imagen (Opcional)
      </Typography>
      <Input
        type="file"
        onChange={handleFileChange}
        fullWidth
        sx={{ my: 2 }}
        inputProps={{ accept: 'image/*' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!titulo || !descripcion}
        sx={{ mt: 3 }}
      >
        Guardar Noticia
      </Button>
    </Box>
  );
}
