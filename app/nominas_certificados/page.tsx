'use client';

import { Container, Typography, Button, Box, Card, CardContent, Divider, CardMedia } from '@mui/material';
import Link from 'next/link';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';

export default function NominasCertificadosPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center', p: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          color: '#283593',
          borderBottom: '4px solid #283593',
          display: 'inline-block',
          pb: 1,
          mb: 4,
        }}
      >
        📄 Nóminas y Certificados
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 5, fontSize: '1.1rem', maxWidth: 600, mx: 'auto' }}>
        Accede fácilmente a tus nóminas y certificados disponibles. Selecciona una de las opciones para revisar detalles o descargar documentos.
      </Typography>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="center" gap={4}>
        
        {/* Tarjeta de Nóminas */}
        <Card
          sx={{
            width: '100%',
            maxWidth: 380,
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
            borderRadius: 3,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)',
            },
            textAlign: 'left',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image="/images/nominas.jpg"
            alt="Nóminas"
          />
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AssignmentIcon color="primary" />
              <Typography variant="h6" fontWeight="bold" color="primary">
                Gestión de Nóminas
              </Typography>
            </Box>
            <Divider sx={{ mb: 2, bgcolor: '#eeeeee' }} />
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Consulta y descarga tus nóminas de forma rápida y segura.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              href="/nominas"
              sx={{
                py: 1.3,
                fontWeight: 'bold',
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' },
              }}
            >
              Ver Nóminas
            </Button>
          </CardContent>
        </Card>

        {/* Tarjeta de Certificados */}
        <Card
          sx={{
            width: '100%',
            maxWidth: 380,
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
            borderRadius: 3,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)',
            },
            textAlign: 'left',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image="/images/certificados.jpg"
            alt="Certificados"
          />
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <DescriptionIcon color="primary" />
              <Typography variant="h6" fontWeight="bold" color="primary">
                Gestión de Certificados
              </Typography>
            </Box>
            <Divider sx={{ mb: 2, bgcolor: '#eeeeee' }} />
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Revisa y descarga tus certificados de manera rápida y sencilla.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              href="/certificados"
              sx={{
                py: 1.3,
                fontWeight: 'bold',
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' },
              }}
            >
              Ver Certificados
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
