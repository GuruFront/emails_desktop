import React from 'react';
import type { EmailItemProps } from '../../types/email-list.types';

export function EmailItem({ email, isSelected, onClick }: EmailItemProps): JSX.Element {
  return (
    <div
      className={`flex flex-col px-4 py-3 cursor-pointer border-b transition bg-white hover:bg-blue-50
        ${isSelected ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}
      onClick={() => onClick(email.id)}
      tabIndex={0}
      role="button"
      aria-selected={isSelected}
    >
      <div className="flex items-center justify-between">
        <span className={`font-semibold truncate ${email.isRead ? 'text-gray-500' : 'text-blue-700'}`}>{email.from}</span>
        <span className="text-xs text-gray-400 ml-2">{new Date(email.date).toLocaleString('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="flex items-center mt-1">
        <span className={`truncate flex-1 ${email.isRead ? 'text-gray-500' : 'text-black font-bold'}`}>{email.subject}</span>
        {!email.isRead && <span className="ml-2 w-2 h-2 rounded-full bg-blue-500 inline-block" title="Непрочитано"></span>}
      </div>
    </div>
  );
} 