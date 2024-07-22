import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Carrito.css';
import { Instrumento, Pedido, PedidoDetalle } from '../types/Elements';
import carritoImg from '../img/carrito.png';
import { createDetallePedido, createPedido } from '../functions/FuncionesApi';
import CheckoutMP, {  } from './CheckoutMP';

interface InstrumentCard {
  instrumento: Instrumento;
  addToCart: (instrumento: Instrumento) => void;
  removeFromCart: (instrumento: Instrumento) => void;
}

const Cart: React.FC<InstrumentCard> = ({ instrumento, addToCart, removeFromCart }) => {
  const location = useLocation();
  const { cart } = location.state as { cart: { instrumento: Instrumento, quantity: number }[] };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.instrumento.precio * item.quantity);
    }, 0);
  };

  const handleBuy = async () => {
    try {
      // Obtener la fecha y hora actual
      const fechaPedido = new Date();
  
      // Crear un nuevo pedido con la fecha y hora actual
      const nuevoPedido: Pedido = {
        totalPedido: calculateTotal(),
        pedidoDetalle: [],
        id: 0,
        fechaPedido: fechaPedido
      };
  
      const pedidoResponse = await createPedido(nuevoPedido);
  
      if (!pedidoResponse || !pedidoResponse.id) {
        throw new Error("Failed to create pedido");
      }
  
      // Crear detalles del pedido y asociarlos al pedido creado
      for (const item of cart) {
        const detalle: PedidoDetalle = {
          cantidad: item.quantity,
          subtotal: item.instrumento.precio * item.quantity,
          instrumento: item.instrumento,
          id: 0,
          pedido: pedidoResponse  // Asociar el detalle con el pedido creado
        };
  
        const detalleResponse = await createDetallePedido(detalle);
  
        if (!detalleResponse) {
          throw new Error("Failed to create pedido detalle");
        }
  
        console.log('Detalle de pedido creado:', detalleResponse);
      }
      // Aquí puedes agregar lógica adicional después de crear el pedido y sus detalles, como limpiar el carrito, redirigir a otra página, etc.
      console.log('Pedido y detalles creados exitosamente');
  
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  const total = calculateTotal();

  return (
    <div className="container">
      <div className='volver-container'>
        <Link to="/instrumentos">
          <button className='button-volver'>Volver</button>
        </Link>
      </div>
      <h1>Carrito</h1>
      <div className="cart-list">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <h2>{item.instrumento.instrumento}</h2>
            <p>Precio: ${item.instrumento.precio}</p>
            <p>Cantidad: {item.quantity}</p>
            <button onClick={() => removeFromCart(instrumento)}>-</button>
            <img src={carritoImg} alt="Carrito" style={{ width: '50px' }} />          
            <button onClick={() => addToCart(instrumento)}>+</button>
          </div>
        ))}
      </div>
      <div>Total: ${calculateTotal()}</div>
      <button onClick={handleBuy}>Guardar Carrito</button>
      <br />
      <CheckoutMP montoCarrito={total} ></CheckoutMP>
    </div>
  );
};

export default Cart;
