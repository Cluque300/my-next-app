"use client";

import React, { useEffect, useState } from "react";
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
  Divider,
} from "@mui/material";
import Link from "next/link";

interface Curso {
  id: number;
  nombre: string;
  descripcion?: string;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export default function AdminCursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await fetch("/api/autch/cursos");
      const data = await response.json();
      setCursos(data);
    };

    fetchCursos();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            mb: 3,
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
          }}
        >
          Gestión de Cursos
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/admin/cursos/create"
            sx={{
              fontWeight: "bold",
              py: 1,
              px: 2.5,
              borderRadius: 2,
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Crear Curso
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                  Nombre
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                  Descripción
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                  Fecha de Inicio
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                  Fecha de Fin
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cursos.map((curso) => (
                <TableRow
                  key={curso.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <TableCell sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>{curso.nombre}</TableCell>
                  <TableCell sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                    {curso.descripcion || "No disponible"}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                    {new Date(curso.fecha_inicio).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                    {new Date(curso.fecha_fin).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      href={`/admin/cursos/${curso.id}`}
                      sx={{
                        fontWeight: "bold",
                        py: 0.8,
                        px: 2,
                        fontSize: { xs: "0.75rem", sm: "0.9rem" },
                      }}
                    >
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
