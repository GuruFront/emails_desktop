import { Email, EmailsJsonData } from '../types/email.types';
import { Folder } from '../types/folder.types';
import { Observable, from } from 'rxjs';
import { delay, map, switchMap } from 'rxjs';

const DATA_URL = '../data/emails.json';

export class ApiService {
  getEmails(): Observable<readonly Email[]> {
    return from(fetch(DATA_URL)).pipe(
      switchMap(res => res.json() as Promise<EmailsJsonData>),
      map((data) => data.emails),
      map(emails => [...emails].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
      delay(1000)
    );
  }

  getFolders(): Observable<readonly Folder[]> {
    return from(fetch(DATA_URL)).pipe(
      switchMap(res => res.json() as Promise<EmailsJsonData>),
      map((data) => data.folders),
      delay(1000)
    );
  }
} 