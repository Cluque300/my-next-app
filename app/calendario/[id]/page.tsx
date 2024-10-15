'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Para navegar entre páginas
import { useParams } from 'next/navigation'; // Para obtener los parámetros de la URL
import Link from 'next/link';

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
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!event) {
    return <p>No se encontró el evento.</p>;
  }

  return (
    <div>
      <h1>Detalles del Evento</h1>
      <h2>{event.title}</h2>
      <p>
        <strong>Inicio:</strong> {new Date(event.start).toLocaleString()}
      </p>
      <p>
        <strong>Fin:</strong> {new Date(event.end).toLocaleString()}
      </p>
      <p>
        <strong>Descripción:</strong> {event.description || 'No hay descripción disponible.'}
      </p>
      
      <div>
        <Link href={`/calendario/${event.id}/edit`}>
          <button>Editar Evento</button>
        </Link>
        <button
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
        </button>
      </div>

      <Link href="/calendario">Volver al calendario</Link>
    </div>
  );
};

export default EventDetailPage;
