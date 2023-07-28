import { setFolders } from '@/utils/firestore/folders';

import { FolderInterface } from '@/types/folder';
import { User } from '@/types/user';

export const saveFolders = (
  user: User | undefined,
  folders: FolderInterface[],
) => {
  if (user) {
    setFolders(user, folders);
  }
  localStorage.setItem('folders', JSON.stringify(folders));
};
