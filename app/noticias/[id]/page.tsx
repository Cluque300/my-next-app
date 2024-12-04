'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';

export default function NoticiaPage() {
    const { id } = useParams();
    const [noticia, setNoticia] = useState<any>(null);

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                const response = await fetch(`/api/autch/noticias/${id}`);
                const data = await response.json();
                setNoticia(data);
            } catch (error) {
                console.error('Error al obtener la noticia:', error);
            }
        };

        fetchNoticia();
    }, [id]);

    if (!noticia) {
        return (
            <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h5">Cargando noticia...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <Card sx={{ maxWidth: 600, boxShadow: 3 }}>
                {noticia.imagen && (
                    <CardMedia
                        component="img"
                        image={noticia.imagen}
                        alt={noticia.titulo}
                        sx={{ height: 300 }}
                    />
                )}
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {noticia.titulo}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {noticia.descripcion}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Publicado el: {new Date(noticia.fechaPublicacion).toLocaleDateString()}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
