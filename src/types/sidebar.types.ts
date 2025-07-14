import type { Folder } from './folder.types';
import type { FolderController } from '../controllers/FolderController';
import type { EmailController } from '../controllers/EmailController';

export type FolderItemProps = {
  readonly folder: Folder;
  readonly isActive: boolean;
  readonly onClick: (id: string) => void;
  readonly collapsed?: boolean;
};

export type FolderListProps = {
  readonly folders: readonly Folder[];
  readonly selectedFolderId: string;
  readonly onSelect: (id: string) => void;
};

export type SidebarProps = {
  readonly controller: FolderController;
  readonly emailController: EmailController;
}; 