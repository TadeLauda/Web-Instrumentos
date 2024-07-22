import { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { PreferenceMP } from '../types/Elements';
import PreferenceMPService from '../service/PreferenceMPService';
import { Pedido } from '../types/Elements';
import "../styles/CheckoutMP.css"


export async function createPreferenceMP(pedido : Pedido) {
    const urlServer = 'http://localhost:8080/mercado_pago/create_preference';
    const response = await fetch(urlServer, {
        method: "POST",
        body: JSON.stringify(pedido),
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json() as PreferenceMP;
}

function CheckoutMP({ montoCarrito = 0 }) {
    const [idPreference, setIdPreference] = useState<string>('');
    const preferenceMPService = new PreferenceMPService();
    const [mostrarPagoMP, setMostrarPagoMP] = useState(false); 
    
    
    const getPreferenceMP = async () => {
      if (montoCarrito > 0) {
        const nuevoPedido: Pedido = {
          totalPedido: montoCarrito,
        };
  
        try {
          const response = await preferenceMPService.createPreferenceMP(nuevoPedido);
          if (response && response.id) {
            console.log("Preference id: " + response.id);
            setIdPreference(response.id);
            setMostrarPagoMP(true); 
          } else {
            console.error('Error: La respuesta de la API no contiene un ID de preferencia.');
          }
        } catch (error) {
          console.error('Error al crear preferencia de Mercado Pago:', error);
        }
      } else {
        alert("Agregue al menos un plato al carrito");
      }
    };
  
    initMercadoPago('TEST-1612f60e-3519-4fbc-8de0-dd81d0a95978', { locale: 'es-AR' });
  
    return (
      <div>
        <button onClick={getPreferenceMP} className="btn-mercado-pago" >Comprar con MP</button>
        {mostrarPagoMP && ( 
                <div className={idPreference ? 'divVisible' : 'divInvisible'}>
                <Wallet initialization={{ preferenceId: idPreference, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
              </div>
        )}
      </div>
    );
  }
  
  export default CheckoutMP;