'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Box, TextField, Button, Typography, Input } from '@mui/material';

export default function EditarNoticiaPage() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState<File | null>(null);
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImagen(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);

        if (imagen) {
            formData.append('imagen', imagen);
        }

        const response = await fetch(`/api/autch/noticias/${id}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            router.push('/admin/noticias');
        } else {
            const errorData = await response.json();
            console.error('Error al editar la noticia:', errorData);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Editar Noticia
            </Typography>
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
            <Typography variant="body1" sx={{ mb: 1 }}>
                Cambiar Imagen
            </Typography>
            <Input
                type="file"
                onChange={handleFileChange}
                fullWidth
                sx={{ my: 2 }}
                inputProps={{ accept: 'image/*' }} // Aceptar solo imágenes
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 3 }}
            >
                Guardar Cambios
            </Button>
        </Box>
    );
}
