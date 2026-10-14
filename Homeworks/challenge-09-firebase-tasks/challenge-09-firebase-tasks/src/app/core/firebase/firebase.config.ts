import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../../../environments/environment';

/**
 * Inicialización CENTRALIZADA de Firebase (equivale al `firebase/config.js`
 * que muestran las diapositivas). Todo el proyecto importa `firebaseAuth`
 * y `firestoreDb` desde aquí; nadie más llama a `initializeApp`.
 */
export const firebaseConfig = environment.firebase;

/** `false` mientras queden valores de ejemplo ("TU_...") en `environment.ts`. */
export const isFirebaseConfigured: boolean = Object.values(firebaseConfig).every(
  (value) => typeof value === 'string' && value.trim() !== '' && !value.startsWith('TU_'),
);

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

/** Firebase Authentication (slide: `const auth = getAuth()`). */
export const firebaseAuth = getAuth(firebaseApp);

/** Cloud Firestore (slide: "Must add getFirestore function to firebase/config"). */
export const firestoreDb = getFirestore(firebaseApp);
