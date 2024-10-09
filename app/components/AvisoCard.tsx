// app/components/AvisoCard.tsx
import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Asegúrate de tener el ícono de eliminación

interface AvisoCardProps {
  description: string;
  date: string; // Puedes cambiar esto a Date si prefieres
  onDelete: () => void; // Añadir la función de borrar como prop
}

const AvisoCard: React.FC<AvisoCardProps> = ({ description, date, onDelete }) => {
  return (
    <Card variant="outlined" sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {description}
        </Typography>
        <Typography color="textSecondary">
          {new Date(date).toLocaleDateString()}
        </Typography>
        <IconButton 
          onClick={onDelete} 
          sx={{ position: 'absolute', bottom: 10, right: 10 }} // Posicionamiento en la tarjeta
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default AvisoCard;
