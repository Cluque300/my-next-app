'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Para navegar entre páginas
import { useParams } from 'next/navigation'; // Para obtener los parámetros de la URL
import Link from 'next/link';
import { Container, Typography, Box, Button, Paper, CircularProgress } from '@mui/material';

interface EventDetail {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
}

const EventDetailPage = () => {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams(); // Usamos useParams para obtener el 'id' del evento desde la URL
  const { id } = params;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/autch/calendario/${id}`);
        if (!res.ok) {
          throw new Error('Error fetching event');
        }
        const data: EventDetail = await res.json();
        setEvent(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!event) {
    return <Typography>No se encontró el evento.</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Detalles del Evento
        </Typography>
        <Typography variant="h5" gutterBottom>
          {event.title}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <strong>Inicio:</strong> {new Date(event.start).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Fin:</strong> {new Date(event.end).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Descripción:</strong> {event.description || 'No hay descripción disponible.'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Link href={`/calendario/${event.id}/edit`} passHref>
            <Button variant="contained" color="primary">
              Editar Evento
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              const res = await fetch(`/api/autch/calendario/${event.id}`, {
                method: 'DELETE',
              });
              if (res.ok) {
                router.push('/calendario');
              } else {
                setError('Error eliminando el evento');
              }
            }}
          >
            Eliminar Evento
          </Button>
        </Box>
        <Link href="/calendario" passHref>
          <Button variant="outlined">Volver al calendario</Button>
        </Link>
      </Paper>
    </Container>
  );
};

export default EventDetailPage;
