'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Checkbox, TextField, Button, List, ListItem, IconButton, LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Subtarea {
  id: number;
  titulo: string;
  completado: boolean;
}

interface SubtareasProps {
  tableroId: number;
  listaId: number;
  tarjetaId: number;
}

export default function Subtareas({ tableroId, listaId, tarjetaId }: SubtareasProps) {
  const [subtareas, setSubtareas] = useState<Subtarea[]>([]);
  const [newSubtarea, setNewSubtarea] = useState('');

  // Obtener las subtareas desde el backend al cargar el componente
  useEffect(() => {
    const fetchSubtareas = async () => {
      const response = await fetch(`/api/autch/tableros/${tableroId}/listas/${listaId}/tarjetas/${tarjetaId}/subtareas`);
      const data = await response.json();
      if (response.ok) {
        setSubtareas(data);
      } else {
        console.error('Error al obtener las subtareas:', data.error);
      }
    };

    fetchSubtareas();
  }, [tableroId, listaId, tarjetaId]); // Se ejecuta solo cuando cambia el tarjetaId

  // Función para añadir una nueva subtarea
  const handleAddSubtarea = async () => {
    if (!newSubtarea.trim()) return; // Evitar añadir subtareas vacías

    const response = await fetch(`/api/autch/tableros/${tableroId}/listas/${listaId}/tarjetas/${tarjetaId}/subtareas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: newSubtarea, completado: false }),
    });

    const data = await response.json();
    if (response.ok) {
      // Actualizamos el estado de subtareas
      setSubtareas((prev) => [...prev, data]);
      setNewSubtarea(''); // Limpiar el campo de texto
    } else {
      console.error('Error al agregar la subtarea:', data.error);
    }
  };

  // Función para marcar una subtarea como completada o no completada
  const toggleCompletado = async (id: number) => {
    const subtarea = subtareas.find((sub) => sub.id === id);
    if (!subtarea) return;

    const updatedSubtarea = { ...subtarea, completado: !subtarea.completado };

    // Actualizar la subtarea en el backend
    const response = await fetch(`/api/autch/tableros/${tableroId}/listas/${listaId}/tarjetas/${tarjetaId}/subtareas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSubtarea),
    });

    const data = await response.json();
    if (response.ok) {
      // Actualizamos el estado de la subtarea
      setSubtareas((prev) =>
        prev.map((sub) => (sub.id === id ? updatedSubtarea : sub))
      );
    } else {
      console.error('Error al actualizar la subtarea:', data.error);
    }
  };

  // Función para eliminar una subtarea
  const handleDeleteSubtarea = async (id: number) => {
    const response = await fetch(`/api/autch/tableros/${tableroId}/listas/${listaId}/tarjetas/${tarjetaId}/subtareas/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Eliminamos la subtarea del estado
      setSubtareas((prev) => prev.filter((subtarea) => subtarea.id !== id));
    } else {
      const data = await response.json();
      console.error('Error al eliminar la subtarea:', data.error);
    }
  };

  // Calcular el porcentaje de subtareas completadas
  const completadoCount = subtareas.filter((subtarea) => subtarea.completado).length;
  const porcentajeCompletado = subtareas.length > 0 ? (completadoCount / subtareas.length) * 100 : 0;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Subtareas</Typography>

      {/* Barra de progreso */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Progreso: {Math.round(porcentajeCompletado)}%
        </Typography>
        <LinearProgress variant="determinate" value={porcentajeCompletado} />
      </Box>

      <List>
        {subtareas.map((subtarea) => (
          <ListItem key={subtarea.id} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={subtarea.completado}
              onChange={() => toggleCompletado(subtarea.id)}
            />
            {subtarea.titulo}
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => handleDeleteSubtarea(subtarea.id)}
              color="error"
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          label="Nueva subtarea"
          value={newSubtarea}
          onChange={(e) => setNewSubtarea(e.target.value)}
          fullWidth
        />
        <Button onClick={handleAddSubtarea} sx={{ ml: 1 }}>
          Añadir
        </Button>
      </Box>
    </Box>
  );
}
