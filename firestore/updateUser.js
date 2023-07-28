import app from '../firebase.js';

import { addDoc, doc, getFirestore, setDoc } from 'firebase/firestore';

const db = getFirestore(app);

export async function updateUser(user) {
  console.log({ db, user });
  // does user exist
  try {
    await setDoc(doc(db, 'users', user.sub), user);
  } catch (e) {
    console.log(e);
  }
}
