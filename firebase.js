import config from '../gcloud-service-account.json';

import { getApp, getApps, initializeApp } from 'firebase/app';

const app = !getApps().length ? initializeApp(config) : getApp();
console.log({ app });
export default app;
