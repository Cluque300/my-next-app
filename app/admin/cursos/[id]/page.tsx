"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography, CircularProgress, Box } from "@mui/material";

export default function AdminCursoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [curso, setCurso] = useState({
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    ubicacion: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await fetch(`/api/autch/cursos/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch curso");
        const data = await response.json();
        setCurso({
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          fecha_inicio: data.fecha_inicio?.split("T")[0] || "",
          fecha_fin: data.fecha_fin?.split("T")[0] || "",
          ubicacion: data.ubicacion || "",
        });
      } catch (error) {
        console.error("Error fetching curso:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurso((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/autch/cursos/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(curso),
      });
      if (!response.ok) throw new Error("Failed to update curso");
      alert("Curso actualizado con éxito");
      router.push("/admin/cursos");
    } catch (error) {
      console.error("Error updating curso:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Editar Curso
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="nombre"
          label="Nombre"
          value={curso.nombre}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="descripcion"
          label="Descripción"
          value={curso.descripcion}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <TextField
          name="fecha_inicio"
          label="Fecha de Inicio"
          type="date"
          value={curso.fecha_inicio}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="fecha_fin"
          label="Fecha de Fin"
          type="date"
          value={curso.fecha_fin}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="ubicacion"
          label="Ubicación"
          value={curso.ubicacion}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Guardar Cambios
        </Button>
      </form>
    </Container>
  );
}

