import React from 'react';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
  IonText,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, homeOutline, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, pizzaOutline, rocketOutline, sendOutline, settingsOutline, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Componentes',
    url: '/page/Componentes',
    iosIcon: mailOutline,
    mdIcon: homeOutline
  },
  {
    title: 'Firebase',
    url: '/page/Firebase',
    iosIcon: paperPlaneOutline,
    mdIcon: rocketOutline
  },
  {
    title: 'Favoritos',
    url: '/page/Favoritos',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Dietas',
    url: '/page/Dietas',
    iosIcon: archiveOutline,
    mdIcon: pizzaOutline
  },
  {
    title: 'Chat',
    url: '/page/Chat',
    iosIcon: trashOutline,
    mdIcon: sendOutline
  },
  {
    title: 'Ajustes',
    url: '/page/Ajustes',
    iosIcon: warningOutline,
    mdIcon: settingsOutline
  }
];



const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <div className="d-flex align-items-center justify-content-center ">
          <div className="me-4">
            <img src="/assets/icon/favicon.png" />
          </div>
          <div className="  ">
            <h1 className="p-0 m-0">Menu</h1>
            <p className="p-0 m-0">NombreUser</p>
          </div>
        </div>
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>


      </IonContent>
    </IonMenu>
  );
};

export default Menu;
