'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";

interface Tablero {
  id: number;
  titulo: string;
  descripcion: string;
}

export default function TablerosPage() {
  const [tableros, setTableros] = useState<Tablero[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTableros = async () => {
      const response = await fetch("/api/autch/tableros", {
        headers: {
          "user-id": "1", // Cambiar según el sistema de autenticación
        },
      });
      const data: Tablero[] = await response.json();
      setTableros(data);
    };

    fetchTableros();
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#f4f5f7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#2c3e50", mb: 4 }}
      >
        Mis Tableros
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          justifyContent: "center",
        }}
      >
        {tableros.map((tablero) => (
          <Card
            key={tablero.id}
            sx={{
              width: 260,
              bgcolor: "#ffffff",
              borderRadius: 2,
              cursor: "pointer",
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                transform: "translateY(-5px)",
              },
            }}
            onClick={() => router.push(`/tableros/${tablero.id}`)}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#34495e",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {tablero.titulo}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: "#7f8c8d",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2, // Limita a 2 líneas
                }}
              >
                {tablero.descripcion}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Button
        variant="contained"
        sx={{
          mt: 4,
          bgcolor: "#2ecc71",
          color: "#ffffff",
          fontWeight: "bold",
          padding: "10px 20px",
          "&:hover": { bgcolor: "#27ae60" },
        }}
        onClick={() => router.push("/tableros/crear")}
      >
        Crear Tablero
      </Button>
    </Box>
  );
}
