'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem } from '@mui/material';

interface Comentario {
  id: number;
  contenido: string;  // Cambié 'texto' a 'contenido' para que coincida con el backend
  usuario: { fullname: string };  // Cambié 'autor' por 'usuario.fullname'
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
  }, [tableroId, listaId, tarjetaId]); // Se ejecuta cuando cambia el tarjetaId

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
      // Actualizamos el estado de comentarios
      setComentarios((prev) => [...prev, data]);
      setNewComentario(''); // Limpiar el campo de texto
    } else {
      console.error('Error al agregar el comentario:', data.error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Comentarios</Typography>
      <List>
        {comentarios.map((comentario) => (
          <ListItem key={comentario.id}>
            <Typography>
              <strong>{comentario.usuario.fullname}:</strong> {comentario.contenido}  {/* Mostrar el nombre completo del autor */}
            </Typography>
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
