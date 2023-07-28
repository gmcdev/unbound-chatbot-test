import { Conversation } from '@/types/chat';
import { Prompt } from '@/types/prompt';
import { AppSettings } from '@/types/user';

export function applyAppState(
  appSettings: AppSettings,
  conversations: Conversation[],
  prompts: Prompt[],
) {
  console.log('Apply to LocalStorage:', {
    appSettings,
    conversations,
    prompts,
  });
}
