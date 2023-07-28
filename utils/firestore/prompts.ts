import { Prompt } from '@/types/prompt';
import { User } from '@/types/user';

import { usersCollection } from './collections';

import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function setPrompts(user: User, prompts: Prompt[]) {
  try {
    const usersRef = doc(usersCollection, user.userProfile.sub || '');
    await setDoc(usersRef, { prompts }, { merge: true });
  } catch (err) {
    console.error(err);
  }
}

export async function getPrompts(user: User): Promise<Prompt[]> {
  try {
    const usersRef = doc(usersCollection, user.userProfile.sub || '');
    const userDoc = await getDoc(usersRef);
    return userDoc.data()?.prompts || [];
  } catch (err) {
    console.error(err);
  }
  return [];
}
