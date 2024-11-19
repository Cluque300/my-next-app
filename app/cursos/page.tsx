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
import { useAuth } from "@/context/AuthContext";

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
      const response = await fetch("/api/autch/cursos");
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
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            mb: 3,
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
          }}
        >
          Cursos Disponibles
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, maxWidth: "80%" }}
          >
            Explora nuestros cursos y descubre nuevas oportunidades para aprender.
          </Typography>
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
                    <Box display="flex" gap={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        href={`/cursos/${curso.id}`}
                        sx={{
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                          py: 0.8,
                          px: 2,
                          borderRadius: 2,
                        }}
                      >
                        Ver curso
                      </Button>
                      {curso.inscrito ? (
                        <Button
                          variant="contained"
                          color="success"
                          disabled
                          sx={{
                            fontSize: { xs: "0.75rem", sm: "0.9rem" },
                            py: 0.8,
                            px: 2,
                            borderRadius: 2,
                          }}
                        >
                          Inscrito
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="secondary"
                          component={Link}
                          href={`/cursos/${curso.id}`}
                          sx={{
                            fontSize: { xs: "0.75rem", sm: "0.9rem" },
                            py: 0.8,
                            px: 2,
                            borderRadius: 2,
                          }}
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
      </Paper>
    </Container>
  );
}
