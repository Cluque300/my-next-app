// app/components/AvisoCard.tsx
import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface AvisoCardProps {
  description: string;
  date: string;
  onDelete: () => void;
}

const AvisoCard: React.FC<AvisoCardProps> = ({ description, date, onDelete }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardContent>
        <Box mb={1}>
          <Typography variant="h6" fontWeight="bold" component="div" sx={{ color: '#333' }}>
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(date).toLocaleDateString()}
          </Typography>
        </Box>
        <IconButton
          onClick={onDelete}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255, 0, 0, 0.1)',
            '&:hover': { bgcolor: 'rgba(255, 0, 0, 0.2)' },
          }}
          aria-label="delete"
        >
          <DeleteIcon color="error" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default AvisoCard;
