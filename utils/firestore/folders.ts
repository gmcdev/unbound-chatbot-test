import { FolderInterface } from '@/types/folder';
import { User } from '@/types/user';

import { usersCollection } from './collections';

import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function setFolders(user: User, folders: FolderInterface[]) {
  try {
    const usersRef = doc(usersCollection, user.userProfile.sub || '');
    await setDoc(usersRef, { folders }, { merge: true });
  } catch (err) {
    console.error(err);
  }
}

export async function getFolders(user: User): Promise<FolderInterface[]> {
  try {
    const usersRef = doc(usersCollection, user.userProfile.sub || '');
    const userDoc = await getDoc(usersRef);
    return userDoc.data()?.folders || [];
  } catch (err) {
    console.error(err);
  }
  return [];
}
