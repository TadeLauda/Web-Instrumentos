import React from 'react';
import Navbar from '../components/Navbar';
import SliderComponent from '../components/SliderComponent';
import '../styles/Home.css';

const Home: React.FC = () => {
    return (
      <div className='body'>
        <Navbar />
        <section className="presentation">
          <div className="container">
            <h1 className="titulo">Musica Hendrix</h1>
            <p className="description">
              Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de experiencia. 
              Tenemos el conocimiento y la capacidad como para informarte acerca de las mejores elecciones para tu compra musical.
            </p>
          </div>
        </section>
        <section className="slider-section">
          <div className="container">
            <SliderComponent />
          </div>
        </section>
      </div>
    );
  };

export default Home;
