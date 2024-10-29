// app/components/UserMenu.tsx
"use client";

import React from 'react';
import { Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person'; // Ícono para el botón desplegable
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Importa el ícono MoreVertIcon
import Link from 'next/link';
import LogoutButton from './logoutbutton';

interface UserMenuProps {
  userId: number | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ userId }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Cuenta">
        <IconButton onClick={handleMenuOpen} color="inherit" size="large" sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 0.5 }} />
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose} component={Link} href={`/users/${userId || ''}`}>
          <AccountCircleIcon sx={{ mr: 1 }} /> Mi Perfil
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} href="/settings">
          <SettingsIcon sx={{ mr: 1 }} /> Configuración
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <LogoutIcon sx={{ mr: 1 }} /> <LogoutButton />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;


