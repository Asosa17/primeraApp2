import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../../Firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { collection, addDoc, getFirestore, doc, setDoc, getDoc, arrayUnion, updateDoc, getDocs } from 'firebase/firestore';

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

  const [passwords, setPasswords] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [ejerciciosF, setEjerciciosF] = useState<any[]>([]);
  const [cochesMap, setCochesMap] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const loadEjerciciosFoto = async () => {
    try {
      setLoading(true); // Mostrar el indicador de carga

      const querySnapshot = await getDocs(collection(db, 'CATEGORIAS', 'PECTORALES', 'EJERCICIOS'));

      const ejerciciosData = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const id = doc.id;

        try {
          const imageUrl = await getDownloadURL(ref(storage, `/EJERCICIOS/PECTORALES/${id}.gif`));
          console.log(imageUrl);
          return { id, ...data, imageUrl };
        } catch (error) {
          // Si no se puede obtener la URL de la imagen, devolvemos el ejercicio sin imagen
          return { id, ...data };
        }
      }));

      setEjerciciosF(ejerciciosData.slice(0, 15));
      setLoading(false); // Ocultar el indicador de carga
    } catch (error) {
      console.error('Error al obtener los ejercicios: ', error);
      setLoading(false); // Asegurarse de ocultar el indicador de carga en caso de error
    }
  };
  const loadEjercicios = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'CATEGORIAS', 'PECTORALES', 'EJERCICIOS'));
      const ejerciciosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEjercicios(ejerciciosData.slice(0, 15)); // Limitar a 15 ejercicios
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los ejercicios: ', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Cargando ejercicios...</p>;
  }
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
    if (isValid) {
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
          <IonItem className='align-items-center'>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type={showPassword ? 'text' : 'password'}
              value={password}
              onIonInput={(e: CustomEvent) => setPassword(e.detail.value as string)}
              counter={true}
              maxlength={20}
              counterFormatter={(inputLength, maxlength) => `faltan ${Math.max(0, 6 - inputLength)} caracteres`}
            />
            <IonIcon
              slot="end"

              icon={showPassword ? eyeOffOutline : eyeOutline}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            />
          </IonItem>
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


      <h1 className='text-center'>Pintar datos de la bbdd</h1>
      <div className='container w-75'>
        <IonButton onClick={loadEjercicios}>Cargar Ejercicios</IonButton>
        <IonList className='mt-3'>
          {/*Limitar a 5 ejs*/}
          {ejercicios.slice(0, 5).map(ejercicio => (
            <IonItem key={ejercicio.id}>
              <IonLabel>
                <h2>{ejercicio.nombre}</h2>
                <p>{ejercicio.descripcion}</p>
                <p>{ejercicio.id}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </div>

      <h1 className='text-center'>Pintar datos de la bbdd con fotos desde el storage</h1>
      <div className='container-fluid w-75'>
        <IonButton onClick={loadEjerciciosFoto}>Cargar Ejercicios</IonButton>
        <IonList className='mt-3 px-3'>
          {/*Limitar a 5 ejs*/}
          {ejerciciosF.slice(0, 5).map(ejercicio => (
            <div key={ejercicio.id} className='mt-3'>
              <div className='row'>
                {ejercicio.imageUrl && <img src={ejercicio.imageUrl} alt={ejercicio.nombre} className=' img-fluid col-md-4' />}
                <div className='p-3 text-start col-md-8'>
                  <p>{ejercicio.id}</p>
                  <h5 >{ejercicio.nombre}</h5>
                  <p className='fs-6 '>{ejercicio.descripcion}</p>

                </div>
              </div>
            </div>
          ))}
        </IonList>
      </div>

    </IonContent>
  );
};

export default Firebase;