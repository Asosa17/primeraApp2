import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Favoritos: React.FC = () => {
  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favoritos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <h2>Favoritos</h2>
          <p>Aquí puedes ver tus rutinas y dietas favoritas.</p>
        </div>
      </IonContent>
    </IonContent>
  );
};

export default Favoritos;