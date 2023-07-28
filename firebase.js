// import config from '../gcloud-service-account.json';
import { getApp, getApps, initializeApp } from 'firebase/app';

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};
const app = !getApps().length ? initializeApp(config) : getApp();
export default app;
