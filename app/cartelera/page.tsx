'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '@/context/AuthContext'; // Si tienes un contexto de autenticación

interface Solicitud {
  id: number;
  tipo_solicitud: 'vacaciones' | 'permiso';  // Especifica los tipos de solicitud
  estado_solicitud: string;
  createdAt: string;
  tipo_vacaciones?: string;  // Solo para solicitudes de vacaciones
  motivo_permiso?: string;   // Solo para solicitudes de permisos
}

export default function CarteleraPage() {
  const { userId } = useAuth(); // Obtener el usuario autenticado
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const url = `/api/autch/solicitudes/${userId}`;  // Asegurarse de que el userId esté definido

      axios.get(url)
        .then(response => {
          setSolicitudes(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error obteniendo solicitudes:', error);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Mi Cartelera de Solicitudes
      </Typography>
      {solicitudes.length === 0 ? (
        <Typography>No tienes solicitudes registradas.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tipo de Solicitud</TableCell>
                <TableCell>Fecha de Creación</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitudes.map((solicitud) => (
                <TableRow key={solicitud.id}>
                  <TableCell>
                    {solicitud.tipo_solicitud === 'vacaciones'
                      ? `Vacaciones - ${solicitud.tipo_vacaciones || 'No especificado'}`
                      : `Permiso - ${solicitud.motivo_permiso || 'No especificado'}`}
                  </TableCell>
                  <TableCell>{new Date(solicitud.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{solicitud.estado_solicitud}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
