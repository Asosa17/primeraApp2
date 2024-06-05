import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Dietas: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dietas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <h2>Dietas</h2>
          <p>Aquí puedes ver tus planes de dieta.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dietas;