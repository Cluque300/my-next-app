'use client';

import { Container, Typography, Button, Box, Card, CardContent, Divider } from '@mui/material';
import Link from 'next/link';

export default function NominasCertificadosPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 6, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Nóminas y Certificados
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Accede a tus nóminas y certificados disponibles. Selecciona una opción para ver los detalles o descargar documentos.
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            boxShadow: 4,
            borderRadius: 2,
            textAlign: 'left',
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
              Gestión de Nóminas
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Consulta y descarga tus nóminas de forma rápida y segura.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={Link}
              href="/nominas"
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              Ver Nóminas
            </Button>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            boxShadow: 4,
            borderRadius: 2,
            textAlign: 'left',
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
              Gestión de Certificados
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Revisa y descarga tus certificados de manera rápida y sencilla.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={Link}
              href="/certificados"
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              Ver Certificados
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
