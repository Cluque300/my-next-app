// app/inventario/page.tsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

interface InventarioItem {
  id_elemento: string;
  nombre_elemento: string;
  descripcion: string;
  cantidad: number;
  ubicacion: string;
  tipo_elemento: string;
  imagen?: string;
  categoria: string;
}

export default function InventarioPage() {
  const [inventario, setInventario] = useState<InventarioItem[]>([]);

  useEffect(() => {
    const fetchInventario = async () => {
      const response = await fetch('/api/autch/inventario');
      const data = await response.json();
      setInventario(data);
    };

    fetchInventario();
  }, []);

  return (
    <div>
      <h1>Inventario</h1>
      <Button variant="contained" color="primary">
        <Link href="/inventario/create" style={{ color: 'white', textDecoration: 'none' }}>
          Agregar Nuevo Elemento
        </Link>
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventario.map(item => (
              <TableRow key={item.id_elemento}>
                <TableCell>{item.nombre_elemento}</TableCell>
                <TableCell>{item.descripcion}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
                <TableCell>{item.ubicacion}</TableCell>
                <TableCell>{item.tipo_elemento}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">
                    <Link href={`/inventario/${item.id_elemento}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      Ver Detalles
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
