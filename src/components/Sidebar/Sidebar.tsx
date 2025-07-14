import React, { useEffect } from 'react';
import { useObservable } from '../../utils/useObservable';
import { FolderList } from './FolderList';
import { Folder } from '../../types/folder.types';
import { SidebarProps } from '../../types/sidebar.types';

export function Sidebar({ controller, emailController }: SidebarProps): JSX.Element {
  const folders = useObservable(controller.folders$) as import('../../types/folder.types').Folder[] || [];
  const selectedFolder = useObservable(controller.selectedFolder$);
  const loading = useObservable(controller.loading$);

  useEffect(() => {
    controller.loadFolders();
  }, [controller]);

  const handleSelectFolder = (id: string) => {
    if (selectedFolder?.id === id) {
      controller.selectFolder('');
      emailController.updateFilters({ folderId: '' });
    } else {
      controller.selectFolder(id);
      emailController.updateFilters({ folderId: id });
    }
    emailController.loadEmails();
  };

  const allFolders: Folder[] = [
    {
      id: '',
      name: 'Все письма',
      type: 'custom',
      emailCount: folders.reduce((sum, f) => sum + (f.emailCount || 0), 0),
      isActive: selectedFolder?.id === ''
    },
    ...folders
  ];

  return (
    <aside className={`transition-all duration-300 w-64 bg-white border-r h-full flex flex-col p-4`}>
      <div className="flex items-center justify-between mb-4 cursor-pointer" >
        <h2 className={`text-lg font-bold text-gray-700 transition-opacity duration-300 opacity-100 w-auto`}>
          Папки
        </h2>
      </div>
      {loading ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Загрузка...
          </div>
      ) : (
        <FolderList
          folders={allFolders}
          selectedFolderId={selectedFolder?.id || ''}
          onSelect={handleSelectFolder}
        />
      )}
    </aside>
  );
} 