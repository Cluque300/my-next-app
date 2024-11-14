"use client";

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface Curso {
  id: number;
  nombre: string;
  descripcion?: string;
  fecha_inicio: string;
  fecha_fin: string;
  inscrito?: boolean;
}

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await fetch('/api/autch/cursos');
      const data = await response.json();

      const cursosConInscripcion = await Promise.all(
        data.map(async (curso: Curso) => {
          const inscripcionResponse = await fetch(`/api/autch/cursos/${curso.id}`);
          const inscripcionData = await inscripcionResponse.json();
          return {
            ...curso,
            inscrito: inscripcionData.inscripcion.some((i: any) => i.userId === userId),
          };
        })
      );

      setCursos(cursosConInscripcion);
    };

    fetchCursos();
  }, [userId]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Cursos Disponibles
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Typography variant="body1" color="textSecondary">
          Explora nuestros cursos y descubre nuevas oportunidades para aprender.
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Fecha de Inicio</strong></TableCell>
              <TableCell><strong>Fecha de Fin</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.map((curso) => (
              <TableRow key={curso.id} hover>
                <TableCell>{curso.nombre}</TableCell>
                <TableCell>{curso.descripcion || "No disponible"}</TableCell>
                <TableCell>{new Date(curso.fecha_inicio).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(curso.fecha_fin).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      href={`/cursos/${curso.id}`}
                    >
                      Ver curso
                    </Button>
                    {curso.inscrito ? (
                      <Button variant="contained" color="success" disabled>
                        Inscrito
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        component={Link}
                        href={`/cursos/${curso.id}`}
                      >
                        Inscribirse
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
