'use client';

import { useState } from 'react';
import { Container, Typography, Button, Box, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

interface AdminUploadPageProps {
  title: string;
  endpoint: string;
  uploadLabel: string;
  userId: number | null; // Asegúrate de recibir el userId
}

export default function AdminUploadPage({ title, endpoint, uploadLabel, userId }: AdminUploadPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [nombre, setNombre] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !userId || !nombre) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());
    formData.append(uploadLabel, nombre);

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Archivo subido con éxito.');
      setNombre('');
      setFile(null);
    } catch (error) {
      setError('Error al subir el archivo. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>{title}</Typography>

      <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 4 }}>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
        />
        <Button variant="contained" component="label">
          Seleccionar Archivo
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {file && <Typography variant="body2">{file.name}</Typography>}
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading}
          fullWidth
          sx={{ py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Subir Archivo'}
        </Button>

        {error && <Typography color="error" align="center">{error}</Typography>}
        {success && <Typography color="success" align="center">{success}</Typography>}
      </Box>
    </Container>
  );
}
