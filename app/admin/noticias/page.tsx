'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function NoticiasAdminPage() {
    const [noticias, setNoticias] = useState([]);
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
            <Typography variant="h4" gutterBottom>
                Administración de Noticias
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => router.push('/admin/noticias/create')}
                sx={{ mb: 2 }}
            >
                Crear Nueva Noticia
            </Button>
            <List>
                {noticias.map((noticia: any) => (
                    <div key={noticia.id}>
                        <ListItem 
                            component="div"
                            onClick={() => router.push(`/admin/noticias/${noticia.id}`)}
                            sx={{ 
                                cursor: 'pointer', 
                                '&:hover': { backgroundColor: 'action.hover' },
                                bgcolor: '#fff',
                                borderRadius: 1,
                                mb: 1,
                                boxShadow: 1
                            }}
                        >
                            <ListItemText 
                                primary={noticia.titulo} 
                                secondary={`Publicado el: ${new Date(noticia.fechaPublicacion).toLocaleDateString()}`} // Usa 'fechaPublicacion' aquí
                            />
                        </ListItem>
                        <Divider sx={{ bgcolor: 'gray.200' }} />
                    </div>
                ))}
            </List>
        </Box>
    );
}
