'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../../../context/AuthContext'; // Importación corregida

export default function CrearNoticiaPage() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const router = useRouter();
    const { userId } = useAuth(); // Obtener userId del contexto

    const handleSubmit = async () => {
        // Verifica si el userId está disponible antes de hacer la solicitud
        if (!userId) {
            console.error('El usuario no está autenticado.');
            return;
        }

        const response = await fetch('/api/autch/noticias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, descripcion, userId }), // usa userId
        });

        if (response.ok) {
            router.push('/admin/noticias'); // Redirige a la lista de noticias después de crear
        } else {
            const errorData = await response.json();
            console.error('Error al crear la noticia:', errorData);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Crear Noticia</Typography>
            <TextField 
                label="Título" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                fullWidth 
                sx={{ my: 2 }}
            />
            <TextField 
                label="Descripción" 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                fullWidth 
                multiline 
                rows={4} 
                sx={{ my: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Guardar Noticia
            </Button>
        </Box>
    );
}
