import type { EmailController } from '../controllers/EmailController';

export type EmailViewerProps = {
  readonly controller: EmailController;
  readonly onDeleteEmail: (emailId: string) => void;
}; 