// app/components/StyledCalendar.tsx
'use client';

import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const StyledCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [date, setDate] = useState(new Date()); // Estado para la fecha actual

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/autch/calendario');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        const formattedEvents = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectEvent = (event: Event) => {
    router.push(`/calendario/${event.id}`);
  };

  const handleSelectSlot = (slotInfo: any) => {
    router.push(`/calendario/create?start=${slotInfo.start.toISOString()}&end=${slotInfo.end.toISOString()}`);
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate); // Actualiza la fecha cuando se navega
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Calendario de Eventos
      </Typography>

      <Box
        sx={{
          height: '500px',
          backgroundColor: '#fff',
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultView={Views.MONTH}
          date={date} // Usar el estado de la fecha
          onNavigate={handleNavigate} // Manejar la navegación
          toolbar
          messages={{
            next: 'Siguiente',
            previous: 'Anterior',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={() => router.push('/calendario/create')}
      >
        Crear Nuevo Evento
      </Button>
    </Box>
  );
};

export default StyledCalendar;
