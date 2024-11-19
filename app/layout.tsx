// app/layout.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import "./globals.css";
import Header from "./components/Header";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CircularProgress, Typography, Container } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <html lang="es">
      <AuthProvider>
        <body>
          <LayoutContent onDrawerToggle={toggleDrawer} mobileOpen={mobileOpen}>
            {children}
          </LayoutContent>
        </body>
      </AuthProvider>
    </html>
  );
}

interface LayoutContentProps {
  children: ReactNode;
  onDrawerToggle: () => void;
  mobileOpen: boolean;
}

function LayoutContent({ children, onDrawerToggle, mobileOpen }: LayoutContentProps) {
  const { isLoggedIn, userRole, userId, loading, isCurrentUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = ["/login", "/register"].includes(pathname);
  const isProfileRoute = pathname.startsWith("/users/");

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn && !isPublicRoute) {
        router.push("/login");
      } else if (isLoggedIn && isPublicRoute) {
        router.push(userRole === "ADMIN" ? "/admin" : `/users/${userId}`);
      } else if (isProfileRoute) {
        const pathId = parseInt(pathname.split("/")[2]);
        if (!isCurrentUser(pathId)) {
          router.push(`/users/${userId}`);
        }
      }
    }
  }, [isLoggedIn, userRole, userId, loading, router, pathname, isCurrentUser]);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (userRole === "USER" && pathname.startsWith("/admin")) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6" color="error">
          No tienes permiso para acceder a esta página.
        </Typography>
      </Container>
    );
  }

  return isLoggedIn ? (
    <div className="layout-container">
      {!isPublicRoute && <Header onDrawerToggle={onDrawerToggle} />}
      <div className="drawer-open">
        <ResponsiveDrawer mobileOpen={mobileOpen} onDrawerToggle={onDrawerToggle}>
          {children}
        </ResponsiveDrawer>
      </div>
    </div>
  ) : (
    <main className="main-content">{children}</main>
  );
}
