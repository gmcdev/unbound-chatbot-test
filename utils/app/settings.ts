import { setAppSettings } from '@/utils/firestore/app-settings';

import { Settings } from '@/types/settings';
import { User } from '@/types/user';

const STORAGE_KEY = 'settings';

export const getSettings = (): Settings => {
  let settings: Settings = {
    theme: 'dark',
  };
  const settingsJson = localStorage.getItem(STORAGE_KEY);
  if (settingsJson) {
    try {
      let savedSettings = JSON.parse(settingsJson) as Settings;
      settings = Object.assign(settings, savedSettings);
    } catch (e) {
      console.error(e);
    }
  }
  return settings;
};

export const saveSettings = (user: User | undefined, settings: Settings) => {
  if (user) {
    setAppSettings(user, { ...user.appSettings, ...settings });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
