import type { Email } from './email.types';
import type { EmailController } from '../controllers/EmailController';

export type EmailItemProps = {
  readonly email: Email;
  readonly isSelected: boolean;
  readonly onClick: (id: string) => void;
};

export type EmailListProps = {
  readonly controller: EmailController;
}; 