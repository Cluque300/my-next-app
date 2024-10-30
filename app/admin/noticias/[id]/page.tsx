'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function EditarNoticiaPage() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchNoticia = async () => {
            const response = await fetch(`/api/autch/noticias/${id}`);
            const noticia = await response.json();
            setTitulo(noticia.titulo);
            setDescripcion(noticia.descripcion);
        };

        fetchNoticia();
    }, [id]);

    const handleSubmit = async () => {
        await fetch(`/api/autch/noticias/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, descripcion }),
        });
        router.push('/admin/noticias');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Editar Noticia</Typography>
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
                Guardar Cambios
            </Button>
        </Box>
    );
}
