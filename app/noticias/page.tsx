'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NoticiasPage() {
    const [noticias, setNoticias] = useState<any[]>([]);
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
        <Box
            sx={{
                p: { xs: 2, md: 4 },
                bgcolor: '#e0f7fa',
                borderRadius: 2,
                boxShadow: 3,
                mt: { xs: 3, md: 5 },
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{
                    color: '#00796b',
                    fontWeight: 'bold',
                    mb: { xs: 2, md: 4 },
                    borderBottom: '3px solid #00796b',
                    display: 'inline-block',
                    pb: 1,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                }}
            >
                📰 Noticias
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {noticias.map((noticia) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={noticia.id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Card
                            sx={{
                                width: '100%',
                                maxWidth: { xs: 280, sm: 320, md: 360 },
                                borderRadius: 3,
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                                },
                                cursor: 'pointer',
                            }}
                            onClick={() => router.push(`/noticias/${noticia.id}`)}
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image={noticia.imagen || '/default-image.jpg'} // Imagen por defecto si no hay imagen
                                alt={noticia.titulo}
                                sx={{
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '12px',
                                    borderTopRightRadius: '12px',
                                }}
                            />
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#37474f',
                                        mb: 1,
                                        textAlign: 'center',
                                        fontSize: { xs: '1rem', md: '1.25rem' },
                                    }}
                                >
                                    {noticia.titulo}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{
                                        textAlign: 'center',
                                        mb: 2,
                                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                                    }}
                                >
                                    Publicado el:{' '}
                                    {new Date(noticia.fechaPublicacion).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </Typography>
                                <Box textAlign="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        sx={{
                                            fontSize: { xs: '0.7rem', md: '0.9rem' },
                                            px: { xs: 1, md: 2 },
                                        }}
                                    >
                                        Leer más
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
