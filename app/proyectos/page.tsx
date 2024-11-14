'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface Project {
  id: number;
  nombre_proyecto: string;
  descripcion: string;
  imagen_proyecto: string | null;
  colaboradores: { fullname: string }[];
}

export default function ProjectList() {
  const { userId } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      axios.get(`/api/autch/proyectos/${userId}`)
        .then(response => setProjects(response.data))
        .catch(error => console.error('Error obteniendo proyectos:', error));
    }
  }, [userId]);

  const handleCreateProject = () => {
    router.push('/proyectos/create');
  };

  const handleCalculateCosts = (projectId: number) => {
    router.push(`/calculadora?id=${projectId}`);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f7f7f7', borderRadius: 2, boxShadow: 2, maxWidth: '1200px', mx: 'auto', mt: 5 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: '#1976d2',
          fontWeight: 'bold',
          mb: 3,
          borderBottom: '3px solid #1976d2',
          display: 'inline-block',
          paddingBottom: 1,
        }}
      >
        📁 Proyectos
      </Typography>
      
      {projects.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary" sx={{ mt: 3 }}>
          No tienes proyectos todavía.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="lista de proyectos">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                <TableCell align="center"><strong>Nombre del Proyecto</strong></TableCell>
                <TableCell align="center"><strong>Descripción</strong></TableCell>
                <TableCell align="center"><strong>Imagen</strong></TableCell>
                <TableCell align="center"><strong>Colaboradores</strong></TableCell>
                <TableCell align="center"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} hover sx={{ '&:hover': { backgroundColor: '#f1f8e9' } }}>
                  <TableCell align="center" sx={{ color: '#424242' }}>{project.nombre_proyecto}</TableCell>
                  <TableCell align="center" sx={{ color: '#424242' }}>{project.descripcion}</TableCell>
                  <TableCell align="center">
                    {project.imagen_proyecto ? (
                      <img
                        src={`/images/proyectos/${project.imagen_proyecto}`}
                        alt={project.nombre_proyecto}
                        style={{ width: '100px', height: 'auto', borderRadius: '8px' }}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No hay imagen disponible
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#424242' }}>
                    {Array.isArray(project.colaboradores) && project.colaboradores.length > 0
                      ? project.colaboradores.map((colaborador) => colaborador.fullname).join(', ')
                      : 'Sin colaboradores'}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCalculateCosts(project.id)}
                      sx={{
                        bgcolor: '#1a73e8',
                        '&:hover': { bgcolor: '#1664c0' },
                      }}
                    >
                      Calcular Costos
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateProject}
          size="large"
          sx={{
            bgcolor: '#43a047',
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#388e3c' },
          }}
        >
          Crear Nuevo Proyecto
        </Button>
      </Box>
    </Box>
  );
}
