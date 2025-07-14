import React from 'react';
import { FolderItemProps } from '../../types/sidebar.types';

export function FolderItem({ folder, isActive, onClick, collapsed }: FolderItemProps): JSX.Element {
  const isAllMail = folder.id === '';
  return (
    <button
      className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors text-left mb-1
        ${isActive
          ? 'bg-blue-100 text-blue-700 font-semibold'
          : 'bg-gray-50 text-gray-900 font-bold border border-gray-200'}
      `}
      onClick={() => onClick(folder.id)}
    >
      <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${!collapsed ? 'bg-gray-200' : ''}`}>
        {isAllMail ? '📥' : folder.name.charAt(0).toUpperCase()}
      </span>
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{folder.name}</span>
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-200' : 'bg-gray-200'}`}>{folder.emailCount}</span>
        </>
      )}
    </button>
  );
} 