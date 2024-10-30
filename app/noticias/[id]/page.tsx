'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

// Definimos la interfaz para el tipo de Noticia
interface Noticia {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_publicacion: string;
    // Puedes agregar más campos según tu modelo
}

export default function NoticiaDetailPage() {
    const { id } = useParams();
    const [noticia, setNoticia] = useState<Noticia | null>(null); // Especificamos que puede ser Noticia o null

    useEffect(() => {
        const fetchNoticia = async () => {
            const response = await fetch(`/api/autch/noticias/${id}`);
            const data = await response.json();
            setNoticia(data);
        };
        fetchNoticia();
    }, [id]);

    if (!noticia) return <div>Cargando...</div>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">{noticia.titulo}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>{noticia.descripcion}</Typography>
            <Typography variant="subtitle2" sx={{ mt: 1, color: 'gray' }}>
                Publicado el: {noticia.fecha_publicacion}
            </Typography>
        </Box>
    );
}
