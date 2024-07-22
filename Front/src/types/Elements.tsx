export interface Instrumento {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    categoria: Categoria;
    eliminado: boolean;
}

export interface Categoria {
    id: number;
    denominacion: string;
}

export interface PedidoDetalle {
    id: number;
    cantidad: number;
    subtotal: number;
    instrumento: Instrumento;
    pedido: Pedido;
}

export interface Pedido {
    id?: number;
    fechaPedido?:Date;
    totalPedido: number;
    pedidoDetalle?: PedidoDetalle[];
}

export interface PreferenceMP {
    id: string;
    statusCode:number;
}

export enum Rol {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export default interface Usuario {
    id: number;
    nombreUsuario: string;
    clave: string;
    rol: Rol;
}
