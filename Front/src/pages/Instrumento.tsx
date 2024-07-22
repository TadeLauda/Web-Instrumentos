import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import InstrumentoCard from '../components/InstrumentoCard';
import Navbar from '../components/Navbar';
import { Instrumento } from '../types/Elements';
import '../styles/InstrumentoPage.css';
import carritoImg from '../img/carrito.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import Modal from 'react-modal';

const InstrumentosPage: React.FC = () => {
    const [cart, setCart] = useState<{ instrumento: Instrumento, quantity: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [showModal, setShowModal] = useState(false);
    const authContext = useContext(AuthContext);
    const usuario = authContext ? authContext.usuario : undefined;
    const navigate = useNavigate();

    const generarExcel = () => {
        if (fechaDesde && fechaHasta) {
            const url = `http://localhost:8080/pedidos/exportarExcel?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`;
            window.open(url, '_blank');
            cerrarModal();
        } else {
            alert('Por favor ingresa ambas fechas.');
        }
    };

    const cerrarModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchInstrumentos = async () => {
            try {
                const response = await axios.get<Instrumento[]>('http://localhost:8080/instrumentos');
                const filteredInstrumentos = response.data.filter(instrumento => !instrumento.eliminado);
                setInstrumentos(filteredInstrumentos);
            } catch (error) {
                console.error('Error fetching instrumentos:', error);
                setError('Hubo un problema al cargar los instrumentos. Por favor, intenta nuevamente más tarde.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInstrumentos();
    }, []);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const addToCart = (instrumentoId: number) => {
        const existingItem = cart.find(item => item.instrumento.id === instrumentoId);
        const instrumentoToAdd = instrumentos.find(instrumento => instrumento.id === instrumentoId);
        if (existingItem) {
            setCart(prevCart => {
                const updatedCart = prevCart.map(item => {
                    if (item.instrumento.id === instrumentoId) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                return updatedCart;
            });
        } else {
            setCart(prevCart => [...prevCart, { instrumento: instrumentoToAdd!, quantity: 1 }]);
        }
    };

    const removeFromCart = (instrumentoId: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart
                .map(item => {
                    if (item.instrumento.id === instrumentoId && item.quantity > 0) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                })
                .filter(item => item.quantity > 0);
            return updatedCart;
        });
    };

    const goToCart = async () => {
        navigate('/cart', { state: { cart } });
    };

    const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="instrumentos-page">
            <Navbar />
            <div className='mininav'>
                <h2 className='title'>Instrumentos</h2>
                <div className="cart-icon" onClick={toggleCart}>
                    <img src={carritoImg} alt="Carrito de Compras" />
                    {cart.length > 0 && <div className="cart-count">{totalItemsInCart}</div>}
                </div>
            </div>

            <div>
                {usuario && usuario.rol === 'ADMIN' && (
                <button onClick={() => setShowModal(true)}>Generar Excel</button>
                )}
            </div>

            <Modal isOpen={showModal} onRequestClose={cerrarModal} appElement={document.getElementById('root')??undefined}>
                <h2>Generar Excel</h2>
                <label>Fecha desde: </label>
                <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
                <label>Fecha hasta: </label>
                <input type="date" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} />
                <button onClick={generarExcel}>Generar</button>
                <button onClick={cerrarModal}>Cerrar</button>
            </Modal>
            <br />
            {isCartOpen && (
                <div className="cart-info open">
                    <h2>Tu Carrito</h2>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <span>{item.quantity}x</span> {item.instrumento.instrumento}
                            </li>
                        ))}
                    </ul>
                    <button className="btn-go-to-cart" onClick={goToCart}>Ir al Carrito</button>
                </div>
            )}
            {error && <p>{error}</p>}
            {isLoading ? (
                <p>Cargando...</p>
            ) : instrumentos.length === 0 ? (
                <p>No hay instrumentos disponibles</p>
            ) : (
                <div className="instrumentos-container">
                    {instrumentos.map(instrumento => (
                        <InstrumentoCard 
                            key={instrumento.id} 
                            instrumento={instrumento} 
                            addToCart={() => addToCart(instrumento.id)}
                            removeFromCart={() => removeFromCart(instrumento.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default InstrumentosPage;
