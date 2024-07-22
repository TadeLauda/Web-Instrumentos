import React from 'react';
import '../styles/DondeEstamos.css'
import Navbar from '../components/Navbar';

const DondeEstamos: React.FC = () => {
    return (
        <div className="donde-estamos-container">
            <Navbar/>
            <h1 className="donde-estamos-title">Donde Estamos</h1>
            <div className="map-container">
                <iframe
                    title="Ubicación"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3364.473043537175!2d-68.83664618480756!3d-32.89902318094632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967b09a40c3ad5a7%3A0x1a96bd88b9266db2!2sAv.%20Las%20Heras%20%26%20Av.%20San%20Martin%2C%20Mendoza!5e0!3m2!1sen!2sar!4v1643369908824!5m2!1sen!2sar"
                    width="600"
                    height="450"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default DondeEstamos;
