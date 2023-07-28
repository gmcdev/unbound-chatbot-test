import { Dispatch } from 'react';

import {
  cleanConversationHistory,
  cleanSelectedConversation,
} from '@/utils/app/clean';
import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import { getSettings } from '@/utils/app/settings';
import { getConversations } from '@/utils/firestore/conversations';
import { getFolders } from '@/utils/firestore/folders';
import { getPrompts } from '@/utils/firestore/prompts';

import { Conversation } from '@/types/chat';
import { FolderInterface } from '@/types/folder';
import { OpenAIModelID, OpenAIModels } from '@/types/openai';
import { Prompt } from '@/types/prompt';
import { AppSettings, User } from '@/types/user';

import { TFunction } from 'i18next';
import { v4 as uuidv4 } from 'uuid';

export function purgeAppState() {
  localStorage.removeItem('showChatbar');
  localStorage.removeItem('prompts');
  localStorage.removeItem('selectedConversation');
  localStorage.removeItem('folders');
  localStorage.removeItem('showPromptbar');
  localStorage.removeItem('settings');
  localStorage.removeItem('conversationHistory');
}

export async function loadAppState(user: User) {
  // TODO, technically we get all the data in the User document,
  // and these multiple trips to Firestore are redundant.
  //
  // However, this will scale better if Conversations, Prompts, and Folders
  // are in sub-collections.

  const conversations = await getConversations(user);
  const prompts = await getPrompts(user);
  const folders = await getFolders(user);

  // now let's update LocalStorage
  applyAppState(user.appSettings, conversations, prompts, folders);
}

// TODO: learn why appSettings is racey|undefined
export function applyAppState(
  appSettings: AppSettings,
  conversations: Conversation[],
  prompts: Prompt[],
  folders: FolderInterface[],
) {
  localStorage.setItem(
    'showChatbar',
    appSettings?.showChatbar?.toString() || 'true',
  );
  localStorage.setItem('prompts', JSON.stringify(prompts));
  if (appSettings?.selectedConversation) {
    localStorage.setItem(
      'selectedConversation',
      JSON.stringify(appSettings.selectedConversation),
    );
  }
  localStorage.setItem('folders', JSON.stringify(folders));
  localStorage.setItem(
    'showPromptbar',
    appSettings?.showPromptbar?.toString() || 'true',
  );
  if (appSettings) {
    localStorage.setItem('settings', JSON.stringify(appSettings));
  }
  localStorage.setItem('conversationHistory', JSON.stringify(conversations));
}

export function dispatchAppState(
  dispatch: Dispatch<any>,
  defaultModelId: OpenAIModelID,
  serverSideApiKeyIsSet: boolean,
  serverSidePluginKeysSet: boolean,
  t: TFunction<'chat', undefined, 'chat'>,
) {
  const settings = getSettings();
  if (settings.theme) {
    dispatch({
      field: 'lightMode',
      value: settings.theme,
    });
  }

  const apiKey = localStorage.getItem('apiKey');

  if (serverSideApiKeyIsSet) {
    dispatch({ field: 'apiKey', value: '' });

    localStorage.removeItem('apiKey');
  } else if (apiKey) {
    dispatch({ field: 'apiKey', value: apiKey });
  }

  const pluginKeys = localStorage.getItem('pluginKeys');
  if (serverSidePluginKeysSet) {
    dispatch({ field: 'pluginKeys', value: [] });
    localStorage.removeItem('pluginKeys');
  } else if (pluginKeys) {
    dispatch({ field: 'pluginKeys', value: pluginKeys });
  }

  if (window.innerWidth < 640) {
    dispatch({ field: 'showChatbar', value: false });
    dispatch({ field: 'showPromptbar', value: false });
  }

  const showChatbar = localStorage.getItem('showChatbar');
  if (showChatbar) {
    dispatch({ field: 'showChatbar', value: showChatbar === 'true' });
  }

  const showPromptbar = localStorage.getItem('showPromptbar');
  if (showPromptbar) {
    dispatch({ field: 'showPromptbar', value: showPromptbar === 'true' });
  }

  const folders = localStorage.getItem('folders');
  if (folders) {
    dispatch({ field: 'folders', value: JSON.parse(folders) });
  }

  const prompts = localStorage.getItem('prompts');
  if (prompts) {
    dispatch({ field: 'prompts', value: JSON.parse(prompts) });
  }

  const conversationHistory = localStorage.getItem('conversationHistory');
  let parsedConversationHistory: Conversation[] = [];
  if (conversationHistory) {
    parsedConversationHistory = JSON.parse(conversationHistory);
    const cleanedConversationHistory = cleanConversationHistory(
      parsedConversationHistory,
    );

    dispatch({ field: 'conversations', value: cleanedConversationHistory });
  }

  const selectedConversation = localStorage.getItem('selectedConversation');
  if (selectedConversation) {
    const parsedSelectedConversation: Conversation =
      JSON.parse(selectedConversation);
    const cleanedSelectedConversation = cleanSelectedConversation(
      parsedSelectedConversation,
    );

    dispatch({
      field: 'selectedConversation',
      value: cleanedSelectedConversation,
    });
  } else {
    const lastConversation =
      parsedConversationHistory[parsedConversationHistory.length - 1];
    dispatch({
      field: 'selectedConversation',
      value: {
        id: uuidv4(),
        name: t('New Conversation'),
        messages: [],
        model: OpenAIModels[defaultModelId],
        prompt: DEFAULT_SYSTEM_PROMPT,
        temperature: lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
        folderId: null,
      },
    });
  }
}
