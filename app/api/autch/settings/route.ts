import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { userId, currentPassword, newPassword } = await request.json();

        // Validar que los datos necesarios estén presentes
        if (!userId || !currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Todos los campos son requeridos.' },
                { status: 400 }
            );
        }

        // Buscar usuario por ID
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Usuario no encontrado.' },
                { status: 404 }
            );
        }

        // Verificar la contraseña actual
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json(
                { error: 'Contraseña actual incorrecta.' },
                { status: 401 }
            );
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña en la base de datos
        await prisma.user.update({
            where: { id: parseInt(userId, 10) },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: 'Contraseña actualizada con éxito.' });
    } catch (error) {
        console.error('Error en POST /api/autch/settings:', error);
        return NextResponse.json(
            { error: 'Error al actualizar la contraseña.' },
            { status: 500 }
        );
    }
}

