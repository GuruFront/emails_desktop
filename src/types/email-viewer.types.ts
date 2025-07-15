import type { EmailController } from '../controllers/EmailController';
import type { DeepReadonly } from './utils';

export type EmailViewerProps = DeepReadonly<{
  controller: EmailController;
  onDeleteEmail: (emailId: string) => void;
}>; 