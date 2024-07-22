import React, { useState } from 'react';
import '../styles/SliderComponent.css';

const SliderComponent: React.FC = () => {
  const slides = [
    "https://media.traveler.es/photos/63e767323195e23e77291e7b/16:9/w_2560%2Cc_limit/BOSCO10.jpeg",
    "https://www.infoviajera.com/wp-content/uploads/2020/03/Tienda_Musica_Guitar_Center_NYC_New_York_USA.jpg",
    "https://madradio.co/wp-content/uploads/2023/11/Mad-News-img-1.jpg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="slider-container">
      <button className="prev" onClick={prevSlide}>❮</button>
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={index === currentSlide ? "slide active" : "slide"}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <img src={slide} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default SliderComponent;
