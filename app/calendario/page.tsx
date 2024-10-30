// app/calendario/page.tsx
'use client';

import { Box, Button, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import StyledCalendar from '../components/StyledCalendar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import EventIcon from '@mui/icons-material/Event';

const CalendarPage = () => {
  const router = useRouter();

  return (
    <Paper
      sx={{
        padding: 4,
        backgroundColor: '#f4f6f8',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '900px',
        margin: 'auto',
        mt: 5,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Calendario
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<BeachAccessIcon />}
          onClick={() => router.push('/vacaciones')}
          sx={{ mr: 1 }}
        >
          Vacaciones
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<EventIcon />}
          onClick={() => router.push('/permisos')}
        >
          Permisos
        </Button>
      </Box>
      <StyledCalendar />
    </Paper>
  );
};

export default CalendarPage;

