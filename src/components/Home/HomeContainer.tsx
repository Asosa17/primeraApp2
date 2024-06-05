import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import './HomeContainer.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        <div className="container">
          <h2>Bienvenido a nuestra aplicación</h2>
          <p>Esta es la página de inicio de nuestra aplicación Ionic con React.</p>
          <IonButton expand="full" color="primary">Empezar</IonButton>
          
          <IonList>
            <IonItem>
              <IonLabel>Elemento 1</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Elemento 2</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Elemento 3</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;