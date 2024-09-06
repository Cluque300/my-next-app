import { useState, ChangeEvent, FormEvent } from 'react';

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
  userData: UserData;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ userData }) => {
  const [formData, setFormData] = useState<UserData>({
    foto: '',
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
    
    // Ejemplo de validaciones básicas
    if (!formData.correo || !/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.push('Correo inválido');
    }
    if (!formData.identificacion) {
      newErrors.push('Identificación es requerida');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? (files ? files[0] : '') : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Limpiar mensajes anteriores
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
    <div className="container">
      <h1 className="text-center">Información de Usuarios</h1>
      
      {errors.length > 0 && (
        <div className="alert alert-danger">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          <p>{successMessage}</p>
        </div>
      )}

      <div className="circle-image">
        <img src={`/images/users/${userData.foto || 'userMale.png'}`} alt="Imagen de perfil" />
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6 col-12">
            <h4>Datos Personales</h4>
            <hr />
            <div className="form-group">
              <label htmlFor="foto"><strong>Foto:</strong></label>
              <input type="file" name="foto" id="foto" className="form-control" accept=".jpg, .jpeg, .png" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="Nombre"><strong>Primer nombre:</strong></label>
              <input type="text" className="form-control" name="Nombre" id="Nombre" value={formData.Nombre} placeholder="Primer Nombre" onChange={handleChange} />
            </div>
            {/* Repetir para los otros campos del formulario... */}
          </div>
          {/* Continuar con los demás campos */}
        </div>
        <div className="col-md-6 col-12">
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Actualizar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;




