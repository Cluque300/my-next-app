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
        boxShadow: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box mb={1}>
          <Typography variant="h6" fontWeight="bold" component="div">
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(date).toLocaleDateString()}
          </Typography>
        </Box>
        <IconButton
          onClick={onDelete}
          sx={{ position: 'absolute', top: 8, right: 8 }}
          aria-label="delete"
        >
          <DeleteIcon color="error" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default AvisoCard;
