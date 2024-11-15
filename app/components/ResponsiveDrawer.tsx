"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactsIcon from "@mui/icons-material/Contacts";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import BookIcon from "@mui/icons-material/Book";

import { SiSlack } from "react-icons/si";
import { FaTrello, FaRegEnvelope, FaRegCalendarAlt, FaGithub } from "react-icons/fa";

import styles from "./drawer.module.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const { userId, userRole, userData } = useAuth();
  const router = useRouter();

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

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  const drawer = (
    <div>
      {/* Sección de usuario */}
      <Box className={styles.userSection}>
        <img
          src={userData?.foto || "URL_DE_TU_IMAGEN_DE_PERFIL"}
          alt="Perfil"
          className={styles.profileImage}
        />
        <Box className={styles.userName}>{userData?.fullname || "Nombre Apellido"}</Box>
        <Box className={styles.userRole}>{userRole || "Rol del Usuario"}</Box>
        <Box className={styles.iconContainer}>
          <IconButton aria-label="Trello">
            <FaTrello />
          </IconButton>
          <IconButton aria-label="Slack">
            <SiSlack />
          </IconButton>
          <IconButton aria-label="Correo">
            <FaRegEnvelope />
          </IconButton>
          <IconButton aria-label="Reuniones">
            <FaRegCalendarAlt />
          </IconButton>
          <IconButton aria-label="GitHub">
            <FaGithub />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <List>
        {/* Sección Cartelera */}
        <ListItem>
          <ListItemText primary="Cartelera" />
        </ListItem>
        <ListItemButton
          onClick={() => handleRedirect("/cartelera")}
          sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
        >
          <ListItemIcon>
            <NotificationsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mi Cartelera" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleRedirect("/avisos")}
          sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
        >
          <ListItemIcon>
            <AnnouncementIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Avisos" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleRedirect("/cursos")}
          sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
        >
          <ListItemIcon>
            <BookIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cursos" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleRedirect("/noticias")}
          sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
        >
          <ListItemIcon>
            <AnnouncementIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Noticias" />
        </ListItemButton>
        <Divider />
        {/* Aplicaciones */}
        <ListItem>
          <ListItemText primary="Aplicaciones" />
        </ListItem>
        <ListItemButton
          onClick={() => handleRedirect("/calendario")}
          sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
        >
          <ListItemIcon>
            <EventIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mi Calendario" />
        </ListItemButton>
        <ListItemButton sx={{ fontSize: "0.8rem", padding: "6px 12px" }}>
          <ListItemIcon>
            <AssignmentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mis Tareas" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleRedirect("/proyectos")}
          sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
        >
          <ListItemIcon>
            <WorkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mis Proyectos" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleRedirect("/nominas_certificados")}
          sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
        >
          <ListItemIcon>
            <AttachMoneyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Nómina/Certificados" />
        </ListItemButton>
        <Divider />
        {/* Usuarios */}
        <ListItem>
          <ListItemText primary="Usuarios" />
        </ListItem>
        <ListItemButton
          onClick={() => handleRedirect(`/users/${userId}`)}
          sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
        >
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mi Perfil" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleRedirect("/users")}
          sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
        >
          <ListItemIcon>
            <ContactsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Lista de Contactos" />
        </ListItemButton>
        {userRole === "ADMIN" && (
          <>
            <Divider />
            <ListItemButton
              onClick={() => handleRedirect("/admin")}
              sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
            >
              <ListItemIcon>
                <WorkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Administración" />
            </ListItemButton>
          </>
        )}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          height: `calc(100vh - 73.5px)`,
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
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: `calc(100vh - 73.5px)`,
              top: "73.5px",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: `calc(100vh - 73.5px)`,
              top: "73.5px",
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
        {children}
      </Box>
    </Box>
  );
}
