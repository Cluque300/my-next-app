'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './admin.module.css'; // Opcional: Estilos personalizados para la página de administración

const AdminDashboard = () => {
    const [adminId, setAdminId] = useState<number | null>(null);

    useEffect(() => {
        const fetchAdminId = async () => {
            try {
                const response = await fetch('/api/autch/user'); // Asegúrate de que esta ruta devuelva los usuarios
                const users = await response.json();
                const adminUser = users.find((user: { role: string; id: number }) => user.role === 'ADMIN'); // Suponiendo que tienes un campo "role"
                if (adminUser) {
                    setAdminId(adminUser.id);
                }
            } catch (error) {
                console.error('Error fetching admin ID:', error);
            }
        };

        fetchAdminId();
    }, []);

    if (adminId === null) {
        return <p>Cargando...</p>; // O cualquier otro manejo que desees
    }

    return (
        <div className={styles.adminDashboard}>
            <h1>Panel de Administración</h1>

            <Link href={`/users/${adminId}`}>
                Mi Perfil
            </Link>

            <div className={styles.section}>
                <h2>Gestión de Usuarios</h2>
                <ul>
                    <li>
                        <Link href="/admin/users">
                            Lista de Usuarios
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/users/create">
                            Crear Usuario
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Puedes agregar más secciones para otras funcionalidades aquí */}
            <div className={styles.section}>
                <h2>Otras Secciones (Futuras)</h2>
                <ul>
                    <li>
                        <Link href="/admin/roles">
                            Gestión de Roles (Futuro)
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/reports">
                            Reportes y Estadísticas (Futuro)
                        </Link>
                    </li>
                </ul>
            </div>

            <div className={styles.section}>
                <h2>Configuraciones</h2>
                <ul>
                    <li>
                        <Link href="/admin/settings">
                            Configuraciones Generales (Futuro)
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;

