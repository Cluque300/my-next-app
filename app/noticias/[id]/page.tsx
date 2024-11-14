'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'next/navigation';

interface Noticia {
    id: number;
    titulo: string;
    descripcion: string;
    fechaPublicacion?: string; // Posible nombre de campo de fecha
    fecha_publicacion?: string; // Alternativo nombre de campo de fecha
}

export default function NoticiaDetailPage() {
    const { id } = useParams();
    const [noticia, setNoticia] = useState<Noticia | null>(null);

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                const response = await fetch(`/api/autch/noticias/${id}`);
                const data = await response.json();
                setNoticia(data);
            } catch (error) {
                console.error("Error fetching noticia:", error);
            }
        };
        fetchNoticia();
    }, [id]);

    if (!noticia) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>Cargando noticia...</Typography>
            </Box>
        );
    }

    // Determinamos el valor de la fecha usando el campo que esté disponible
    const fechaPublicacion = noticia.fechaPublicacion || noticia.fecha_publicacion;
    const fechaFormateada = fechaPublicacion
        ? new Date(fechaPublicacion).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : 'Fecha no disponible';

    return (
        <Box
            sx={{
                p: 4,
                bgcolor: '#f0f4c3',
                borderRadius: 2,
                boxShadow: 3,
                mt: 5,
                maxWidth: '800px',
                mx: 'auto',
            }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                    color: '#33691e',
                    borderBottom: '3px solid #33691e',
                    paddingBottom: 1,
                    mb: 2,
                }}
            >
                {noticia.titulo}
            </Typography>

            <Typography
                variant="subtitle2"
                sx={{
                    color: '#6d6d6d',
                    mb: 3,
                    fontStyle: 'italic',
                }}
            >
                Publicado el: {fechaFormateada}
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: '#424242',
                    lineHeight: 1.7,
                    textAlign: 'justify',
                }}
            >
                {noticia.descripcion}
            </Typography>
        </Box>
    );
}

