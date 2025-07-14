import type { DeepReadonly } from './utils';
import type { Folder } from './folder.types';

export type Attachment = {
  id: string;
  name: string;
  size: number;
  type: string;
};

export type Email = {
  id: string;
  date: string;
  from: string;
  subject: string;
  content: string;
  isRead: boolean;
  isDeleted: boolean;
  folderId: string;
  attachments?: Attachment[];
};

export type EmailState = DeepReadonly<{
  emails: Email[];
  selectedEmailId: string | null;
  loading: boolean;
  error: string | null;
}>;

export type EmailsJsonData = DeepReadonly<{
  emails: Email[];
  folders: Folder[];
}>; 