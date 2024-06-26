import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import Home from '../components/Componentes/ComponentesContainer';
import Rutinas from '../components/Firebase/FirebaseContainer';
import Dietas from '../components/Dietas/DietasContainer';
import Favoritos from '../components/Favoritos/FavoritosContainer';
import Chat from '../components/Chat/ChatContainer';
import Ajustes from '../components/Ajustes/AjustesContainer';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        { name=="Componentes" ?
        <Home/>
        : name=="Firebase" ?
        <Rutinas/>
        :name=="Favoritos" ?
        <Favoritos/>
        :name=="Dietas" ?
        <Dietas/>
        :name=="Chat" ?
        <Chat/>
        :
        <Ajustes/>
        }
      </IonContent>
    </IonPage>
  );
};

export default Page;
