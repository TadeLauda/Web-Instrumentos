import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import '../styles/InstrumentoModal.css';
import '../types/Elements'
import { Categoria, Instrumento } from '../types/Elements';
import { createInstrumento, getAllCategorias } from '../functions/FuncionesApi';

interface InstrumentModalProps {
    onClose: () => void;
    onAddInstrumento: (instrumento: Instrumento) => void;
}

const InstrumentModal: React.FC<InstrumentModalProps> = ({ onClose, onAddInstrumento }) => {

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    
    const [instrumento, setInstrumento] = useState<Partial<Instrumento>>({
        eliminado: false, 
    });

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categoriasData = await getAllCategorias(); // Obtener todas las categorías
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        if (name === 'categoria') {
            const categoriaId = categorias.find((cat) => cat.denominacion === value)?.id || ''; // Obtener el ID de la categoría
            setInstrumento((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : categoriaId,
            }));
        } else {
            setInstrumento((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newInstrumento: Instrumento = {
            id: Date.now(),
            instrumento: instrumento.instrumento || '',
            marca: instrumento.marca || '',
            modelo: instrumento.modelo || '',
            imagen: instrumento.imagen || '',
            precio: Number(instrumento.precio),
            costoEnvio: instrumento.costoEnvio || '',
            cantidadVendida: Number(instrumento.cantidadVendida),
            descripcion: instrumento.descripcion || '',
            categoria: categorias.find((cat) => cat.id === Number(instrumento.categoria))!,
            eliminado: instrumento.eliminado || false,
        };

        const createdInstrumento = await createInstrumento(newInstrumento);

        if (createdInstrumento) {
            console.log('Instrumento creado:', createdInstrumento);
            onAddInstrumento(createdInstrumento); // Call the callback function to update the grid
        } else {
            console.error('Error al crear instrumento.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Agregar Nuevo Instrumento</h2>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr className="row-instrumento-marca-modelo">
                                <td className="cell-instrumento">
                                    <label htmlFor="instrumento">Instrumento:</label>
                                    <input type="text" id="instrumento" name="instrumento" required onChange={handleChange} />
                                </td>
                                <td className="cell-marca">
                                    <label htmlFor="marca">Marca:</label>
                                    <input type="text" id="marca" name="marca" required onChange={handleChange} />
                                </td>
                                <td className="cell-modelo">
                                    <label htmlFor="modelo">Modelo:</label>
                                    <input type="text" id="modelo" name="modelo" required onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className="row-imagen">
                                <td className="cell-imagen" colSpan="3">
                                    <label htmlFor="imagen">URL de la Imagen:</label>
                                    <input type="text" id="imagen" name="imagen" required onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className="row-precio-envio-cantidad">
                                <td className="cell-precio">
                                    <label htmlFor="precio">Precio:</label>
                                    <input type="number" id="precio" name="precio" required onChange={handleChange} />
                                </td>
                                <td className="cell-costoEnvio">
                                    <label htmlFor="costoEnvio">Costo de Envío:</label>
                                    <input type="text" id="costoEnvio" name="costoEnvio" required onChange={handleChange} />
                                </td>
                                <td className="cell-cantidadVendida">
                                    <label htmlFor="cantidadVendida">Cantidad Vendida:</label>
                                    <input type="number" id="cantidadVendida" name="cantidadVendida" required onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className="row-descripcion">
                                <td className="cell-descripcion" colSpan="3">
                                    <label htmlFor="descripcion">Descripción:</label>
                                    <textarea id="descripcion" name="descripcion" required onChange={handleChange}></textarea>
                                </td>
                            </tr>
                            <tr className="row-categoria-eliminado">
                                <td className="cell-categoria">
                                    <label htmlFor="categoria">Categoría:</label>
                                    <select id="categoria" name="categoria" required onChange={handleChange}>
                                        <option value="">Selecciona una categoría</option>
                                        {categorias.map((cat) => (
                                            <option key={cat.id} value={cat.denominacion}>
                                                {cat.denominacion}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="cell-eliminado">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="eliminado" style={{ marginRight: '10px' }}>Eliminado:</label>
                                        <input type="checkbox" id="eliminado" name="eliminado" onChange={handleChange} />
                                    </div>
                                </td>
                                <div className="button-container">
                                    <button type="submit">Guardar</button>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default InstrumentModal;
