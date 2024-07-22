import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DondeEstamos from './pages/DondeEstamos';
import InstrumentosPage from './pages/Instrumento';
import InstrumentoDetalles from './pages/InstrumentoDetalle';
import Carrito from './components/Carrito';
import LoginPage from './pages/LogingPage';
import { AuthProvider } from './utils/AuthContext';
import { RutaPrivada } from './utils/RutaPrivada';
import InstrumentosGrid from './components/InstrumentosGrid';
import ChartsGoogle from './components/ChartsGoogle';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                    <Routes>
                        <Route path='/' element={<LoginPage />} />
                        <Route path="/home" element={<RutaPrivada><Home /></RutaPrivada>} />
                        <Route path="/grilla" element={<RutaPrivada><InstrumentosGrid /></RutaPrivada>} />
                        <Route path="/direccion" element={<RutaPrivada><DondeEstamos /></RutaPrivada>} />
                        <Route path="/instrumentos/:id" element={<><InstrumentoDetalles /></>} />
                        <Route path="/instrumentos" element={<RutaPrivada><InstrumentosPage /></RutaPrivada>} />
                        <Route path='/google-charts' element={<RutaPrivada><ChartsGoogle /></RutaPrivada>} />
                        <Route path="/cart" element={<RutaPrivada><Carrito/></RutaPrivada>} />
                    </Routes>

            </Router>
        </AuthProvider>
    );
}

export default App;
