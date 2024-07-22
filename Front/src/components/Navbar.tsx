import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('authContext is undefined, please ensure AuthProvider is set up correctly');
    }

    const { usuario, cerrarSesion } = authContext;
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/direccion">Donde Estamos</Link></li>
                <li><Link to="/instrumentos">Instrumentos</Link></li>
                {usuario && usuario.rol === 'ADMIN' && <li><Link to="/grilla">Grilla</Link></li>}
                {usuario && usuario.rol === 'ADMIN' && <li><Link to="/google-charts">Grafico</Link></li>}
            </ul>
            <div className="user-icon">
                <button onClick={handleCerrarSesion} className="user-button">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
