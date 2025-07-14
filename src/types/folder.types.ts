import type { DeepReadonly } from './utils';

export type FolderType = 'inbox' | 'sent' | 'drafts' | 'trash' | 'custom';

export type Folder = {
  id: string;
  name: string;
  type: FolderType;
  emailCount: number;
  isActive: boolean;
};

export type FolderState = DeepReadonly<{
  folders: Folder[];
  selectedFolderId: string;
  loading: boolean;
  error: string | null;
}>; 