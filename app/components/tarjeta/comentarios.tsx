'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Comentario {
  id: number;
  contenido: string;
  usuario: { fullname: string };
}

interface ComentariosProps {
  tableroId: number;
  listaId: number;
  tarjetaId: number;
}

export default function Comentarios({ tableroId, listaId, tarjetaId }: ComentariosProps) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [newComentario, setNewComentario] = useState('');

  // Obtener los comentarios desde el backend
  useEffect(() => {
    const fetchComentarios = async () => {
      const response = await fetch(`/api/autch/tableros/${tableroId}/listas/${listaId}/tarjetas/${tarjetaId}/comentarios`);
      const data = await response.json();
      if (response.ok) {
        setComentarios(data);
      } else {
        console.error('Error al obtener los comentarios:', data.error);
      }
    };

    fetchComentarios();
  }, [tableroId, listaId, tarjetaId]);

  // Función para añadir un nuevo comentario
  const handleAddComentario = async () => {
    if (!newComentario.trim()) return;

    const response = await fetch(`/api/autch/tableros/${tableroId}/listas/${listaId}/tarjetas/${tarjetaId}/comentarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenido: newComentario, usuarioId: 1 }), // UsuarioId es un ejemplo
    });

    const data = await response.json();
    if (response.ok) {
      setComentarios((prev) => [...prev, data]);
      setNewComentario('');
    } else {
      console.error('Error al agregar el comentario:', data.error);
    }
  };

  // Función para eliminar un comentario
  const handleDeleteComentario = async (comentarioId: number) => {
    const response = await fetch(`/api/autch/tableros/${tableroId}/listas/${listaId}/tarjetas/${tarjetaId}/comentarios/${comentarioId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setComentarios((prev) => prev.filter((comentario) => comentario.id !== comentarioId));
    } else {
      console.error('Error al eliminar el comentario');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Comentarios</Typography>
      <List>
        {comentarios.map((comentario) => (
          <ListItem key={comentario.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              <strong>{comentario.usuario.fullname}:</strong> {comentario.contenido}
            </Typography>
            <IconButton onClick={() => handleDeleteComentario(comentario.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          label="Nuevo comentario"
          value={newComentario}
          onChange={(e) => setNewComentario(e.target.value)}
          fullWidth
        />
        <Button onClick={handleAddComentario} sx={{ ml: 1 }}>
          Comentar
        </Button>
      </Box>
    </Box>
  );
}
