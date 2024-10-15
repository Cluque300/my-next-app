import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EditEventPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        const res = await fetch(`/api/autch/calendario/${id}`);
        const data = await res.json();
        setEvent(data);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/autch/calendario/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (res.ok) {
      router.push('/calendario');
    } else {
      console.error('Error updating event');
    }
  };

  if (!event) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Editar Evento</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          required
        />

        <label htmlFor="start">Inicio</label>
        <input
          id="start"
          type="datetime-local"
          value={event.start.toISOString().slice(0, 16)} // Formato adecuado para datetime-local
          onChange={(e) => setEvent({ ...event, start: new Date(e.target.value) })}
          required
        />

        <label htmlFor="end">Fin</label>
        <input
          id="end"
          type="datetime-local"
          value={event.end.toISOString().slice(0, 16)} // Formato adecuado para datetime-local
          onChange={(e) => setEvent({ ...event, end: new Date(e.target.value) })}
          required
        />

        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />

        <button type="submit">Actualizar</button>
      </form>
      <button
        onClick={async () => {
          const res = await fetch(`/api/autch/calendario/${id}`, { method: 'DELETE' });
          if (res.ok) {
            router.push('/calendario');
          } else {
            console.error('Error deleting event');
          }
        }}
      >
        Eliminar Evento
      </button>
    </div>
  );
};

export default EditEventPage;
