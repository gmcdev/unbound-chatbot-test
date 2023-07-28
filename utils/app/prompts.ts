import { setPrompts } from '@/utils/firestore/prompts';

import { Prompt } from '@/types/prompt';
import { User } from '@/types/user';

// TODO, why isn't this being called fromm anywhere?
export const updatePrompt = (
  user: User,
  updatedPrompt: Prompt,
  allPrompts: Prompt[],
) => {
  const updatedPrompts = allPrompts.map((c) => {
    if (c.id === updatedPrompt.id) {
      return updatedPrompt;
    }

    return c;
  });

  savePrompts(user, updatedPrompts);

  return {
    single: updatedPrompt,
    all: updatedPrompts,
  };
};

export const savePrompts = (user: User | undefined, prompts: Prompt[]) => {
  if (user) {
    setPrompts(user, prompts);
  }
  localStorage.setItem('prompts', JSON.stringify(prompts));
};
