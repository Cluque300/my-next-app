'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Input } from '@mui/material';
import { useAuth } from '../../../context/AuthContext'; // Importación corregida

export default function CrearNoticiaPage() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState<File | null>(null);
    const router = useRouter();
    const { userId } = useAuth(); // Obtener userId del contexto

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImagen(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        // Verifica si el userId está disponible antes de hacer la solicitud
        if (!userId) {
            console.error('El usuario no está autenticado.');
            return;
        }

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('userId', userId.toString()); // Asegúrate de convertir userId a string
        if (imagen) {
            formData.append('imagen', imagen); // Agregar la imagen si está presente
        }

        const response = await fetch('/api/autch/noticias', {
            method: 'POST',
            body: formData, // Enviar como FormData
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
            <Typography variant="body1" sx={{ mb: 1 }}>Subir Imagen</Typography>
            <Input 
                type="file" 
                onChange={handleFileChange} 
                fullWidth 
                sx={{ my: 2 }} 
                inputProps={{ accept: 'image/*' }} // Aceptar solo imágenes
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Guardar Noticia
            </Button>
        </Box>
    );
}
