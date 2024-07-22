import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Instrumento } from '../types/Elements';
import '../styles/InstrumentoDetalle.css';
import jsPDF from 'jspdf';

const InstrumentoDetalles: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInstrumento = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/instrumentos/${id}`);
                setInstrumento(response.data);
            } catch (error) {
                console.error('Error fetching instrumento:', error);
                setError('Hubo un problema al cargar el instrumento. Por favor, intenta nuevamente más tarde.');
            }
        };

        fetchInstrumento();
    }, [id]);

    const handleVolverClick = () => {
        navigate('/instrumentos');
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!instrumento) {
        return <p>Cargando...</p>;
    }

    const handleExportToPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Detalles del Instrumento", 20, 20);
        doc.setFontSize(12);
        doc.text(`Instrumento: ${instrumento.instrumento}`, 20, 30);
        doc.text(`Modelo: ${instrumento.modelo}`, 20, 40);
        doc.text(`Marca: ${instrumento.marca}`, 20, 50);
        doc.text(`Cantidad Vendida: ${instrumento.cantidadVendida}`, 20, 60);
        doc.text(`Precio: $${instrumento.precio}`, 20, 70);
        if (instrumento.costoEnvio === 'G') {
            doc.text("Envío Gratis a todo el país", 20, 80);
        } else {
            doc.text(`Costo de Envío: $${instrumento.costoEnvio}`, 20, 80);
        }
        doc.text("Descripción:", 20, 90);
        doc.text(instrumento.descripcion, 20, 100, { maxWidth: 170 });

        // Add image
        const imageUrl = instrumento.imagen;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            const imgWidth = 70;
            const imgHeight = (img.height * imgWidth) / img.width;
            doc.addImage(img, 'PNG', 140, 20, imgWidth, imgHeight);
            doc.save('detalle_instrumento.pdf');
        };
    };

    return (
        <div id="instrumento-detail" className="instrumento-detail">
            <button className="button volver" onClick={handleVolverClick}>Volver a la lista</button>
            <div className="instrumento-imagen2">
                <img src={instrumento.imagen} alt={instrumento.instrumento} />
            </div>
            <div className="instrumento-info">
                <h2>{instrumento.instrumento}</h2>
                <p className="cantidad-vendida">{instrumento.cantidadVendida} Vendidos</p>
                <p><strong>Modelo:</strong> {instrumento.modelo}</p>
                <p><strong>Marca:</strong> {instrumento.marca}</p>
                <div className="precio-envio">
                    <div className="precio">
                        <h3>${instrumento.precio}</h3>
                    </div>
                    <div className="envio">
                        {instrumento.costoEnvio === 'G' ? (
                            <p className="envio-gratis">
                                <img src="/img/camion.png" alt="camion" className="camion-icon" />
                                Envío gratis a todo el país
                            </p>
                        ) : (
                            <p className="costo-envio">
                                Costo de Envío Interior de Argentina: ${instrumento.costoEnvio}
                            </p>
                        )}
                    </div>
                </div>
                <p className="descripciontitulo"><strong>Descripción:</strong></p>
                <p className="descripcion">{instrumento.descripcion}</p>
            </div>
            <button onClick={handleExportToPDF}>Exportar a PDF</button>
        </div>
    );
};

export default InstrumentoDetalles;
