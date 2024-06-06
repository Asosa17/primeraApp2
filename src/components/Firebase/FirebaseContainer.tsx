import React, { useState } from 'react';
import { auth, db } from '../../Firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { IonButton, IonContent, IonInput, IonLabel, IonPage } from '@ionic/react';
import { collection, addDoc, getFirestore, doc, setDoc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore';

const Firebase: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [alerta, setAlerta] = useState('');
  const [buttonColor, setButtonColor] = useState('primary');

  const [alertaReg, setAlertaReg] = useState('');
  const [buttonColorReg, setButtonColorReg] = useState('primary');

  const [alertaComida, setAlertaRegComida] = useState('');
  const [buttonColorComida, setButtonColorComida] = useState('primary');
  const [nombreComida, setNombreComida] = useState('');
  const [comida, setComida] = useState('');

  const [alertaCoche, setAlertaRegCoche] = useState('');
  const [buttonColorCoche, setButtonColorCoche] = useState('primary');
  const [nombreCoche, setNombreCoche] = useState('');
  const [coche, setCoche] = useState('');

  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addUserToFirestore(username, email, password)
      setAlertaReg("Usuario creado");
      setButtonColorReg('success');
      setTimeout(() => {
        setAlertaReg('');
        setButtonColorReg('primary');
      }, 1500);
    } catch (error) {
      setAlertaReg("Error al crear usuario");
      setButtonColorReg('danger');
      setTimeout(() => {
        setAlertaReg('');
        setButtonColorReg('primary');
      }, 1500);
    }
  };
  // Función para agregar un usuario a la colección "users"
  const addUserToFirestore = async (username: any, email: any, password: any) => {
    try {

      // Verificar si el documento de la colección "users" existe
      const usersDoc = doc(db, 'users', email);
      const docSnapshot = await getDoc(usersDoc);

      // Si el documento no existe, crear la colección "users" y el documento
      if (!docSnapshot.exists()) {
        await setDoc(usersDoc, {
          username: username,
          email: email,
          password: password,
          comidas: []
        });
        console.log('Colección "users" creada en Firestore');
      }
      console.log('Usuario agregado correctamente a Firestore');
    } catch (error) {
      console.error('Error al agregar usuario a Firestore:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlerta("Inicio de sesion correcto");
      setButtonColor('success');
      setTimeout(() => {
        setAlerta('');
        setButtonColor('primary');
      }, 1500);
    } catch (error) {
      console.log(error);
      setAlerta("Error al iniciar sesion");
      setButtonColor('danger');
      setTimeout(() => {
        setAlerta('');
        setButtonColor('primary');
      }, 1500);
    }
  };

  const handleComida = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userEmail = user.email;
        if (userEmail) {
          const usersDoc = doc(db, 'users', userEmail);
          await updateDoc(usersDoc, {
            [`comidas.${nombreComida}`]: comida
          });
          setAlertaRegComida("Comida agregada correctamente");
          setButtonColorComida('success');
          setTimeout(() => {
            setAlertaRegComida('');
            setButtonColorComida('primary');
          }, 1500);
        }

      }
    } catch (error) {
      setAlertaRegComida("Error al agregar comida");
      setButtonColorComida('danger');
      setTimeout(() => {
        setAlertaRegComida('');
        setButtonColorComida('primary');
      }, 1500);
    }
  }

  const handleCoche = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userEmail = user.email;
        if (userEmail) {
          const usersDoc = doc(db, 'users', userEmail);
          if (nombreCoche.trim() != "" && coche.trim() == "") {
            await updateDoc(usersDoc, {
              //array normal
              coches: arrayUnion(nombreCoche),

            });
            setAlertaRegCoche("coche array añadido correctamente");
            setButtonColorCoche('success');
            setTimeout(() => {
              setAlertaRegCoche('');
              setButtonColorCoche('primary');
            }, 1500);
          } else if (nombreCoche.trim() != "" && coche.trim() != "") {
            await updateDoc(usersDoc, {
              //array + mapa
              coches2: arrayUnion({ nombre: nombreCoche, coche: coche }),

            });
            setAlertaRegCoche("Coche array mapa añadido correctamente");
            setButtonColorCoche('success');
            setTimeout(() => {
              setAlertaRegCoche('');
              setButtonColorCoche('primary');
            }, 1500);
          } else {
            setAlertaRegCoche("Rellene los campos requeridos");
            setButtonColorCoche('danger');
            setTimeout(() => {
              setAlertaRegCoche('');
              setButtonColorCoche('primary');
            }, 1500);
          }


        }

      }
    } catch (error) {
      setAlertaRegCoche("Error al agregar coche");
      setButtonColorCoche('danger');
      setTimeout(() => {
        setAlertaRegCoche('');
        setButtonColorCoche('primary');
      }, 1500);
    }
  }

  //validar email
  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === '') return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    if(isValid){
      setEmail(value)
    }
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    <IonContent className="text-center container">
      <h1 className='text-center'>Registro con Firebase y Auth</h1>
      <div className="container w-50 text-center">
        <div className="caja1 p-2  text-start">
          <IonInput type='text'
            value={username}
            onIonInput={(e: CustomEvent) => setUsername(e.detail.value)}
            label="Username" labelPlacement="floating" fill="solid">
          </IonInput >
        </div>
        <div className="caja1 p-2  text-start">
          <IonInput
            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
            type="email"
            fill="solid"
            label="Email"
            labelPlacement="floating"
            helperText="Enter a valid email"
            errorText="Invalid email"
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
          ></IonInput>
          
        </div>
        <div className="caja2 p-2   text-start">
          <IonInput type='password'
            value={password}
            onIonInput={(e: CustomEvent) => setPassword(e.detail.value)}
            label="Password"
            counter={true}
            labelPlacement="floating" 
            fill="solid"
            maxlength={20}
            counterFormatter={(inputLength, maxlength) => `faltan ${Math.max(0, 6 - inputLength)} caracteres`}
          >
          </IonInput >
        </div>
        <div>
          <IonButton onClick={handleSignUp} className='me-2' color={buttonColorReg}>Registrarse</IonButton>
        </div>
        <IonLabel>{alertaReg}</IonLabel>
      </div>



      <h1 className='text-center'>Inicio de sesión con Firebase y Auth</h1>
      <div className="container w-50 text-center">

        <div className="caja1 p-2  text-start">
          <IonInput type='email'
            value={email}
            onIonInput={(e: CustomEvent) => setEmail(e.detail.value)}
            placeholder="Email" >
          </IonInput >
        </div>
        <div className="caja2 p-2   text-start">
          <IonInput type='password'
            value={password}
            onIonChange={(e: CustomEvent) => setPassword(e.detail.value)}
            placeholder="Password" >
          </IonInput >
        </div>
        <div>
          <IonButton onClick={handleSignIn} color={buttonColor}>Iniciar sesión</IonButton>
        </div>
        <IonLabel>{alerta}</IonLabel>
      </div>


      <h1 className='text-center'>Agregar mapas a Firebase</h1>
      <div className="container w-50 text-center">
        <div className="caja1 p-2  text-start">
          <IonInput type='text'
            value={nombreComida}
            onIonInput={(e: CustomEvent) => setNombreComida(e.detail.value)}
            placeholder="NombreComida" >
          </IonInput >
        </div>
        <div className="caja2 p-2   text-start">
          <IonInput type='text'
            value={comida}
            onIonInput={(e: CustomEvent) => setComida(e.detail.value)}
            placeholder="Comida" >
          </IonInput >
        </div>
        <div>
          <IonButton onClick={handleComida} color={buttonColorComida}>Agregar comida</IonButton>
        </div>
        <IonLabel>{alertaComida}</IonLabel>
      </div>



      <h1 className='text-center'>Agregar arrays,arrays+mapas a Firebase</h1>
      <IonLabel >Rellenar solo el primer campo para array normal, array mas mapa, rellena los dos </IonLabel>
      <div className="container w-50 text-center">
        <div className="caja1 p-2  text-start">
          <IonInput type='text'
            value={nombreCoche}
            onIonInput={(e: CustomEvent) => setNombreCoche(e.detail.value)}
            placeholder="NombreCoche" >
          </IonInput >
        </div>
        <div className="caja2 p-2   text-start">
          <IonInput type='text'
            value={coche}
            onIonInput={(e: CustomEvent) => setCoche(e.detail.value)}
            placeholder="Coche" >
          </IonInput >
        </div>
        <div>
          <IonButton onClick={handleCoche} color={buttonColorCoche}>Agregar Coche</IonButton>
        </div>
        <IonLabel>{alertaCoche}</IonLabel>
      </div>
    </IonContent>
  );
};

export default Firebase;