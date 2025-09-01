// config/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setLogLevel } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwmxWJf0-Rh-hzFFq2na1SFsGbxyVQ3kE",
  authDomain: "practica-firebase-native.firebaseapp.com",
  projectId: "practica-firebase-native",
  storageBucket: "practica-firebase-native.appspot.com",
  messagingSenderId: "236605026291",
  appId: "1:236605026291:web:3a70635681b6f11639ec86"
};

console.log("Valor de configuracion", firebaseConfig);

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Opcional: activar logs para depuración
setLogLevel('debug');

console.log("Firebase app initialized:", app);
console.log("Firebase auth initialized:", auth);
console.log("Firestore initialized:", db);

export { auth, db };
