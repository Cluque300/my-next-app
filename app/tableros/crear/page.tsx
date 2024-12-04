'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function CrearTableroPage() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const router = useRouter();

  const handleCrearTablero = async () => {
    if (!titulo) return;
    const response = await fetch("/api/autch/tableros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descripcion, userId: 1 }),
    });
    if (response.ok) router.push("/tableros");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Crear Tablero
      </Typography>
      <TextField
        label="Título"
        fullWidth
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Descripción"
        fullWidth
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleCrearTablero}
        sx={{
          bgcolor: "#2ecc71",
          "&:hover": { bgcolor: "#27ae60" },
        }}
      >
        Crear
      </Button>
    </Box>
  );
}
