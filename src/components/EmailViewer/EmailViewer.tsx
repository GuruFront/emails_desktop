import React from 'react';
import { EmailViewerProps } from '../../types/email-viewer.types';
import { useObservable } from '../../utils/useObservable';

export function EmailViewer({ controller, onDeleteEmail }: EmailViewerProps): JSX.Element {
  const email = useObservable(controller.selectedEmail$);

  if (!email) {
    return <div className="flex-1 flex items-center justify-center text-gray-400 mt-12">Выберите письмо для просмотра</div>;
  }

  return (
    <div className="flex flex-col h-full p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-lg font-bold text-gray-800">{email.subject}</div>
          <div className="text-sm text-gray-500">{email.from} • {new Date(email.date).toLocaleString('ru-RU')}</div>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded text-xs font-medium border transition ${email.isRead ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-700'}`}
            onClick={() => email.isRead ? controller.markAsUnread(email.id) : controller.markAsRead(email.id)}
          >
            {email.isRead ? 'Пометить как непрочитанное' : 'Пометить как прочитанное'}
          </button>
          <button
            className="px-3 py-1 rounded text-xs font-medium border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
            onClick={() => onDeleteEmail(email.id)}
          >
            Удалить
          </button>
        </div>
      </div>
      <div className="flex-1 text-gray-800 whitespace-pre-line mt-2">
        {email.content}
      </div>
    </div>
  );
} 