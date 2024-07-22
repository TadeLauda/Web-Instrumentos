import { Instrumento, Pedido, PedidoDetalle, PreferenceMP } from "../types/Elements";

    //GETALL INSTRUMENTOS
export const getAllInstrumentos = async () => {
    try {
        const response = await fetch('http://localhost:8080/instrumentos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:');
        return [];
    }
};

    //GETALL Categorias
    export const getAllCategorias = async () => {
        try {
            const response = await fetch('http://localhost:8080/categorias');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:');
            return [];
        }
    };

    //GET BY ID INSTRUMENTO
export const getInstrumentoById = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8080/instrumentos/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:');
        return null;
    }
};

    //GET BY ID CATEGORIAS
    export const getCategoriaById = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/categorias/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:');
            return null;
        }
    };

    //POST INSTRUMENTO
export const createInstrumento = async (instrumento: Instrumento) => {
    try {
        const response = await fetch('http://localhost:8080/instrumentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(instrumento),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating instrumento:');
        return null;
    }
};

    //PUT INSTRUMENTO
export const updateInstrumento = async (id: number, instrumento: Instrumento) => {
    try {
        const response = await fetch(`http://localhost:8080/instrumentos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(instrumento),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating instrumento:');
        return null;
    }
};

    //DELETE INSTRUMENTO
export const deleteInstrumento = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8080/instrumentos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error deleting instrumento:');
        return false;
    }
};

export const getInstrumentosByCategoriaId = async (categoriaId: number) => {
    try {
        const response = await fetch(`http://localhost:8080/instrumentos/categoria/${categoriaId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching instrumentos by categoria:');
        return [];
    }
};

export const darDeAlta = async (id: number, setInstrumentos: React.Dispatch<React.SetStateAction<Instrumento[]>>) => {
    try {
        const instrumento = await getInstrumentoById(id);
        if (instrumento) {
            instrumento.eliminado = false;
            await updateInstrumento(id, instrumento);
            console.log('Se dio de alta');
            setInstrumentos(prevInstrumentos => prevInstrumentos.map(inst => inst.id === id ? { ...inst, eliminado: false } : inst));
            return true;
        } else {
            throw new Error('Instrumento no encontrado');
        }
    } catch (error) {
        console.error('Error dando de alta el instrumento:', error);
        return false;
    }
};

export const darDeBaja = async (id: number, setInstrumentos: React.Dispatch<React.SetStateAction<Instrumento[]>>) => {
    try {
        const instrumento = await getInstrumentoById(id);
        if (instrumento) {
            instrumento.eliminado = true;
            await updateInstrumento(id, instrumento);
            console.log('Se dio de baja');
            setInstrumentos(prevInstrumentos => prevInstrumentos.map(inst => inst.id === id ? { ...inst, eliminado: true } : inst));
            return true;
        } else {
            throw new Error('Instrumento no encontrado');
        }
    } catch (error) {
        console.error('Error dando de baja el instrumento:', error);
        return false;
    }
};


// Funcion que muestra la disponibilidad con un alert
export const mostrarEliminado = (eliminado: boolean) => {
    const mensaje = eliminado ? "Instrumento dado de baja" : "Instrumento activo";
    alert(mensaje);
};

//POST Pedidos
export const createPedido = async (pedido: Pedido) => {
    try {
        const response = await fetch('http://localhost:8080/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating pedido:', error);
        return null;
    }
};

// POST detallePedidos
export const createDetallePedido = async (pedidoDetalle: PedidoDetalle) => {
    try {
      const response = await fetch('http://localhost:8080/detallePedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoDetalle),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating pedido detalle:', error);
      return null;
    }
  };

