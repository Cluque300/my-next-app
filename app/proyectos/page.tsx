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
  colaboradores: { fullname: string }[]; // Incluimos los colaboradores
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

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Proyectos
      </Typography>
      {projects.length === 0 ? (
        <Typography variant="body1" align="center">
          No tienes proyectos todavía.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="lista de proyectos">
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>Nombre del Proyecto</strong></TableCell>
                <TableCell align="center"><strong>Descripción</strong></TableCell>
                <TableCell align="center"><strong>Imagen</strong></TableCell>
                <TableCell align="center"><strong>Colaboradores</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell align="center">
                    {project.nombre_proyecto}
                  </TableCell>
                  <TableCell align="center">
                    {project.descripcion}
                  </TableCell>
                  <TableCell align="center">
                    {project.imagen_proyecto ? (
                      <img
                        src={`/images/proyectos/${project.imagen_proyecto}`}
                        alt={project.nombre_proyecto}
                        style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No hay imagen disponible
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {Array.isArray(project.colaboradores) && project.colaboradores.length > 0
                      ? project.colaboradores.map((colaborador) => colaborador.fullname).join(', ')
                      : 'Sin colaboradores'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Botón para ir a la página de creación de proyectos */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProject}
          size="large"
        >
          Crear Nuevo Proyecto
        </Button>
      </Box>
    </Box>
  );
}
