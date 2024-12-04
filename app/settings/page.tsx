'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // Contexto de autenticación

export default function SettingsPage() {
    const { userId } = useAuth(); // Obtener userId desde el contexto
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!userId) {
            setFeedback('No estás autenticado.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setFeedback('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('/api/autch/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setFeedback(data.error || 'Error al cambiar la contraseña.');
            } else {
                setFeedback('Contraseña actualizada con éxito.');
                setTimeout(() => router.push('/'), 2000); // Redirige después de un éxito
            }
        } catch (error) {
            console.error(error);
            setFeedback('Ocurrió un error en la solicitud.');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Configuración</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>Cambia tu contraseña</Typography>

            {feedback && <Alert severity={feedback.includes('éxito') ? 'success' : 'error'} sx={{ mb: 2 }}>{feedback}</Alert>}

            <TextField
                label="Contraseña actual"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Nueva contraseña"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Confirmar nueva contraseña"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={!currentPassword || !newPassword || !confirmPassword}
            >
                Guardar Cambios
            </Button>
        </Box>
    );
}

