import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * TODO:
 *
 * Better understand how to securely authenticate
 * a public client with Firebase.
 *
 */
const envConfig = JSON.parse(
  process.env.NEXT_PUBLIC_GCLOUD_SERVICE_ACCOUNT || '',
);

// init connection to firebase
const app = !getApps().length ? initializeApp(envConfig) : getApp();

// connect to firestore
export const db = getFirestore(app);
