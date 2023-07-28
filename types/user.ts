import { Conversation } from '@/types/chat';
import { Prompt } from '@/types/prompt';
import { Settings } from '@/types/settings';

import { UserProfile } from '@auth0/nextjs-auth0/client';

export interface AppSettings extends Settings {
  showPromptbar: boolean;
  showChatbar: boolean;
  selectedConversation: Conversation;
}

export interface User {
  userProfile: UserProfile;
  appSettings: AppSettings;
  conversations: Conversation[];
  prompts: Prompt[];
}
