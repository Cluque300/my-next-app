// /app/users/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  [key: string]: string | number;
}

const UserProfile = () => {
  const { id } = useParams();  // Usa useParams para obtener el ID
  const [userData, setUserData] = useState<User | null>(null);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/autch/user/${id}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => setMessage({ type: 'error', text: 'Error fetching user data' }));
    }
  }, [id]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="main_content" id="main-content">
      <div className="page">
        <div className="container">
          {message && (
            <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
              <span className={`alert-inner--icon ${message.type === 'error' ? 'fa fa-times' : 'fa fa-check'}`}></span>
              <span className="alert-inner--text">
                <strong>{message.type === 'error' ? 'Error' : 'Correcto'}</strong> {message.text}
              </span>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <h1 className="text-center">Información de Usuario</h1>
          <div className="circle-image">
            <img src={`/images/users/${userData[23]}`} alt="Imagen de perfil" />
          </div>
          <br />
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <h4>Datos Personales</h4>
                          <hr />
                          <ul>
                            <li><strong>Primer Nombre:</strong> {userData[1]}</li>
                            <li><strong>Segundo Nombre:</strong> {userData[2]}</li>
                            <li><strong>Primer Apellido:</strong> {userData[3]}</li>
                            <li><strong>Segundo Apellido:</strong> {userData[4]}</li>
                            <li><strong>Género:</strong> {userData[5]}</li>
                            <li><strong>Fecha de Nacimiento:</strong> {userData[6]}</li>
                            <li><strong>Edad:</strong> {userData[28]}</li>
                            <li><strong>Foto:</strong> {userData[23]}</li>
                          </ul>
                        </div>
                        <div className="col-md-6 col-12">
                          <h4>Contacto</h4>
                          <hr />
                          <ul>
                            <li><strong>Correo:</strong> {userData[7]}@humanbionics.com.co</li>
                            <li><strong>No. de Identificación:</strong> {userData[8]}</li>
                            <li><strong>Celular:</strong> {userData[15]}</li>
                            <li><strong>Teléfono:</strong> {userData[14]}</li>
                            <li><strong>Dirección:</strong> {userData[9]}</li>
                            <li><strong>Barrio:</strong> {userData[10]}</li>
                            <li><strong>Ciudad:</strong> {userData[11]}</li>
                            <li><strong>Departamento:</strong> {userData[12]}</li>
                            <li><strong>País:</strong> {userData[13]}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <h4>Formación y Cargo</h4>
                          <hr />
                          <ul>
                            <li><strong>Profesión:</strong> {userData[17]}</li>
                            <li><strong>Institución Pregrado:</strong> {userData[19]}</li>
                            <li><strong>Posgrado:</strong> {userData[20]}</li>
                            <li><strong>Institución Posgrado:</strong> {userData[33]}</li>
                            <li><strong>Cargo:</strong> {userData[42]}</li>
                            <li><strong>Departamento:</strong> {userData[36]}</li>
                            <li><strong>Habilidades:</strong> {userData[16]}</li>
                          </ul>
                        </div>
                        <div className="col-md-6 col-12">
                          <h4>Información Adicional</h4>
                          <hr />
                          <ul>
                            <li><strong>Nombre de Contacto:</strong> {userData[24]}</li>
                            <li><strong>Parentesco:</strong> {userData[40]}</li>
                            <li><strong>Número de Contacto:</strong> {userData[25]}</li>
                            <li><strong>Usuario Intranet:</strong> {userData[26]}</li>
                            <li><strong>Usuario Trello:</strong> {userData[34]}</li>
                            <li><strong>Usuario Slack:</strong> {userData[35]}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <h4>Seguridad Social</h4>
                          <hr />
                          <ul>
                            <li><strong>Entidad de Salud EPS:</strong> {userData[21]}</li>
                            <li><strong>IPS de atención de urgencias:</strong> {userData[39]}</li>
                            <li><strong>Administradora de Pensión:</strong> {userData[29]}</li>
                            <li><strong>ARL:</strong> {userData[37]}</li>
                            <li><strong>Caja de compensación:</strong> {userData[38]}</li>
                            <li><strong>Tipo de Sangre:</strong> {userData[22]}</li>
                          </ul>
                        </div>
                        <div className="col-md-6 col-12">
                          <h4>Información Bancaria</h4>
                          <hr />
                          <ul>
                            <li><strong>Número de Cuenta:</strong> {userData[32]}</li>
                            <li><strong>Tipo de Cuenta:</strong> {userData[31]}</li>
                            <li><strong>Entidad Bancaria:</strong> {userData[30]}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href={`/users/${userData.id}/edit`}>
                    <button className="btn btn-primary">Editar Información</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;


