import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Rutinas: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rutinas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <h2>Rutinas</h2>
          <p>Aquí puedes ver tus rutinas de ejercicios.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Rutinas;