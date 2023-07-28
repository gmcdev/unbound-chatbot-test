import { AppSettings, User } from '@/types/user';

import { usersCollection } from './collections';

import { doc, setDoc } from 'firebase/firestore';

export async function setAppSettings(user: User, appSettings: AppSettings) {
  try {
    const usersRef = doc(usersCollection, user.userProfile.sub || '');
    await setDoc(usersRef, { appSettings }, { merge: true });
  } catch (err) {
    console.error(err);
  }
}
