// app/inventario/[id]/edit/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de usar next/navigation
import { useParams } from 'next/navigation'; // Para obtener los parámetros de la ruta

export default function EditInventarioPage() {
  const router = useRouter();
  const { id } = useParams(); // Obtener el ID directamente desde los parámetros de la ruta
  const [formData, setFormData] = useState({
    nombre_elemento: '',
    descripcion: '',
    cantidad: 0,
    ubicacion: '',
    tipo_elemento: '',
    imagen: '',
    categoria: '',
  });

  useEffect(() => {
    const fetchElemento = async () => {
      if (id) {
        const response = await fetch(`/api/inventario/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Error al obtener el elemento');
        }
      }
    };

    fetchElemento();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/autch/inventario/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push(`/inventario/${id}`); // Redirigir a la página de detalles del elemento
    } else {
      console.error('Error al actualizar el elemento');
    }
  };

  return (
    <div>
      <h1>Editar Elemento</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre_elemento">Nombre del Elemento</label>
        <input
          type="text"
          name="nombre_elemento"
          id="nombre_elemento"
          value={formData.nombre_elemento}
          onChange={handleChange}
          required
          placeholder="Ingrese el nombre del elemento"
          title="Nombre del elemento"
        />
        
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          name="descripcion"
          id="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
          placeholder="Ingrese la descripción"
          title="Descripción del elemento"
        ></textarea>
        
        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          required
          placeholder="Ingrese la cantidad"
          title="Cantidad disponible"
        />
        
        <label htmlFor="ubicacion">Ubicación</label>
        <input
          type="text"
          name="ubicacion"
          id="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
          required
          placeholder="Ingrese la ubicación"
          title="Ubicación del elemento"
        />
        
        <label htmlFor="tipo_elemento">Tipo de Elemento</label>
        <input
          type="text"
          name="tipo_elemento"
          id="tipo_elemento"
          value={formData.tipo_elemento}
          onChange={handleChange}
          required
          placeholder="Ingrese el tipo de elemento"
          title="Tipo del elemento"
        />
        
        <label htmlFor="imagen">Imagen (URL)</label>
        <input
          type="text"
          name="imagen"
          id="imagen"
          value={formData.imagen}
          onChange={handleChange}
          placeholder="Ingrese la URL de la imagen"
          title="URL de la imagen del elemento"
        />
        
        <label htmlFor="categoria">Categoría</label>
        <input
          type="text"
          name="categoria"
          id="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
          placeholder="Ingrese la categoría"
          title="Categoría del elemento"
        />
        
        <button type="submit">Actualizar Elemento</button>
      </form>
    </div>
  );
}
