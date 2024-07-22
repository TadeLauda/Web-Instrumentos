import React, { useContext, useState } from 'react';
import '../styles/LogingPage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import Usuario from '../types/Elements';
import { sha1 } from 'js-sha1';

const LoginPage: React.FC = () => {

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const toBase64 = (array: number[]) => {
    return btoa(String.fromCharCode(...array));
  };

  if (!auth) {
    throw new Error('useAuth debe estar dentro del proveedor AuthContext');
  }
  
  const { iniciarSesion } = auth;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/usuarios');
      const usuarios: Usuario[] = await response.json();
    
      // Encripta la clave ingresada antes de compararla
      const hashClave = sha1.array(clave); // Calcula el hash SHA-1
      const claveEncriptada = toBase64(hashClave); // Codifica el hash a Base64

      console.log("Clave encriptada:", claveEncriptada);

      const usuario = usuarios.find(usuario => 
        usuario.nombreUsuario === nombreUsuario && usuario.clave === claveEncriptada
      );

      if (usuario) {
        console.log('Inicio de sesión exitoso:', usuario);
        iniciarSesion(usuario.nombreUsuario, usuario.rol); // Aquí llamamos a iniciarSesion
        navigate('/home');
      } else {
        console.error('Error de inicio de sesión: usuario no encontrado. Clave ingresada encriptada:', claveEncriptada);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="text-center">
          <h1 className="text-3xl">Iniciar sesión</h1>
          <br />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Usuario</label>

            <input 
            id="username" type="text" placeholder="Ingresa tu nombre de usuario" className="form-input" 
            value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)}
            />

          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>

            <input 
            value={clave} onChange={e => setClave(e.target.value)}
            id="password" type="password" placeholder="Ingresa tu contraseña" className="form-input" 
            />

          </div>
          <br />
          <br />
          <button type="submit" className="form-button">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
