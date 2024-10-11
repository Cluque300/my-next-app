// app/calendario/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, Typography, Box } from '@mui/material';
import Calendar from 'react-calendar'; // Solo importa Calendar
import 'react-calendar/dist/Calendar.css';

// Ajustamos el tipo del estado
const CalendarioPage = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date | Date[] | null>(null); // Estado para el calendario

  const handleVacacionesClick = () => {
    router.push('/vacaciones');
  };

  const handlePermisosClick = () => {
    router.push('/permisos');
  };

  // Función para manejar el cambio de fecha
  const handleDateChange = (newDate: Date | Date[] | null) => {
    setDate(newDate);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Calendario
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleVacacionesClick} 
          sx={{ marginRight: 1 }}
        >
          Vacaciones
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handlePermisosClick}
        >
          Permisos
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Calendar
          onChange={(newDate) => handleDateChange(newDate)} // Usar función directamente
          value={date} // Este es el valor actual del calendario
        />
      </Box>
    </Container>
  );
};

export default CalendarioPage;
