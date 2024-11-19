// app/avisos/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  Button,
  Alert,
  Box,
} from "@mui/material";
import AvisoCard from "../components/AvisoCard";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

interface Aviso {
  id: number;
  description: string;
  date: string;
}

export default function AvisosPage() {
  const { userId } = useAuth();
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvisos = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/autch/avisos?userId=${userId}`);
        if (!response.ok) throw new Error("Error al obtener los avisos");

        const data = await response.json();
        setAvisos(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchAvisos();
  }, [userId]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/autch/avisos/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar el aviso");
      setAvisos((prevAvisos) => prevAvisos.filter((aviso) => aviso.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Cargando avisos...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 5 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#1a73e8",
            borderBottom: "3px solid #1a73e8",
            paddingBottom: 0.5,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          📢 Mis Avisos
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/avisos/create"
          sx={{
            bgcolor: "#1a73e8",
            color: "#fff",
            fontWeight: "bold",
            fontSize: { xs: "0.8rem", md: "1rem" },
            px: 2,
            py: 1,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            "&:hover": { bgcolor: "#1664c0" },
          }}
        >
          + Crear Aviso
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, fontSize: "0.9rem" }}>
          {error}
        </Alert>
      )}

      {avisos.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, mt: 4 }}
        >
          No tienes avisos registrados.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {avisos.map((aviso) => (
            <Grid item xs={12} sm={6} md={4} key={aviso.id}>
              <AvisoCard
                description={aviso.description}
                date={aviso.date}
                onDelete={() => handleDelete(aviso.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
