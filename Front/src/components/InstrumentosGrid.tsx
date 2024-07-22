import React, { useEffect, useState } from 'react';
import { darDeBaja, darDeAlta, getAllInstrumentos, getInstrumentosByCategoriaId, getAllCategorias } from '../functions/FuncionesApi';
import { Categoria, Instrumento } from '../types/Elements';
import '../styles/Grilla.css';
import Navbar from '../components/Navbar';
import InstrumentModal from './InstrumentoModal';
import ModificarInstrumento from './ModificarInstrumento';

const InstrumentosGrid: React.FC = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [modalType, setModalType] = useState<'Agregar' | 'Modificar'>('Agregar');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<number | ''>('');
    const [instrumentoIdToModify, setInstrumentoIdToModify] = useState<number | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const handleDarDeAlta = async (id: number) => {
        const success = await darDeAlta(id, setInstrumentos);
        if (success) {
            // Aquí puedes mostrar algún mensaje de éxito al usuario si lo deseas
        } else {
            // Aquí puedes mostrar algún mensaje de error al usuario si lo deseas
        }
    };

    const handleDarDeBaja = async (id: number) => {
        const success = await darDeBaja(id, setInstrumentos);
        if (success) {
            // Aquí puedes mostrar algún mensaje de éxito al usuario si lo deseas
        } else {
            // Aquí puedes mostrar algún mensaje de error al usuario si lo deseas
        }
    };

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoriaId = parseInt(e.target.value);
        setSelectedCategoria(categoriaId);
        if (categoriaId) {
            getInstrumentosByCategoriaId(categoriaId).then(setInstrumentos);
        } else {
            getAllInstrumentos().then(setInstrumentos);
        }
    };

    const handleOpenAgregarModal = () => {
        setModalType('Agregar');
        setModalOpen(true);
        setInstrumentoIdToModify(null); // Asegúrate de restablecer el ID del instrumento a modificar
    };

    const handleOpenModificarModal = (instrumentoId: number) => {
        setModalType('Modificar');
        setModalOpen(true);
        setInstrumentoIdToModify(instrumentoId);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleAddInstrumento = (newInstrumento: Instrumento) => {
        setInstrumentos((prevInstrumentos) => [...prevInstrumentos, newInstrumento]);
        handleCloseModal();
    };

    const handleUpdateInstrumento = (updatedInstrumento: Instrumento) => {
        setInstrumentos((prevInstrumentos) => prevInstrumentos.map(instrumento => 
            instrumento.id === updatedInstrumento.id ? updatedInstrumento : instrumento));
        handleCloseModal();
    };
    
    useEffect(() => {
        const fetchInstrumentos = async () => {
            const data = await getAllInstrumentos();
            setInstrumentos(data);
        };

        const fetchCategorias = async () => {
            const data = await getAllCategorias();
            setCategorias(data);
        };

        fetchInstrumentos();
        fetchCategorias();
    }, []);

    return (
        <div className="App">
            <Navbar />
            <div className="instrumentos-grid">
                <h2>Lista de Instrumentos</h2>
                <button onClick={handleOpenAgregarModal} className="botonModal">Agregar Instrumento</button>
                {modalOpen && modalType === 'Agregar' && <InstrumentModal onClose={handleCloseModal} onAddInstrumento={handleAddInstrumento} />}
                {modalOpen && modalType === 'Modificar' && <ModificarInstrumento onClose={handleCloseModal} instrumentoId={instrumentoIdToModify} onUpdateInstrumento={handleUpdateInstrumento} />}
                
                <select value={selectedCategoria} onChange={handleCategoriaChange}>
                    <option value="">Todas las Categorías</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
                    ))}
                </select>
                
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Precio</th>
                            <th>Cantidad Vendida</th>
                            <th>Costo de Envío</th>
                            <th>Categoría</th>
                            <th>Disponibilidad</th>
                            <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instrumentos.map(instrumento => (
                            <tr key={instrumento.id} className={instrumento.eliminado ? 'no-disponible' : 'disponible'}>
                                <td>{instrumento.instrumento}</td>
                                <td>{instrumento.marca}</td>
                                <td>{instrumento.modelo}</td>
                                <td>{instrumento.precio}</td>
                                <td>{instrumento.cantidadVendida}</td>
                                <td>{instrumento.costoEnvio}</td>
                                <td>{instrumento.categoria.denominacion}</td>
                                <td>
                                    {instrumento.eliminado ? (
                                        <button onClick={() => handleDarDeAlta(instrumento.id)}>Dar de alta</button>
                                    ) : (
                                        <button onClick={() => handleDarDeBaja(instrumento.id)}>Dar de baja</button>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => handleOpenModificarModal(instrumento.id)}>Modificar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstrumentosGrid;
