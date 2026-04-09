import { useState, type FormEvent, type ChangeEvent } from 'react';
import '../styles/FormularioConsultas.css';
import Spinner from './Spinner';

// ====================================================
// CONFIGURACIÓN DEL CLIENTE - EDITAR AQUÍ
// ====================================================

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

interface FormErrors {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

interface Message {
  message: string;
  color: string;
}

// ====================================================

export default function FormularioConsultas() {

  const initialFormData: FormData = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  };

  const initialErrors: FormErrors = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  };

  const initialMessage: Message = {
    message: '',
    color: ''
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [message, setMessage] = useState<Message>(initialMessage);
  const [stateSpinner, setStateSpinner ] = useState(false)
  const validarEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarTelefono = (telefono: string): boolean => {
    const regex = /^[\d\s\-+()]{8,}$/;
    return regex.test(telefono);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));

    if (message.message) {
      setMessage(initialMessage);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let nuevosErrores: FormErrors = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    };

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Ingresa un email válido';
    }

    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es requerido';
    } else if (!validarTelefono(formData.telefono)) {
      nuevosErrores.telefono = 'Ingresa un teléfono válido';
    }

    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es requerido';
    } else if (formData.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(nuevosErrores);

    if (Object.keys(nuevosErrores).every(key => nuevosErrores[key as keyof FormErrors] === '')) {
      try {
        const objectSubmit = {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
          }
        };


        setStateSpinner(true);
        const JSONSubmit = await fetch("https://formsubmit.co/ajax/mariano.floresta2@gmail.com", objectSubmit);
        const data = await JSONSubmit.json();
        setStateSpinner(false);

        if (data.success) {
          setMessage({
            message: "Mensaje Enviado",
            color: "green"
          });
          setFormData(initialFormData);
        } else {
          setMessage({
            message: "Mensaje no enviado",
            color: "red"
          });
        }
      } catch {
        setMessage({
          message: "Error de conexión",
          color: "red"
        });
      }
    }
  };

  return (
    <div className="formulario-container">
      <div className="formulario-header">
        <span className="formulario-badge">¿Necesitas ayuda?</span>
        <h2 className="formulario-title">Contáctanos</h2>
        <p className="formulario-subtitle">
          Escríbenos tu consulta y te responderemos a la brevedad
        </p>
      </div> 

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className={`form-input ${errors.nombre ? 'error' : ''}`}
            />
            {errors.nombre && <span className="form-error visible">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="form-error visible">{errors.email}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+54 11 1234 5678"
            className={`form-input ${errors.telefono ? 'error' : ''}`}
          />
          {errors.telefono && <span className="form-error visible">{errors.telefono}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="mensaje" className="form-label">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu consulta aquí..."
            rows={5}
            className={`form-textarea ${errors.mensaje ? 'error' : ''}`}
          ></textarea>
          {errors.mensaje && <span className="form-error visible">{errors.mensaje}</span>}
        </div>

        <button 
          type="submit" 
          className="form-submit"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
          Enviar Consulta
        </button>

        <Spinner 
          state={stateSpinner}
        />
        
        {message.message && (
          <div className='box-message'>
            <h3 style={{ color: message.color }}>{message.message}</h3>
          </div>
        )}
      </form>

      <div className="form-decoration">
        <span className="candy-emoji">🍭</span>
        <span className="candy-emoji-2">🍬</span>
      </div>
    </div>
  );
}