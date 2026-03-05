import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-7Z04JH95R8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// tomo la base de datos de firebase y la exporto para usarla en otros archivos. tomo la db desde la aplicacion.
export const db = getFirestore(app);

// creo una funcion asincronica para traer los paquetes desde firebase. si la BD sigue creciendo luego creare mas funciones.
// export async function getPackages() {
//   //llamo a una constante generica. como es una consulta asincronica por ser una consulta una demora implicita, uso await para esperar a que se resuelva la consulta. la consulta es a la base de datos, a la coleccion "packages" y le pido que me traiga todo lo que hay en esa coleccion.
//   // getDocs es una funcion de firebase que me trae los documentos de una coleccion. Los items dentro de mi coleccion son llamados "documentos".
//   //todo lo que esta en el documento esta dentro del llamado "data". el id del documento es un valor unico que firebase le asigna a cada documento. el id no esta dentro de data, es un valor aparte.
//   const querySnapshot = await getDocs(collection(db, "packages"));
//   querySnapshot.forEach((doc) => console.log(doc.id, " => ", doc.data()));
// }
