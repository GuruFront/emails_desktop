import React from 'react';
import { useObservable } from '../../utils/useObservable';
import { EmailItem } from './EmailItem';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { EmailListProps } from '../../types/email-list.types';

export function EmailList({ controller }: EmailListProps): JSX.Element {
  const emails = useObservable(controller.emails$) || [];
  const loading = useObservable(controller.loading$);
  const selectedEmail = useObservable(controller.selectedEmail$);

  React.useEffect(() => {
    controller.loadEmails();
  }, [controller]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r">
      {emails.length === 0 ? (
        <div className="text-gray-400 text-center py-8">Нет писем</div>
      ) : (
        emails.map(email => (
          <EmailItem
            key={email.id}
            email={email}
            isSelected={selectedEmail?.id === email.id}
            onClick={controller.selectEmail.bind(controller)}
          />
        ))
      )}
    </div>
  );
} 