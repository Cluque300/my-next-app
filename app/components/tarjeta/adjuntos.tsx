'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem, Input, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Adjunto {
  id: number;
  nombre: string;
  url: string;
}

interface AdjuntosProps {
  tableroId: number;
  listaId: number;
  tarjetaId: number;
}

export default function Adjuntos({ tableroId, listaId, tarjetaId }: AdjuntosProps) {
  const [adjuntos, setAdjuntos] = useState<Adjunto[]>([]);
  const [newAdjunto, setNewAdjunto] = useState<File | null>(null);
  const [open, setOpen] = useState(false); // Estado para controlar la apertura del modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // URL de la imagen seleccionada

  useEffect(() => {
    const fetchAdjuntos = async () => {
      const response = await fetch(`/api/autch/tableros/${tableroId}/listas/${listaId}/tarjetas/${tarjetaId}/adjuntos`);
      if (response.ok) {
        const data = await response.json();
        setAdjuntos(data);
      } else {
        console.error('Error al obtener los adjuntos');
      }
    };

    fetchAdjuntos();
  }, [tableroId, listaId, tarjetaId]);

  const handleAddAdjunto = async () => {
    if (newAdjunto) {
      const formData = new FormData();
      formData.append('file', newAdjunto);
      formData.append('nombre', newAdjunto.name);

      const response = await fetch(`/api/autch/tableros/${tableroId}/listas/${listaId}/tarjetas/${tarjetaId}/adjuntos`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAdjuntos((prevAdjuntos) => [...prevAdjuntos, data]);
        setNewAdjunto(null);
      } else {
        const error = await response.json();
        console.error('Error al subir el adjunto:', error.error);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewAdjunto(e.target.files[0]);
    }
  };

  // Función para manejar clic en imagen o nombre
  const handleImageClick = (url: string) => {
    setSelectedImage(url); // Establecer la URL de la imagen seleccionada
    setOpen(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setOpen(false); // Cerrar el modal
    setSelectedImage(null); // Limpiar la URL seleccionada
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Adjuntos
      </Typography>
      <List sx={{ padding: 0 }}>
        {adjuntos.map((adjunto) => (
          <ListItem
            key={adjunto.id}
            sx={{
              mb: 1,
              padding: 1,
              borderRadius: 1,
              backgroundColor: '#f9f9f9',
              boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
            }}
          >
            {adjunto.url.includes('image') ? (
              <img
                src={adjunto.url}
                alt={adjunto.nombre}
                width={50}
                height={50}
                onClick={() => handleImageClick(adjunto.url)} // Clic en la imagen para abrir el modal
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <Typography variant="body2" onClick={() => handleImageClick(adjunto.url)} style={{ cursor: 'pointer' }}>
                {adjunto.nombre}
              </Typography>
            )}
          </ListItem>
        ))}
      </List>

      {/* Modal para mostrar la imagen seleccionada */}
      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 1,
            maxWidth: '90%',
            maxHeight: '90%',
            boxShadow: 24,
            overflow: 'auto',
          }}
        >
          {selectedImage && (
            <>
              <img src={selectedImage} alt="Imagen seleccionada" style={{ width: '100%', height: 'auto' }} />
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  color: 'black',
                }}
              >
                <CloseIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Modal>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <label htmlFor={`upload-adjunto-${tarjetaId}`}>
          <Input
            id={`upload-adjunto-${tarjetaId}`}
            type="file"
            onChange={handleFileChange}
            sx={{ display: 'none' }}
          />
          <Button variant="outlined" component="span">
            Seleccionar Archivo
          </Button>
        </label>
        <Button
          onClick={handleAddAdjunto}
          disabled={!newAdjunto}
          sx={{
            ml: 2,
            backgroundColor: '#007bff',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          Subir
        </Button>
      </Box>
    </Box>
  );
}
