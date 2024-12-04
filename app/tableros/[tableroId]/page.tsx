'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, TextField, Button } from "@mui/material";
import Tarjeta from "../../components/tarjeta/Tarjeta";

// Tipos de datos
interface TarjetaData {
  id: number;
  titulo: string;
  descripcion: string;
}

interface Lista {
  id: number;
  titulo: string;
  tarjetas: TarjetaData[];
}

interface Tablero {
  id: number;
  titulo: string;
  descripcion: string;
  listas: Lista[];
}

export default function TableroDetailPage() {
  const { tableroId } = useParams();
  const tableroIdNumber = Number(tableroId); // Aseguramos que tableroId sea un número

  const [tablero, setTablero] = useState<Tablero | null>(null);
  const [newListaTitulo, setNewListaTitulo] = useState("");
  const [newTarjetaTitulo, setNewTarjetaTitulo] = useState("");

  // Cargar tablero y listas al inicio
  useEffect(() => {
    if (isNaN(tableroIdNumber)) return; // Aseguramos que el ID es válido

    const fetchTablero = async () => {
      const tableroRes = await fetch(`/api/autch/tableros/${tableroIdNumber}/listas`);
      const listasData: Lista[] = await tableroRes.json();

      const listasConTarjetas = await Promise.all(
        listasData.map(async (lista) => {
          const tarjetasRes = await fetch(`/api/autch/tableros/${tableroIdNumber}/listas/${lista.id}/tarjetas`);
          const tarjetasData: TarjetaData[] = await tarjetasRes.json();
          return { ...lista, tarjetas: tarjetasData };
        })
      );

      setTablero({
        id: tableroIdNumber,
        titulo: "Tablero",
        descripcion: "Descripción del tablero",
        listas: listasConTarjetas,
      });
    };

    fetchTablero();
  }, [tableroIdNumber]);

  // Agregar una nueva lista
  const handleAddLista = async () => {
    if (!newListaTitulo || isNaN(tableroIdNumber)) return;

    const response = await fetch(`/api/autch/tableros/${tableroIdNumber}/listas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: newListaTitulo }),
    });

    if (response.ok) {
      const newLista = await response.json();
      setTablero((prev) => {
        if (!prev) return prev;
        return { ...prev, listas: [...prev.listas, newLista] };
      });
    }

    setNewListaTitulo(""); // Limpiar campo
  };

  // Agregar una nueva tarjeta
  const handleAddTarjeta = async (listaId: number) => {
    if (!newTarjetaTitulo || isNaN(tableroIdNumber)) return;

    const response = await fetch(`/api/autch/tableros/${tableroIdNumber}/listas/${listaId}/tarjetas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: newTarjetaTitulo }),
    });

    if (response.ok) {
      const newTarjeta = await response.json();
      setTablero((prev) => {
        if (!prev) return prev;
        const updatedListas = prev.listas.map((lista) =>
          lista.id === listaId
            ? { ...lista, tarjetas: [...lista.tarjetas, newTarjeta] }
            : lista
        );
        return { ...prev, listas: updatedListas };
      });
    }

    setNewTarjetaTitulo(""); // Limpiar campo
  };

  // Mostrar carga mientras se obtienen los datos
  if (!tablero) return <Typography>Cargando...</Typography>;

  return (
    <Box sx={{ p: 3, bgcolor: "#ebeff1", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#2c3e50" }}>
        {tablero.titulo}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: "#7f8c8d" }}>
        {tablero.descripcion}
      </Typography>

      {/* Listas y Tarjetas */}
      <Box sx={{ display: "flex", overflowX: "auto", gap: 3, flexWrap: "nowrap" }}>
        {tablero.listas.length > 0 ? (
          tablero.listas.map((lista) => (
            <Box
              key={lista.id}
              sx={{
                minWidth: 300,
                bgcolor: "#ffffff",
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1.03)",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e", mb: 2 }}>
                {lista.titulo}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {lista.tarjetas.map((tarjeta) => (
                  <Tarjeta
                    key={tarjeta.id}
                    id={tarjeta.id}
                    titulo={tarjeta.titulo}
                    descripcion={tarjeta.descripcion}
                    listaId={lista.id}
                    tableroId={tableroIdNumber}
                    onDelete={(id, listaId) => {
                      setTablero((prev) => {
                        if (!prev) return prev;
                        const updatedListas = prev.listas.map((lista) =>
                          lista.id === listaId
                            ? { ...lista, tarjetas: lista.tarjetas.filter((tarjeta) => tarjeta.id !== id) }
                            : lista
                        );
                        return { ...prev, listas: updatedListas };
                      });
                    }}
                  />
                ))}
              </Box>

              {/* Agregar Tarjeta */}
              <Box sx={{ mt: 2 }}>
                <TextField
                  placeholder="Nueva tarjeta"
                  value={newTarjetaTitulo}
                  onChange={(e) => setNewTarjetaTitulo(e.target.value)}
                  fullWidth
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 1,
                    boxShadow: 1,
                    "& .MuiInputBase-root": {
                      padding: "10px 14px",
                    },
                  }}
                />
                <Button
                  onClick={() => handleAddTarjeta(lista.id)}
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: "#3498db",
                    color: "#fff",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#2980b9" },
                  }}
                >
                  Añadir Tarjeta
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No se encontraron listas para este tablero.</Typography>
        )}
      </Box>

      {/* Agregar Lista */}
      <Box sx={{ mt: 3 }}>
        <TextField
          placeholder="Nueva Lista"
          value={newListaTitulo}
          onChange={(e) => setNewListaTitulo(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 1,
            boxShadow: 1,
            "& .MuiInputBase-root": {
              padding: "10px 14px",
            },
          }}
        />
        <Button
          onClick={handleAddLista}
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#3498db",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#2980b9" },
          }}
        >
          Añadir Lista
        </Button>
      </Box>
    </Box>
  );
}
