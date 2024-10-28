'use client';

import AdminUploadPage from '../shared/AdminUploadPage';

export default function AdminCertificadosPage() {
  return (
    <AdminUploadPage 
      title="Subir Certificado"
      endpoint="/api/admin/certificados"
      uploadLabel="nombre_certificado"
    />
  );
}
