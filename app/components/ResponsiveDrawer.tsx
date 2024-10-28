"use client"; // Este archivo debe ser un componente de cliente

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

// Importa los iconos de Material UI
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import BookIcon from '@mui/icons-material/Book';

// Importa los iconos de react-icons
import { SiSlack } from 'react-icons/si';
import { FaTrello, FaRegEnvelope, FaRegCalendarAlt, FaGithub } from 'react-icons/fa';

import styles from './drawer.module.css'; // Importar el módulo CSS
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta según tu estructura de carpetas
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children?: React.ReactNode; // Añadido para aceptar children
}

export default function ResponsiveDrawer(props: Props) {
  const { window, children } = props; // Extraer children
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  // Obtener el userId y el estado de login del contexto
  const { userId, isLoggedIn } = useAuth();
  const router = useRouter(); // Inicializamos el hook useRouter para la navegación

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleProfileRedirect = () => {
    if (userId) {
      router.push(`/users/${userId}`); // Redirigir a la página de perfil del usuario
    }
  };

  const handleAvisosRedirect = () => {
    router.push('/avisos'); // Redirigir a la página de Avisos
  };

  const handleCalendarioRedirect = () => {
    router.push('/calendario'); // Redirigir a la página de Mi Calendario
  };

  const handleCarteleraRedirect = () => {
    router.push('/cartelera'); // Redirigir a la página de Mi Cartelera
  };

  const handleProyectosRedirect = () => {
    router.push('/proyectos'); // Redirigir a la página de Mis Proyectos
  };

  const handleCursosRedirect = () => {
    router.push('/cursos'); // Redirigir a la página de Cursos
  };

  const handleNominasCertificadosRedirect = () => {
    router.push('/nominas_certificados'); // Redirigir a la página de Nómina/Certificados
  };

  const drawer = (
    <div>
      {/* Sección de usuario */}
      <Box className={styles.userSection}>
        <img
          src="URL_DE_TU_IMAGEN_DE_PERFIL" // Reemplaza con la URL de la imagen de perfil
          alt="Perfil"
          className={styles.profileImage}
        />
        <Box className={styles.userName}>Nombre Apellido</Box> {/* Reemplaza con el nombre del usuario */}
        <Box className={styles.userRole}>Rol del Usuario</Box> {/* Reemplaza con el rol del usuario */}
        <Box className={styles.iconContainer}>
          <IconButton aria-label="Trello"><FaTrello /></IconButton>
          <IconButton aria-label="Slack"><SiSlack /></IconButton>
          <IconButton aria-label="Correo"><FaRegEnvelope /></IconButton>
          <IconButton aria-label="Reuniones"><FaRegCalendarAlt /></IconButton>
          <IconButton aria-label="GitHub"><FaGithub /></IconButton>
        </Box>
      </Box>
      <Divider />
      <List>
        {/* Sección Cartelera */}
        <ListItem>
          <ListItemText primary="Cartelera" />
        </ListItem>
        <ListItemButton onClick={handleCarteleraRedirect}>
          <ListItemIcon><NotificationsIcon /></ListItemIcon>
          <ListItemText primary="Mi Cartelera" />
        </ListItemButton>
        <ListItemButton onClick={handleAvisosRedirect}>
          <ListItemIcon><AnnouncementIcon /></ListItemIcon>
          <ListItemText primary="Avisos" />
        </ListItemButton>
        <ListItemButton onClick={handleCursosRedirect}>
          <ListItemIcon><BookIcon /></ListItemIcon>
          <ListItemText primary="Cursos" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon><AnnouncementIcon /></ListItemIcon>
          <ListItemText primary="Noticias" />
        </ListItemButton>

        <Divider />

        {/* Sección Aplicaciones */}
        <ListItem>
          <ListItemText primary="Aplicaciones" />
        </ListItem>
        <ListItemButton onClick={handleCalendarioRedirect}>
          <ListItemIcon><EventIcon /></ListItemIcon>
          <ListItemText primary="Mi Calendario" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Mis Tareas" />
        </ListItemButton>
        <ListItemButton onClick={handleProyectosRedirect}>
          <ListItemIcon><WorkIcon /></ListItemIcon>
          <ListItemText primary="Mis Proyectos" />
        </ListItemButton>
        <ListItemButton onClick={handleNominasCertificadosRedirect}>
          <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
          <ListItemText primary="Nómina/Certificados" />
        </ListItemButton>

        <Divider />

        {/* Sección Usuarios */}
        <ListItem>
          <ListItemText primary="Usuarios" />
        </ListItem>
        <ListItemButton onClick={handleProfileRedirect}>
          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary="Mi Perfil" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon><ContactsIcon /></ListItemIcon>
          <ListItemText primary="Lista de Contactos" />
        </ListItemButton>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          height: `calc(100vh - 73.5px)`, // Ajuste para ocupar el espacio restante
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento en dispositivos móviles.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: `calc(100vh - 73.5px)`, // Altura ajustada
              top: '73.5px', // Alineado con el header
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: `calc(100vh - 73.5px)`, // Altura ajustada
              top: '73.5px', // Alineado con el header
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children} {/* Aquí se renderizan los children */}
      </Box>
    </Box>
  );
}
