import React from 'react';
import styles from './userForm.module.css';

const UserForm = () => {
  return (
    <form action="/api/user" method="POST" encType="multipart/form-data" className={styles.form}>
      <div className={styles.mainContent}>
        <div className={styles.page}>
          <div className={styles.container}>
            <h1 className={styles.textCenter}>Registro de Usuarios</h1>

            <br />

            <div className={styles.row}>
              <div className={styles.colLg10}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.error}>
                      {/* Add error handling logic here */}
                    </div>
                    <div className={styles.row}>
                      <div className={styles.colMd6}>
                        <h4>Datos Personales</h4>
                        <hr />
                        <div className={styles.formGroup}>
                          <label htmlFor="foto"><strong>Foto:</strong></label>
                          <input type="file" name="foto" id="foto" className={styles.customInputFile} accept=".jpg, .jpeg, .png" />
                        </div>

                        {/* Add the remaining fields in a similar manner */}
                        
                        <div className={styles.formGroup}>
                          <label htmlFor="nombre"><strong>Primer nombre:</strong></label>
                          <input type="text" className={styles.formControl} name="nombre" id="nombre" placeholder="Primer Nombre" />
                        </div>

                        {/* Continue with other fields similarly */}
                      </div>

                      <div className={styles.colMd6}>
                        <h4>Contacto</h4>
                        <hr />
                        {/* Add the remaining fields */}
                      </div>

                      {/* Continue with additional sections */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.btnPrimary}>Registrar Empleado</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
