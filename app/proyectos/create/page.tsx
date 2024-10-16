'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

interface User {
  id: number;
  fullname: string;
}

export default function CreateProject() {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    nombre_proyecto: '',
    descripcion: '',
    imagen_proyecto: null as File | null,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // Para los colaboradores
  const router = useRouter();

  useEffect(() => {
    // Obtener la lista de usuarios para el selector de colaboradores
    axios.get('/api/autch/user')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error obteniendo usuarios:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, imagen_proyecto: e.target.files?.[0] || null });
  };

  const handleSelectChange = (event: SelectChangeEvent<number[]>) => {
    setSelectedUsers(event.target.value as number[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre_proyecto || !formData.descripcion || !userId) {
      console.error('Faltan campos obligatorios.');
      return;
    }

    const data = new FormData();
    data.append('nombre_proyecto', formData.nombre_proyecto);
    data.append('descripcion', formData.descripcion);
    data.append('userId', userId.toString()); // Agregar userId al formulario
    data.append('colaboradores', JSON.stringify(selectedUsers)); // Enviar los colaboradores

    if (formData.imagen_proyecto) {
      const fileExtension = formData.imagen_proyecto.name.split('.').pop()?.toLowerCase();
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      if (!allowedExtensions.includes(fileExtension || '')) {
        console.error('Formato de imagen no permitido');
        return;
      }
      data.append('imagen_proyecto', formData.imagen_proyecto);
    }

    try {
      const response = await axios.post('/api/autch/proyectos', data);
      console.log('Proyecto creado:', response.data);
      router.push('/proyectos');
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      alert('Error al crear el proyecto. Intenta de nuevo.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          mt: 5,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Crear Proyecto
        </Typography>
        <TextField
          label="Nombre del proyecto"
          name="nombre_proyecto"
          onChange={handleChange}
          value={formData.nombre_proyecto}
          fullWidth
          required
          variant="outlined"
        />
        <TextField
          label="Descripción del proyecto"
          name="descripcion"
          onChange={handleChange}
          value={formData.descripcion}
          fullWidth
          required
          multiline
          rows={4}
          variant="outlined"
        />

        {/* Selector de colaboradores */}
        <FormControl fullWidth>
          <InputLabel id="colaboradores-label">Colaboradores</InputLabel>
          <Select
            labelId="colaboradores-label"
            multiple
            value={selectedUsers}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Colaboradores" />}
            renderValue={(selected) =>
              selected.map((id) => users.find(user => user.id === id)?.fullname).join(', ')
            }
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                <Checkbox checked={selectedUsers.indexOf(user.id) > -1} />
                <ListItemText primary={user.fullname} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ textTransform: 'none' }}
        >
          Crear Proyecto
        </Button>
      </Box>
    </Container>
  );
}
