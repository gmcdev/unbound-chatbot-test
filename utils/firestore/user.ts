import { User } from '@/types/user';

import { usersCollection } from './collections';

import { UserProfile } from '@auth0/nextjs-auth0/client';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function updateUserProfile(user: UserProfile): Promise<User> {
  const userRef = doc(usersCollection, user.sub || '');
  await setDoc(userRef, { userProfile: user }, { merge: true });

  const userDoc = await getDoc(userRef);
  return userDoc.data() as User;
}
