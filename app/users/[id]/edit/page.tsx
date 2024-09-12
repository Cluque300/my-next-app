"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './edituser.module.css'; // Importa el módulo CSS

interface UserData {
  id?: string;
  foto?: string;
  Nombre?: string;
  segundo_nombre?: string;
  Apellido?: string;
  segundo_apellido?: string;
  genero?: string;
  Fecha_nacimiento?: string;
  correo?: string;
  identificacion?: string;
  direccion?: string;
  barrio?: string;
  ciudad?: string;
  departamento?: string;
  pais?: string;
  telefono?: string;
  celular?: string;
  profesion?: string;
  institucion?: string;
  posgrado?: string;
  institucion_posgrado?: string;
  cargo?: string;
  departamentoHB?: string;
  habilidades?: string;
  nombre_contacto?: string;
  parentesco?: string;
  numero_contacto?: string;
  usuario_trello?: string;
  usuario_slack?: string;
  entidad_salud?: string;
  ips?: string;
  lugar_pension?: string;
  arl?: string;
  caja_compensacion?: string;
  tipo_sangre?: string;
  entidad_bancaria?: string;
  tipo_cuenta?: string;
  numero_cuenta?: string;
  contrasena?: string;
}

interface EditUserFormProps {
  userData?: UserData;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ userData = {} }) => {
  const [formData, setFormData] = useState<UserData>({
    foto: userData.foto || '',
    Nombre: userData.Nombre || '',
    segundo_nombre: userData.segundo_nombre || '',
    Apellido: userData.Apellido || '',
    segundo_apellido: userData.segundo_apellido || '',
    genero: userData.genero || 'Masculino',
    Fecha_nacimiento: userData.Fecha_nacimiento || '',
    correo: userData.correo || '',
    identificacion: userData.identificacion || '',
    direccion: userData.direccion || '',
    barrio: userData.barrio || '',
    ciudad: userData.ciudad || '',
    departamento: userData.departamento || '',
    pais: userData.pais || '',
    telefono: userData.telefono || '',
    celular: userData.celular || '',
    profesion: userData.profesion || '',
    institucion: userData.institucion || '',
    posgrado: userData.posgrado || '',
    institucion_posgrado: userData.institucion_posgrado || '',
    cargo: userData.cargo || '',
    departamentoHB: userData.departamentoHB || '',
    habilidades: userData.habilidades || '',
    nombre_contacto: userData.nombre_contacto || '',
    parentesco: userData.parentesco || '',
    numero_contacto: userData.numero_contacto || '',
    usuario_trello: userData.usuario_trello || '',
    usuario_slack: userData.usuario_slack || '',
    entidad_salud: userData.entidad_salud || '',
    ips: userData.ips || '',
    lugar_pension: userData.lugar_pension || '',
    arl: userData.arl || '',
    caja_compensacion: userData.caja_compensacion || '',
    tipo_sangre: userData.tipo_sangre || '',
    entidad_bancaria: userData.entidad_bancaria || '',
    tipo_cuenta: userData.tipo_cuenta || '',
    numero_cuenta: userData.numero_cuenta || '',
    contrasena: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.correo || !/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.push('Correo inválido');
    }
    if (!formData.identificacion) {
      newErrors.push('Identificación es requerida');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      // Verifica que e.target es un HTMLInputElement
      const inputElement = e.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        setFormData(prevState => ({
          ...prevState,
          [name]: file
        }));
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors([]);
    setSuccessMessage(null);

    if (!validateForm()) {
      return;
    }

    if (!userData.id) {
      setErrors(prev => [...prev, 'El ID del usuario no está definido']);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', userData.id);
      for (const key of Object.keys(formData)) {
        const value = formData[key as keyof UserData];
        if (value !== undefined) {
          formDataToSend.append(key, value as any);
        }
      }

      const response = await fetch(`/api/user/${userData.id}`, {
        method: 'PATCH',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      setSuccessMessage('Usuario actualizado con éxito');
    } catch (error) {
      setErrors(prev => [...prev, 'Error al actualizar el usuario']);
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.textCenter}>Editar Información de Usuario</h1>
      
      {errors.length > 0 && (
        <div className={`${styles.alert} ${styles.alertDanger}`}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {successMessage && (
        <div className={`${styles.alert} ${styles.alertSuccess}`}>
          <p>{successMessage}</p>
        </div>
      )}

      <div className={styles.circleImage}>
        <img src={`/images/users/${userData.foto || 'userMale.png'}`} alt="Imagen de perfil" />
      </div>
      
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Datos Personales */}
        <div className="row">
          <div className="col-md-6 col-12">
            <h4>Datos Personales</h4>
            <hr />
            <div className={styles.formGroup}>
              <label htmlFor="foto"><strong>Foto:</strong></label>
              <input type="file" name="foto" id="foto" className={styles.formControl} accept=".jpg, .jpeg, .png" onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="Nombre"><strong>Primer nombre:</strong></label>
              <input type="text" className={styles.formControl} name="Nombre" id="Nombre" value={formData.Nombre || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="segundo_nombre"><strong>Segundo nombre:</strong></label>
              <input type="text" className={styles.formControl} name="segundo_nombre" id="segundo_nombre" value={formData.segundo_nombre || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="Apellido"><strong>Primer apellido:</strong></label>
              <input type="text" className={styles.formControl} name="Apellido" id="Apellido" value={formData.Apellido || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="segundo_apellido"><strong>Segundo apellido:</strong></label>
              <input type="text" className={styles.formControl} name="segundo_apellido" id="segundo_apellido" value={formData.segundo_apellido || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="genero"><strong>Género:</strong></label>
              <select name="genero" id="genero" className={styles.formControl} value={formData.genero || 'Masculino'} onChange={handleChange}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="Fecha_nacimiento"><strong>Fecha de nacimiento:</strong></label>
              <input type="date" className={styles.formControl} name="Fecha_nacimiento" id="Fecha_nacimiento" value={formData.Fecha_nacimiento || ''} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Datos de Contacto */}
        <div className="row">
          <div className="col-md-6 col-12">
            <h4>Datos de Contacto</h4>
            <hr />
            {/* Agrega todos los campos de contacto como en la sección anterior */}
            <div className={styles.formGroup}>
              <label htmlFor="correo"><strong>Correo electrónico:</strong></label>
              <input type="email" className={styles.formControl} name="correo" id="correo" value={formData.correo || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="identificacion"><strong>Identificación:</strong></label>
              <input type="text" className={styles.formControl} name="identificacion" id="identificacion" value={formData.identificacion || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="direccion"><strong>Dirección:</strong></label>
              <input type="text" className={styles.formControl} name="direccion" id="direccion" value={formData.direccion || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="barrio"><strong>Barrio:</strong></label>
              <input type="text" className={styles.formControl} name="barrio" id="barrio" value={formData.barrio || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="ciudad"><strong>Ciudad:</strong></label>
              <input type="text" className={styles.formControl} name="ciudad" id="ciudad" value={formData.ciudad || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="departamento"><strong>Departamento:</strong></label>
              <input type="text" className={styles.formControl} name="departamento" id="departamento" value={formData.departamento || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pais"><strong>País:</strong></label>
              <input type="text" className={styles.formControl} name="pais" id="pais" value={formData.pais || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="telefono"><strong>Teléfono:</strong></label>
              <input type="text" className={styles.formControl} name="telefono" id="telefono" value={formData.telefono || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="celular"><strong>Celular:</strong></label>
              <input type="text" className={styles.formControl} name="celular" id="celular" value={formData.celular || ''} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Información Académica */}
        <div className="row">
          <div className="col-md-6 col-12">
            <h4>Información Académica</h4>
            <hr />
            {/* Resto de los campos */}
            <div className={styles.formGroup}>
              <label htmlFor="profesion"><strong>Profesión:</strong></label>
              <input type="text" className={styles.formControl} name="profesion" id="profesion" value={formData.profesion || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="institucion"><strong>Institución:</strong></label>
              <input type="text" className={styles.formControl} name="institucion" id="institucion" value={formData.institucion || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="posgrado"><strong>Posgrado:</strong></label>
              <input type="text" className={styles.formControl} name="posgrado" id="posgrado" value={formData.posgrado || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="institucion_posgrado"><strong>Institución del Posgrado:</strong></label>
              <input type="text" className={styles.formControl} name="institucion_posgrado" id="institucion_posgrado" value={formData.institucion_posgrado || ''} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Otros datos */}
        <div className="row">
          <div className="col-md-6 col-12">
            <h4>Otros datos</h4>
            <hr />
            {/* Campos adicionales */}
            <div className={styles.formGroup}>
              <label htmlFor="cargo"><strong>Cargo:</strong></label>
              <input type="text" className={styles.formControl} name="cargo" id="cargo" value={formData.cargo || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="departamentoHB"><strong>Departamento HB:</strong></label>
              <input type="text" className={styles.formControl} name="departamentoHB" id="departamentoHB" value={formData.departamentoHB || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="habilidades"><strong>Habilidades:</strong></label>
              <input type="text" className={styles.formControl} name="habilidades" id="habilidades" value={formData.habilidades || ''} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Información bancaria */}
        <div className="row">
          <div className="col-md-6 col-12">
            <h4>Información bancaria</h4>
            <hr />
            {/* Campos adicionales */}
            <div className={styles.formGroup}>
              <label htmlFor="entidad_bancaria"><strong>Entidad Bancaria:</strong></label>
              <input type="text" className={styles.formControl} name="entidad_bancaria" id="entidad_bancaria" value={formData.entidad_bancaria || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="tipo_cuenta"><strong>Tipo de Cuenta:</strong></label>
              <input type="text" className={styles.formControl} name="tipo_cuenta" id="tipo_cuenta" value={formData.tipo_cuenta || ''} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="numero_cuenta"><strong>Número de Cuenta:</strong></label>
              <input type="text" className={styles.formControl} name="numero_cuenta" id="numero_cuenta" value={formData.numero_cuenta || ''} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Contraseña */}
        <div className="row">
          <div className="col-md-6 col-12">
            <h4>Contraseña</h4>
            <hr />
            <div className={styles.formGroup}>
              <label htmlFor="contrasena"><strong>Contraseña:</strong></label>
              <input type="password" className={styles.formControl} name="contrasena" id="contrasena" value={formData.contrasena || ''} onChange={handleChange} />
            </div>
          </div>
        </div>

        <button type="submit" className={styles.btnPrimary}>Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditUserForm;

