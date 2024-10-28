// /app/users/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, Avatar, Box, Alert, Button, Divider } from '@mui/material';

interface User {
  [key: string]: string | number;
}

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<User | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info' | 'warning'; text: string } | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/autch/user/${id}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch(() => setMessage({ type: 'error', text: 'Error fetching user data' }));
    }
  }, [id]);

  if (!userData) return <Typography variant="h6" align="center">Cargando información del usuario...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      {message && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.type === 'error' ? 'Error' : 'Correcto'}: {message.text}
        </Alert>
      )}
      <Box textAlign="center" mb={4}>
        <Avatar
          src={`/images/users/${userData[23]}`}
          alt="Imagen de perfil"
          sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
        />
        <Typography variant="h4" fontWeight="bold">
          Información de Usuario
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {/* Personal Details */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Datos Personales</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2"><strong>Primer Nombre:</strong> {userData[1]}</Typography>
              <Typography variant="body2"><strong>Segundo Nombre:</strong> {userData[2]}</Typography>
              <Typography variant="body2"><strong>Primer Apellido:</strong> {userData[3]}</Typography>
              <Typography variant="body2"><strong>Segundo Apellido:</strong> {userData[4]}</Typography>
              <Typography variant="body2"><strong>Género:</strong> {userData[5]}</Typography>
              <Typography variant="body2"><strong>Fecha de Nacimiento:</strong> {userData[6]}</Typography>
              <Typography variant="body2"><strong>Edad:</strong> {userData[28]}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Contacto</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2"><strong>Correo:</strong> {userData[7]}@humanbionics.com.co</Typography>
              <Typography variant="body2"><strong>No. de Identificación:</strong> {userData[8]}</Typography>
              <Typography variant="body2"><strong>Celular:</strong> {userData[15]}</Typography>
              <Typography variant="body2"><strong>Teléfono:</strong> {userData[14]}</Typography>
              <Typography variant="body2"><strong>Dirección:</strong> {userData[9]}</Typography>
              <Typography variant="body2"><strong>Ciudad:</strong> {userData[11]}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Job and Education */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Formación y Cargo</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2"><strong>Profesión:</strong> {userData[17]}</Typography>
              <Typography variant="body2"><strong>Institución Pregrado:</strong> {userData[19]}</Typography>
              <Typography variant="body2"><strong>Posgrado:</strong> {userData[20]}</Typography>
              <Typography variant="body2"><strong>Cargo:</strong> {userData[42]}</Typography>
              <Typography variant="body2"><strong>Habilidades:</strong> {userData[16]}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Info */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Información Adicional</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2"><strong>Nombre de Contacto:</strong> {userData[24]}</Typography>
              <Typography variant="body2"><strong>Parentesco:</strong> {userData[40]}</Typography>
              <Typography variant="body2"><strong>Número de Contacto:</strong> {userData[25]}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Social Security */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Seguridad Social</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2"><strong>Entidad de Salud EPS:</strong> {userData[21]}</Typography>
              <Typography variant="body2"><strong>Administradora de Pensión:</strong> {userData[29]}</Typography>
              <Typography variant="body2"><strong>ARL:</strong> {userData[37]}</Typography>
              <Typography variant="body2"><strong>Tipo de Sangre:</strong> {userData[22]}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Banking Information */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Información Bancaria</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2"><strong>Número de Cuenta:</strong> {userData[32]}</Typography>
              <Typography variant="body2"><strong>Entidad Bancaria:</strong> {userData[30]}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" href={`/users/${userData.id}/edit`}>
          Editar Información
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;



