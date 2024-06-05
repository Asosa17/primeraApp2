import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Ajustes: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <h2>Ajustes</h2>
          <p>Aquí puedes ver tus planes de dieta.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Ajustes;