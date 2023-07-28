import { setConversations } from '@/utils/firestore/conversations';

import { Conversation } from '@/types/chat';
import { User } from '@/types/user';

import { setAppSettings } from '../firestore/app-settings';

export const updateConversation = (
  user: User | undefined,
  updatedConversation: Conversation,
  allConversations: Conversation[],
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  saveConversation(user, updatedConversation);
  saveConversations(user, updatedConversations);

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

export const saveConversation = (
  user: User | undefined,
  conversation: Conversation,
) => {
  if (user) {
    setAppSettings(user, {
      ...user.appSettings,
      selectedConversation: conversation,
    });
  }
  localStorage.setItem('selectedConversation', JSON.stringify(conversation));
};

export const saveConversations = (
  user: User | undefined,
  conversations: Conversation[],
) => {
  if (user) {
    setConversations(user, conversations);
  }
  localStorage.setItem('conversationHistory', JSON.stringify(conversations));
};
