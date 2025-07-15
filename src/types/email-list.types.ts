import type { Email } from './email.types';
import type { DeepReadonly } from './utils';
import type { EmailController } from '../controllers/EmailController';

export type EmailItemProps = DeepReadonly<{
  email: Email;
  isSelected: boolean;
  onClick: (id: string) => void;
}>;

export type EmailListProps = DeepReadonly<{
  controller: EmailController;
}>; 