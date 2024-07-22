import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import '../styles/InstrumentoModal.css';
import { Categoria, Instrumento } from '../types/Elements';
import { getAllCategorias, getInstrumentoById, updateInstrumento } from '../functions/FuncionesApi';

interface ModificarInstrumentoProps {
    onClose: () => void;
    instrumentoId?: number | null;
    onUpdateInstrumento: (updatedInstrumento: Instrumento) => void;
}

const ModificarInstrumento: React.FC<ModificarInstrumentoProps> = ({ onClose, instrumentoId, onUpdateInstrumento }) => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [instrumento, setInstrumento] = useState<Partial<Instrumento>>({
        eliminado: false,
        categoria: '', 
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

        // Si se proporciona un ID de instrumento, obtener los datos del instrumento por su ID
        if (instrumentoId) {
            fetchInstrumentoData(instrumentoId);
        }
    }, [instrumentoId]);

    const fetchInstrumentoData = async (id: number) => {
        try {
            const instrumentoData = await getInstrumentoById(id);
            if (instrumentoData) {
                setInstrumento(prevInstrumento => ({
                    ...prevInstrumento,
                    ...instrumentoData,
                    categoria: instrumentoData.categoria.id, // Establecer el ID de la categoría
                }));
            } else {
                console.error('No se encontraron datos para el instrumento con ID:', id);
            }
        } catch (error) {
            console.error('Error al obtener datos del instrumento:', error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setInstrumento(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const updatedInstrumento: Instrumento = {
            ...instrumento,
            categoria: categorias.find(cat => cat.id === Number(instrumento.categoria))!,
        };

        const response = await updateInstrumento(Number(instrumentoId), updatedInstrumento);

        if (response) {
            console.log('Instrumento modificado:', response);
            onUpdateInstrumento(response); // Call the callback function to update the grid
        } else {
            console.error('Error al modificar instrumento.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Modificar Instrumento</h2>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="instrumento">Instrumento:</label></td>
                                <td><input type="text" id="instrumento" name="instrumento" required onChange={handleChange} value={instrumento.instrumento || ''} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="marca">Marca:</label></td>
                                <td><input type="text" id="marca" name="marca" required onChange={handleChange} value={instrumento.marca || ''} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="modelo">Modelo:</label></td>
                                <td><input type="text" id="modelo" name="modelo" required onChange={handleChange} value={instrumento.modelo || ''} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="imagen">URL de la Imagen:</label></td>
                                <td><input type="text" id="imagen" name="imagen" required onChange={handleChange} value={instrumento.imagen || ''} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="precio">Precio:</label></td>
                                <td><input type="number" id="precio" name="precio" required onChange={handleChange} value={instrumento.precio || ''} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="costoEnvio">Costo de Envío:</label></td>
                                <td><input type="text" id="costoEnvio" name="costoEnvio" required onChange={handleChange} value={instrumento.costoEnvio || ''} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="cantidadVendida">Cantidad Vendida:</label></td>
                                <td><input type="number" id="cantidadVendida" name="cantidadVendida" required onChange={handleChange} value={instrumento.cantidadVendida || ''} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="descripcion">Descripción:</label></td>
                                <td><textarea id="descripcion" name="descripcion" required onChange={handleChange} value={instrumento.descripcion || ''}></textarea></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="categoria">Categoría:</label></td>
                                <td>
                                    <select
                                        id="categoria"
                                        name="categoria"
                                        required
                                        onChange={handleChange}
                                        value={instrumento.categoria || ''}
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categorias.map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.denominacion}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="eliminado">Eliminado:</label></td>
                                <td>
                                    <input type="checkbox" id="eliminado" name="eliminado" onChange={handleChange} checked={instrumento.eliminado || false} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );    
};

export default ModificarInstrumento;
