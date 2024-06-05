
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../../Firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButton, IonList, IonItem, IonLabel
} from '@ionic/react';
import './HomeContainer.css';
import { Carousel } from 'react-bootstrap';

const Home: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null); // Usar ElementRef<HTMLDivElement>
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        // Usar el operador de aserción (!) para indicar que carouselRef.current no es nulo
        (carouselRef.current as any).next();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created!');
    } catch (error) {
      alert("error");
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Signed in!');
    } catch (error) {
      alert("error");
    }
  };

  return (
    <div className="  h-100 ">
      <Carousel ref={carouselRef as any} interval={3000} controls={false}>
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
      <div>
        <h1 className='text-center'>Firebase Auth with Ionic React</h1>
        <div className="container w-100 text-center">
          <div className="caja1 p-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="caja2 p-2 ">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleSignIn}>Sign In</button>
        </div>


      </div>
    </div>
  );
};

export default Home;