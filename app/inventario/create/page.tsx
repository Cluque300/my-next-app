// app/inventario/create/page.tsx
"use client"; // Agregar esta línea al inicio del archivo para marcarlo como Client Component

import { useRouter } from 'next/navigation'; // Importa useRouter desde next/navigation
import { useState } from 'react';

export default function CreateInventarioPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id_elemento: '', // Agregar el campo id_elemento
    nombre_elemento: '',
    descripcion: '',
    cantidad: 0,
    ubicacion: '',
    tipo_elemento: '',
    imagen: '',
    categoria: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/autch/inventario', { // Cambiar '/api/autch/inventario' a '/api/inventario'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push('/inventario'); // Redirigir a la lista de inventario
    } else {
      const errorDetails = await response.json(); // Capturar los detalles del error
      console.error('Error al crear el elemento:', errorDetails.error);
    }
  };

  return (
    <div>
      <h1>Agregar Nuevo Elemento</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="id_elemento" // Campo para id_elemento
          value={formData.id_elemento} 
          onChange={handleChange} 
          required 
          placeholder="ID del elemento" 
        />
        <input 
          type="text" 
          name="nombre_elemento" 
          value={formData.nombre_elemento} 
          onChange={handleChange} 
          required 
          placeholder="Nombre del elemento" 
        />
        <textarea 
          name="descripcion" 
          value={formData.descripcion} 
          onChange={handleChange} 
          required 
          placeholder="Descripción del elemento" 
        ></textarea>
        <input 
          type="number" 
          name="cantidad" 
          value={formData.cantidad} 
          onChange={handleChange} 
          required 
          placeholder="Cantidad" 
        />
        <input 
          type="text" 
          name="ubicacion" 
          value={formData.ubicacion} 
          onChange={handleChange} 
          required 
          placeholder="Ubicación" 
        />
        <input 
          type="text" 
          name="tipo_elemento" 
          value={formData.tipo_elemento} 
          onChange={handleChange} 
          required 
          placeholder="Tipo de elemento" 
        />
        <input 
          type="text" 
          name="imagen" 
          value={formData.imagen} 
          onChange={handleChange} 
          placeholder="URL de la imagen" 
        />
        <input 
          type="text" 
          name="categoria" 
          value={formData.categoria} 
          onChange={handleChange} 
          required 
          placeholder="Categoría" 
        />
        <button type="submit">Crear Elemento</button>
      </form>
    </div>
  );
}
