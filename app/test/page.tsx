import * as React from 'react';
import ResponsiveDrawer from '../components/ResponsiveDrawer'; // Ajusta la ruta si es necesario

export default function TestPage() {
  return (
    <ResponsiveDrawer>
      <h1>This is a test page</h1>
      <p>Content inside the drawer layout</p>
    </ResponsiveDrawer>
  );
}
