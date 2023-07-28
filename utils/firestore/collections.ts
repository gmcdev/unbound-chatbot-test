import { Conversation } from '@/types/chat';
import { Prompt } from '@/types/prompt';
import { User } from '@/types/user';

import { db } from './init';

import {
  CollectionReference,
  DocumentData,
  collection,
} from 'firebase/firestore';

// helper to type our collections
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

// create our collections
export const usersCollection = createCollection<User>('users');
export const conversationsCollection =
  createCollection<Conversation>('conversations');
export const promptsCollection = createCollection<Prompt>('prompts');
