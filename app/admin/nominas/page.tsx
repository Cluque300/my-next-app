'use client';

import AdminUploadPage from '../shared/AdminUploadPage';

export default function AdminNominasPage() {
  return (
    <AdminUploadPage 
      title="Subir Nómina"
      endpoint="/api/admin/nominas"
      uploadLabel="nombre_nomina"
    />
  );
}
