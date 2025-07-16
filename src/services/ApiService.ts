import type { Email, EmailsJsonData } from '../types/email.types';
import type { Folder } from '../types/folder.types';
import { Observable, from } from 'rxjs';
import { delay, map, switchMap } from 'rxjs';

const DATA_URL = '../data/emails.json';

export class ApiService {
  getEmails(): Observable<readonly Email[]> {
    return from(fetch(DATA_URL)).pipe(
      switchMap((res): Promise<EmailsJsonData> => res.json()),
      map((data) => data.emails.map(e => ({ ...e, attachments: e.attachments ? [...e.attachments] : undefined }))),
      map(emails => [...emails].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
      delay(1000)
    );
  }

  getFolders(): Observable<readonly Folder[]> {
    return from(fetch(DATA_URL)).pipe(
      switchMap((res): Promise<EmailsJsonData> => res.json()),
      map((data) => data.folders),
      delay(1000)
    );
  }
} 