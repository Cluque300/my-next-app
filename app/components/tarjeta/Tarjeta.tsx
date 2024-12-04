'use client';

import { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Icono para el botón de eliminar
import Adjuntos from './adjuntos';
import Subtareas from './subtareas';
import Comentarios from './comentarios';

interface TarjetaProps {
  id: number;
  titulo: string;
  descripcion: string;
  listaId: number;
  tableroId: number;
  onDelete: (id: number, listaId: number) => void;
}

export default function Tarjeta({ id, titulo, descripcion, listaId, tableroId, onDelete }: TarjetaProps) {
  const [openModal, setOpenModal] = useState(false);
  const [showAdjuntos, setShowAdjuntos] = useState(false);
  const [showSubtareas, setShowSubtareas] = useState(false);
  const [showComentarios, setShowComentarios] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const response = await fetch(`/api/autch/tableros/${tableroId}/listas/${listaId}/tarjetas/${id}`, { method: 'DELETE' });
      if (response.ok) onDelete(id, listaId);
      else console.error('Error al eliminar la tarjeta');
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
    }
  };

  return (
    <>
      <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 2, p: 2, position: 'relative' }} onClick={handleOpenModal}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {titulo}
          </Typography>
          <Typography variant="body2" color="textSecondary">{descripcion}</Typography>
          <IconButton color="error" onClick={handleDelete} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>

      {/* Modal flotante */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{titulo}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>{descripcion}</Typography>

          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={() => setShowSubtareas(!showSubtareas)}>
              {showSubtareas ? 'Ocultar Subtareas' : 'Ver Subtareas'}
            </Button>
            <Button variant="outlined" onClick={() => setShowComentarios(!showComentarios)}>
              {showComentarios ? 'Ocultar Comentarios' : 'Ver Comentarios'}
            </Button>
            <Button variant="outlined" onClick={() => setShowAdjuntos(!showAdjuntos)}>
              {showAdjuntos ? 'Ocultar Adjuntos' : 'Ver Adjuntos'}
            </Button>
          </Box>

          <Collapse in={showSubtareas}>
            {/* Pasar todas las propiedades requeridas */}
            <Subtareas tableroId={tableroId} listaId={listaId} tarjetaId={id} />
          </Collapse>
          <Collapse in={showComentarios}>
          <Comentarios tableroId={tableroId} listaId={listaId} tarjetaId={id} />
          </Collapse>
          <Collapse in={showAdjuntos}>
            <Adjuntos tarjetaId={id} />
          </Collapse>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
