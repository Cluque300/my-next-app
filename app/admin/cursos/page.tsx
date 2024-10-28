"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';

interface Curso {
  id: number; // ID del curso
  nombre: string; // Nombre del curso
  descripcion?: string; // Descripción del curso (opcional)
  fecha_inicio: Date; // Fecha de inicio del curso
  fecha_fin: Date; // Fecha de fin del curso
}

export default function AdminCursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]); // Estado para almacenar los cursos

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await fetch('/api/autch/cursos'); // Llama a la API para obtener los cursos
      const data = await response.json();
      setCursos(data); // Establece los cursos en el estado
    };

    fetchCursos(); // Ejecuta la función para obtener los cursos
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Gestión de Cursos</Typography>
      <Button variant="contained" component={Link} href="/admin/cursos/create">Crear Curso</Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Inicio</TableCell>
              <TableCell>Fecha de Fin</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.map((curso) => (
              <TableRow key={curso.id}>
                <TableCell>{curso.nombre}</TableCell>
                <TableCell>{curso.descripcion}</TableCell>
                <TableCell>{new Date(curso.fecha_inicio).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(curso.fecha_fin).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outlined" component={Link} href={`/admin/cursos/${curso.id}`}>Ver</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
