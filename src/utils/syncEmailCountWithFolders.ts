import { Subscription, combineLatest } from 'rxjs';
import { EmailStore } from '../stores/EmailStore';
import { FolderStore } from '../stores/FolderStore';

export function syncEmailCountWithFolders(
  emailStore: Readonly<EmailStore>,
  folderStore: Readonly<FolderStore>
): Subscription {
  return combineLatest([ emailStore.emails$, folderStore.folders$])
  .subscribe(([ emails, folders ]) => {
    const updatedFolders = folders.map(folder => {
      let count;
      if (folder.id === 'trash') {
        count = emails.filter(e => e.folderId === 'trash' && e.isDeleted).length;
      } else {
        count = emails.filter(e => e.folderId === folder.id && !e.isDeleted).length;
      }
      return { ...folder, emailCount: count };
    });

    const changed = updatedFolders.some((f, i) => f.emailCount !== folders[i]?.emailCount);
    if (changed) {
      folderStore.setFolders(updatedFolders);
    }
  });
} 