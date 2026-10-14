import type { FirebaseOptions } from 'firebase/app';

/**
 * CONFIGURACIÓN DE FIREBASE
 * ------------------------------------------------------------------
 * Reemplaza cada valor "TU_..." por el que te muestra Firebase Console:
 *   Configuración del proyecto (⚙) → General → Tus apps → Aplicación web → "Config".
 *
 * La configuración web de Firebase NO es un secreto (identifica tu proyecto);
 * lo que protege tus datos son las reglas de seguridad de Firestore
 * (ver `firestore.rules`) y Firebase Authentication.
 *
 * Mientras existan valores "TU_...", la app muestra un aviso y NO intenta
 * conectarse a Firebase.
 */
export const environment: { production: boolean; firebase: FirebaseOptions } = {
  production: false,
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_PROJECT_ID.firebaseapp.com',
    projectId: 'TU_PROJECT_ID',
    storageBucket: 'TU_PROJECT_ID.firebasestorage.app',
    messagingSenderId: 'TU_MESSAGING_SENDER_ID',
    appId: 'TU_APP_ID',
  },
};
