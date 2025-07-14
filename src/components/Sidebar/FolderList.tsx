import React from 'react';
import { FolderItem } from './FolderItem';
import { FolderListProps } from '../../types/sidebar.types';

export function FolderList({ folders, selectedFolderId, onSelect }: FolderListProps): JSX.Element {
  return (
    <nav className="space-y-1">
      {folders.map(folder => (
        <FolderItem
          key={folder.id}
          folder={folder}
          isActive={folder.id === selectedFolderId}
          onClick={onSelect}
        />
      ))}
    </nav>
  );
} 