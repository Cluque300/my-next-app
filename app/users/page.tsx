import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from './Users.module.css'; // Asegúrate de tener los estilos necesarios

interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user'); // Ajusta la URL según tu API
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (confirm(`¿Está seguro que desea eliminar al usuario con ID ${userId}?`)) {
      try {
        await axios.post(`/api/user/${userId}/delete`); // Ajusta la URL según tu API
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className={styles.mainContent}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="javascript:void(0);">
          <h4>Recursos Humanos / Lista de Empleados</h4>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-align-justify"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <Link href="/users/create">
            <button className="btn btn-primary">Añadir Usuario</button>
          </Link>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="table-responsive">
              <table className="table table-hover table-cards align-items-center">
                <thead>
                  <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Celular</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr className="bg-white" key={user.id}>
                      <th scope="row">
                        <div className="media align-items-center">
                          <img
                            src={`/images/users/${user.avatar}`}
                            className="avatar avatar-lg mr-3"
                            alt="Avatar"
                          />
                          <div className="media-body">
                            <h6 className="h5 font-weight-normal mb-0">
                              {user.firstName} {user.lastName}
                            </h6>
                            <span className="font-weight-normal text-muted">
                              {user.role}
                            </span>
                          </div>
                        </div>
                      </th>
                      <td>+57 {user.phone}</td>
                      <td>
                        <span className="email">
                          <a
                            href={`mailto:${user.email}`}
                            title="Enviar correo"
                          >
                            {user.email}
                          </a>
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Link href={`/users/${user.id}`}>
                            <button
                              className="btn btn-primary btn-sm"
                              aria-label={`Ver usuario ${user.id}`}
                            >
                              <i className="fa fa-eye"></i>
                            </button>
                          </Link>
                          <Link href={`/users/edit/${user.id}`}>
                            <button
                              className="btn btn-primary btn-sm"
                              aria-label={`Editar usuario ${user.id}`}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDelete(user.id)}
                            className="btn btn-danger btn-sm"
                            aria-label={`Eliminar usuario ${user.id}`}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

