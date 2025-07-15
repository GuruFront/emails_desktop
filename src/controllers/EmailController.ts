import { EmailStore } from '../stores/EmailStore';
import { ApiService } from '../services/ApiService';
import type { Email } from '../types/email.types';
import type { EmailFilters } from '../types/rxjs.types';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, tap, catchError, finalize } from 'rxjs';

export class EmailController {
  private readonly filters$ = new BehaviorSubject<EmailFilters>({
    folderId: '',
    searchQuery: '',
    sortBy: 'date'
  });

  private readonly _emails$: Observable<readonly Email[]>;

  constructor(
    private readonly emailStore: EmailStore,
    private readonly apiService: ApiService
  ) {
    this._emails$ = combineLatest([
      this.filters$,
      this.emailStore.emails$
    ]).pipe(
      map(([filters, emails]) => this.filterAndSortEmails(emails, filters))
    );
  }

  get emails$(): Observable<readonly Email[]> {
    return this._emails$;
  }

  get loading$(): Observable<boolean> {
    return this.emailStore.loading$;
  }

  get selectedEmail$(): Observable<Email | null> {
    return this.emailStore.selectedEmail$;
  }

  get error$(): Observable<string | null> {
    return this.emailStore.error$;
  }

  loadEmails(): void {
    this.emailStore.setLoading(true);
    this.apiService.getEmails().pipe(
      tap(emails => this.emailStore.setEmails(emails)),
      catchError(error => {
        this.emailStore.setError(error.message);
        return of([]);
      }),
      finalize(() => this.emailStore.setLoading(false))
    ).subscribe();
  }

  selectEmail(emailId: string): void {
    this.emailStore.selectEmail(emailId);
  }

  updateFilters(filters: Readonly<Partial<EmailFilters>>): void {
    this.filters$.next({ ...this.filters$.value, ...filters });
  }

  markAsRead(emailId: string): void {
    this.emailStore.updateEmail(emailId, { isRead: true });
  }

  markAsUnread(emailId: string): void {
    this.emailStore.updateEmail(emailId, { isRead: false });
  }

  deleteEmail(emailId: string): void {
    this.emailStore.removeEmail(emailId);
  }

  private filterAndSortEmails(emails: readonly Email[], filters: Readonly<EmailFilters>): readonly Email[] {
    return emails
      .filter(email => {
        if (filters.folderId === 'trash') return email.folderId === 'trash';
        return !email.isDeleted && (!filters.folderId || email.folderId === filters.folderId);
      })
      .filter(email =>
        !filters.searchQuery ||
        email.subject.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        email.from.toLowerCase().includes(filters.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (filters.sortBy === 'date') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });
  }
} 