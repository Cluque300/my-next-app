'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NoticiasPage() {
    const [noticias, setNoticias] = useState<any[]>([]); // Usa any[] para evitar errores de tipo
    const router = useRouter();

    useEffect(() => {
        const fetchNoticias = async () => {
            const response = await fetch('/api/autch/noticias');
            const data = await response.json();
            setNoticias(data);
        };
        fetchNoticias();
    }, []);

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h4" gutterBottom align="center">Noticias</Typography>
            <List>
                {noticias.map((noticia) => (
                    <div key={noticia.id}>
                        <ListItem 
                            onClick={() => router.push(`/noticias/${noticia.id}`)} 
                            component="li" // Especifica que se trata de un elemento de lista
                            sx={{ 
                                cursor: 'pointer', 
                                bgcolor: '#fff', 
                                borderRadius: 1, 
                                mb: 1, 
                                boxShadow: 1, 
                                transition: 'background-color 0.3s', 
                                '&:hover': { 
                                    backgroundColor: 'action.hover' 
                                } 
                            }} // Añade un cursor de puntero y un efecto hover
                        >
                            <ListItemText 
                                primary={noticia.titulo} 
                                secondary={`Publicado el: ${new Date(noticia.fechaPublicacion).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}`} // Formato de fecha más detallado y profesional
                            />
                        </ListItem>
                        <Divider sx={{ bgcolor: 'gray.200' }} /> {/* Añade una línea divisoria entre noticias */}
                    </div>
                ))}
            </List>
        </Box>
    );
}

