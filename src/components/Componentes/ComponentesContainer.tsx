
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useRef } from 'react';
import './ComponentesContainer.css';
import { Carousel } from 'react-bootstrap';

const Home: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null); // Usar ElementRef<HTMLDivElement>
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        // Usar el operador de aserción (!) para indicar que carouselRef.current no es nulo
        (carouselRef.current as any).next();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);


 

  return (
    <div className=" h-100 ">
      <Carousel ref={carouselRef as any}  controls={false}>
        <Carousel.Item>
          <div className="bg-danger" style={{ height: '30em' }}></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="bg-black" style={{ height: '30em' }}></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="bg-secondary" style={{ height: '30em' }}></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="bg-warning" style={{ height: '30em' }}></div>
        </Carousel.Item>
      </Carousel>
      
    </div>
  );
};

export default Home;