// app/calendario/page.tsx
'use client';

import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation'; // Importa el hook useRouter para redirecciones
import StyledCalendar from '../components/StyledCalendar'; // Importa desde el lugar correcto

const CalendarPage = () => {
  const router = useRouter(); // Usa el hook useRouter para la redirección

  return (
    <Box sx={{ padding: 2, position: 'relative' }}>
      <h1>Calendario</h1>
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/vacaciones')} // Redirección a vacaciones
          sx={{ marginRight: 1 }} // Espaciado entre los botones
        >
          Vacaciones
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => router.push('/permisos')} // Redirección a permisos
        >
          Permisos
        </Button>
      </Box>
      <StyledCalendar /> {/* Usa el componente StyledCalendar aquí */}
    </Box>
  );
};

export default CalendarPage;
