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
  const tableroIdNumber = Number(tableroId);

  const [tablero, setTablero] = useState<Tablero | null>(null);
  const [newListaTitulo, setNewListaTitulo] = useState("");
  const [newTarjetaTitulo, setNewTarjetaTitulo] = useState<{ [key: number]: string }>({});

  const [draggedCardId, setDraggedCardId] = useState<number | null>(null);
  const [draggedCardListaId, setDraggedCardListaId] = useState<number | null>(null);

  // Cargar tablero y listas al inicio
  useEffect(() => {
    if (isNaN(tableroIdNumber)) return;

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

    setNewListaTitulo("");
  };

  // Eliminar lista
  const handleDeleteLista = async (listaId: number) => {
    const response = await fetch(`/api/autch/tableros/${tableroIdNumber}/listas/${listaId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTablero((prev) => {
        if (!prev) return prev;
        const updatedListas = prev.listas.filter((lista) => lista.id !== listaId);
        return { ...prev, listas: updatedListas };
      });
    }
  };

  // Agregar una nueva tarjeta
  const handleAddTarjeta = async (listaId: number) => {
    if (!newTarjetaTitulo[listaId] || isNaN(tableroIdNumber)) return;

    const response = await fetch(`/api/autch/tableros/${tableroIdNumber}/listas/${listaId}/tarjetas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: newTarjetaTitulo[listaId] }),
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

    setNewTarjetaTitulo((prev) => ({ ...prev, [listaId]: "" }));
  };

  // Manejadores para arrastrar
  const handleDragStart = (id: number, listaId: number) => {
    setDraggedCardId(id);
    setDraggedCardListaId(listaId);
  };

  const handleDrop = async (nuevaListaId: number) => {
    if (draggedCardId !== null && draggedCardListaId !== null) {
      const response = await fetch(`/api/autch/tableros/${tableroIdNumber}/listas/${nuevaListaId}/tarjetas/mover`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tarjetaId: draggedCardId }),
      });

      if (response.ok) {
        const data = await response.json();
        setTablero((prev) => {
          if (!prev) return prev;

          const updatedListas = prev.listas.map((lista) => {
            if (lista.id === draggedCardListaId) {
              return { ...lista, tarjetas: lista.tarjetas.filter((t) => t.id !== draggedCardId) };
            }
            if (lista.id === nuevaListaId) {
              return { ...lista, tarjetas: [...lista.tarjetas, data.tarjeta] };
            }
            return lista;
          });
          return { ...prev, listas: updatedListas };
        });
      }
    }
    setDraggedCardId(null);
    setDraggedCardListaId(null);
  };

  if (!tablero) return <Typography>Cargando...</Typography>;

  return (
    <Box sx={{ p: 3, bgcolor: "#ebeff1", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#2c3e50" }}>
        {tablero.titulo}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: "#7f8c8d" }}>
        {tablero.descripcion}
      </Typography>

      {/* Contenedor que se desplaza */}
      <Box sx={{ display: "flex", overflowX: "auto", gap: 3 }}>
        {tablero.listas.map((lista) => (
          <Box
            key={lista.id}
            sx={{
              minWidth: 300,
              bgcolor: "#ffffff",
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              padding: 2,
            }}
            onDrop={() => handleDrop(lista.id)}
            onDragOver={(e) => e.preventDefault()}
          >
            <Typography variant="h6">{lista.titulo}</Typography>

            <Button
              variant="text"
              color="error"
              onClick={() => handleDeleteLista(lista.id)}
              sx={{ mb: 2 }}
            >
              Eliminar Lista
            </Button>

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
                        ? { ...lista, tarjetas: lista.tarjetas.filter((t) => t.id !== id) }
                        : lista
                    );
                    return { ...prev, listas: updatedListas };
                  });
                }}
                onDragStart={(e) => handleDragStart(tarjeta.id, lista.id)}
                draggable={true}
              />
            ))}

            <Box sx={{ mt: 2 }}>
              <TextField
                placeholder="Nueva tarjeta"
                value={newTarjetaTitulo[lista.id] || ""}
                onChange={(e) =>
                  setNewTarjetaTitulo((prev) => ({ ...prev, [lista.id]: e.target.value }))
                }
                fullWidth
                sx={{ mb: 1 }}
              />
              <Button variant="contained" onClick={() => handleAddTarjeta(lista.id)}>
                Agregar Tarjeta
              </Button>
            </Box>
          </Box>
        ))}

        {/* Formulario de agregar lista */}
        <Box sx={{ minWidth: 300, bgcolor: "#ffffff", p: 2, borderRadius: 2 }}>
          <Typography variant="h6">Agregar Lista</Typography>
          <TextField
            placeholder="Nueva lista"
            value={newListaTitulo}
            onChange={(e) => setNewListaTitulo(e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Button variant="contained" onClick={handleAddLista}>
            Agregar Lista
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
