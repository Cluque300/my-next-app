// app/layout.tsx
"use client";

import { ReactNode, useEffect } from 'react';
import './globals.css';
import Header from './components/Header';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CircularProgress, Typography, Container } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <AuthProvider>
        <body>
          <div className="layout-container">
            <Header />
            <LayoutContent>{children}</LayoutContent>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}

function LayoutContent({ children }: { children: ReactNode }) {
  const { isLoggedIn, userRole, userId, loading, isCurrentUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      const isPublicRoute = ['/login', '/register'].includes(pathname);
      const isProfileRoute = pathname.startsWith('/users/');

      if (!isLoggedIn && !isPublicRoute) {
        router.push('/login');
      } else if (isLoggedIn && isPublicRoute) {
        router.push(userRole === 'ADMIN' ? '/admin' : `/users/${userId}`);
      } else if (isProfileRoute) {
        const pathId = parseInt(pathname.split('/')[2]);
        if (!isCurrentUser(pathId)) {
          router.push(`/users/${userId}`);
        }
      }
    }
  }, [isLoggedIn, userRole, userId, loading, router, pathname, isCurrentUser]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (userRole === 'USER' && pathname.startsWith('/admin')) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6" color="error">
          No tienes permiso para acceder a esta página.
        </Typography>
      </Container>
    );
  }

  return isLoggedIn ? (
    <div className="drawer-open">
      <ResponsiveDrawer>{children}</ResponsiveDrawer>
    </div>
  ) : (
    <main className="main-content">{children}</main>
  );
}
