'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Box, Typography, Button, TextField } from '@mui/material';

export default function CalculadoraPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id'); // Obtener el ID del proyecto de los parámetros de búsqueda

  const [formData, setFormData] = useState({
    projectDuration: '',
    adminCost: '',
    locativeCost: '',
    machineryCost: '',
    materialCosts: '',
    otherCosts: '',
  });

  const [totalCost, setTotalCost] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectId || Object.values(formData).some(field => !field)) {
      console.error('Faltan campos obligatorios.');
      return;
    }

    try {
      const response = await axios.post('/api/autch/calculadora', {
        ...formData,
        projectId,
      });
      console.log('Calculadora creada:', response.data);
      setTotalCost(response.data.totalCost); // Set total cost from response
    } catch (error) {
      console.error('Error al crear la calculadora:', error);
      alert('Error al crear la calculadora. Intenta de nuevo.');
    }
  };

  return (
    <Container>
      <Box sx={{ p: 4, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Calculadora de Costos para el Proyecto {projectId}
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Ingresa los costos y duración del proyecto para calcular el costo total.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Duración del Proyecto (días)"
            name="projectDuration"
            onChange={handleChange}
            value={formData.projectDuration}
            fullWidth
            required
            variant="outlined"
            margin="normal"
            inputProps={{ type: 'number' }} // Restringir a solo números
          />
          <TextField
            label="Costo Administrativo"
            name="adminCost"
            type="number"
            onChange={handleChange}
            value={formData.adminCost}
            fullWidth
            required
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Costo Locativo"
            name="locativeCost"
            type="number"
            onChange={handleChange}
            value={formData.locativeCost}
            fullWidth
            required
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Costo de Maquinaria"
            name="machineryCost"
            type="number"
            onChange={handleChange}
            value={formData.machineryCost}
            fullWidth
            required
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Costo de Materiales"
            name="materialCosts"
            type="number"
            onChange={handleChange}
            value={formData.materialCosts}
            fullWidth
            required
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Otros Costos"
            name="otherCosts"
            type="number"
            onChange={handleChange}
            value={formData.otherCosts}
            fullWidth
            required
            variant="outlined"
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ textTransform: 'none', mt: 3 }}
          >
            Calcular Costos
          </Button>
        </form>

        {totalCost !== null && (
          <Box sx={{ mt: 4, p: 2, bgcolor: '#e0f7fa', borderRadius: 1 }}>
            <Typography variant="h5">Costo total: {totalCost}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Este es el costo total calculado basado en los siguientes inputs:
              <ul>
                <li>Duración del proyecto: {formData.projectDuration} días</li>
                <li>Costo administrativo: ${formData.adminCost}</li>
                <li>Costo locativo: ${formData.locativeCost}</li>
                <li>Costo de maquinaria: ${formData.machineryCost}</li>
                <li>Costo de materiales: ${formData.materialCosts}</li>
                <li>Otros costos: ${formData.otherCosts}</li>
              </ul>
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

