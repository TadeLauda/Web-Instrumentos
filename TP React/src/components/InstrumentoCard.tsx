import React from 'react';
import { Instrumento } from '../types/Elements';
import '../styles/InstrumentosCard.css';
import camionImage from '../img/camion2.webp';
import carritoImage from '../img/carrito.png';
import { Link } from 'react-router-dom';

interface InstrumentoCardProps {
    instrumento: Instrumento;
    addToCart: (instrumento: Instrumento) => void;
    removeFromCart: (instrumento: Instrumento) => void;
}

const InstrumentoCard: React.FC<InstrumentoCardProps> = ({ instrumento, addToCart, removeFromCart }) => {
    const textColorClass = instrumento.costoEnvio === 'Gratis' || instrumento.costoEnvio === 'G' ? 'texto-verde' : 'texto-amarillo';

    return (
        <div className="instrumento-card">
            <div className="instrumento-imagen">
                <img src={instrumento.imagen} alt={instrumento.instrumento} />
            </div>
            <div className="instrumento-info">
                <h2>{instrumento.instrumento}</h2>
                <p className="marca">Marca: {instrumento.marca}</p>
                <p className="modelo">Modelo: {instrumento.modelo}</p>
                <div className="precio">
                    <p>Precio: ${instrumento.precio}</p>
                </div>
                <div className="envio">
                    {instrumento.costoEnvio === 'Gratis' || instrumento.costoEnvio === 'G' ? (
                        <p className="envio-gratis">
                            <img src={camionImage} alt="camion" className="camion-icon" style={{ width: '35px', height: '35px' }} />
                            Envío gratis a todo el país
                        </p>                    
                    ) : (
                        <p className="costo-envio">
                            <span className={textColorClass}>Costo de Envío Interior de Argentina: ${instrumento.costoEnvio}</span>
                        </p>
                    )}
                </div>
                <p className="cantidad-vendida">{instrumento.cantidadVendida} Vendidos</p>
                <Link to={`/instrumentos/${instrumento.id}`} className="button ver-detalle">Ver Detalle</Link>
                <div className="button-group">
                    <button onClick={() => removeFromCart(instrumento)}>-</button>
                    <img src={carritoImage} alt="Carrito" style={{ width: '50px' }} />
                    <button onClick={() => addToCart(instrumento)}>+</button>
                </div>
            </div>
        </div>
    );
};

export default InstrumentoCard;
