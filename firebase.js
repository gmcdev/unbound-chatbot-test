import { getApp, getApps, initializeApp } from 'firebase/app';

/**
 * TODO:
 *
 * Better understand how to securely authenticate
 * a public client with Firebase.
 *
 */
const envConfig = JSON.parse(process.env.NEXT_PUBLIC_GCLOUD_SERVICE_ACCOUNT);

const app = !getApps().length ? initializeApp(envConfig) : getApp();

export default app;
