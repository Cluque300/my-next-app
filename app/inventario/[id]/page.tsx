// app/inventario/[id]/page.tsx
"use client"; // Marca este componente como Client Component
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Importa useParams para obtener los parámetros de la ruta
import Link from 'next/link';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface InventarioItem {
  id_elemento: string;
  nombre_elemento: string;
  descripcion: string;
  cantidad: number;
  ubicacion: string;
  tipo_elemento: string;
  imagen?: string;
  categoria: string;
  userId?: string | null; // Asumiendo que también tienes userId
  createdAt?: string; // Suponiendo que hay una fecha de creación
  updatedAt?: string; // Suponiendo que hay una fecha de actualización
}

export default function InventarioItemPage() {
  const { id } = useParams(); // Obtén el ID directamente de los parámetros de la ruta
  const [item, setItem] = useState<InventarioItem | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        const response = await fetch(`/api/autch/inventario/${id}`);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          console.error('Error al obtener el elemento');
        }
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <div>Cargando...</div>; // Muestra un mensaje mientras carga
  }

  return (
    <div>
      <h1>{item.nombre_elemento}</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Propiedad</strong></TableCell>
              <TableCell><strong>Valor</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ID del Elemento</TableCell>
              <TableCell>{item.id_elemento}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nombre del Elemento</TableCell>
              <TableCell>{item.nombre_elemento}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>{item.descripcion}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cantidad</TableCell>
              <TableCell>{item.cantidad}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ubicación</TableCell>
              <TableCell>{item.ubicacion}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tipo de Elemento</TableCell>
              <TableCell>{item.tipo_elemento}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>{item.imagen ? <img src={item.imagen} alt={item.nombre_elemento} style={{ width: '100px' }} /> : 'Sin imagen'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>{item.categoria}</TableCell>
            </TableRow>
            {item.userId && (
              <TableRow>
                <TableCell>ID de Usuario</TableCell>
                <TableCell>{item.userId}</TableCell>
              </TableRow>
            )}
            {item.createdAt && (
              <TableRow>
                <TableCell>Fecha de Creación</TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            )}
            {item.updatedAt && (
              <TableRow>
                <TableCell>Fecha de Actualización</TableCell>
                <TableCell>{new Date(item.updatedAt).toLocaleDateString()}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Link href="/inventario">Volver a Inventario</Link>
    </div>
  );
}
