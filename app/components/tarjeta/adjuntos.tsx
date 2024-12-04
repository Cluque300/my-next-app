'use client';

import { useState } from 'react';
import { Box, Typography, Button, List, ListItem, Input } from '@mui/material';

interface Adjunto {
  id: number;
  nombre: string;
}

interface AdjuntosProps {
  tarjetaId: number;
}

export default function Adjuntos({ tarjetaId }: AdjuntosProps) {
  const [adjuntos, setAdjuntos] = useState<Adjunto[]>([]);
  const [newAdjunto, setNewAdjunto] = useState<File | null>(null);

  const handleAddAdjunto = () => {
    if (newAdjunto) {
      setAdjuntos([...adjuntos, { id: Date.now(), nombre: newAdjunto.name }]);
      setNewAdjunto(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewAdjunto(e.target.files[0]);
    }
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
            <Typography variant="body2">{adjunto.nombre}</Typography>
          </ListItem>
        ))}
      </List>
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
