'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

interface Solicitud {
  id: number;
  tipo_solicitud: string;
  estado_solicitud: string;
  user: { fullname: string };
}

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

  useEffect(() => {
    axios.get('/api/autch/solicitudes')
      .then(response => setSolicitudes(response.data))
      .catch(error => console.error('Error obteniendo solicitudes:', error));
  }, []);

  const handleAceptar = (id: number, tipo: string) => {
    const url = tipo === 'vacaciones'
      ? `/api/autch/vacaciones/aceptar/${id}`
      : `/api/autch/permisos/aceptar/${id}`;

    axios.put(url)
      .then(() => window.location.reload())
      .catch(error => console.error('Error aceptando solicitud:', error));
  };

  const handleRechazar = (id: number, tipo: string) => {
    const url = tipo === 'vacaciones'
      ? `/api/autch/vacaciones/rechazar/${id}`
      : `/api/autch/permisos/rechazar/${id}`;

    axios.put(url)
      .then(() => window.location.reload())
      .catch(error => console.error('Error rechazando solicitud:', error));
  };

  return (
    <div>
      <h1>Solicitudes Pendientes</h1>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes pendientes.</p>
      ) : (
        solicitudes.map(solicitud => (
          <div key={solicitud.id}>
            <p>{solicitud.tipo_solicitud} de {solicitud.user.fullname}</p>
            <p>Estado: {solicitud.estado_solicitud}</p>
            {solicitud.estado_solicitud === 'Pendiente' && (
              <>
                <Button onClick={() => handleAceptar(solicitud.id, solicitud.tipo_solicitud)}>Aceptar</Button>
                <Button onClick={() => handleRechazar(solicitud.id, solicitud.tipo_solicitud)}>Rechazar</Button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
