import type { Folder } from './folder.types';
import type { FolderController } from '../controllers/FolderController';
import type { EmailController } from '../controllers/EmailController';
import type { DeepReadonly } from './utils';

export type FolderItemProps = DeepReadonly<{
  folder: Folder;
  isActive: boolean;
  onClick: (id: string) => void;
  collapsed?: boolean;
}>;

export type FolderListProps = DeepReadonly<{
  folders: readonly Folder[];
  selectedFolderId: string;
  onSelect: (id: string) => void;
}>;

export type SidebarProps = DeepReadonly<{
  controller: FolderController;
  emailController: EmailController;
}>; 