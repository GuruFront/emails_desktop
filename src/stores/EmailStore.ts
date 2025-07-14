import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs';
import { Email, EmailState } from '../types/email.types';

function shallowEmailsEqual(a: readonly Email[], b: readonly Email[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (
      a[i].id !== b[i].id ||
      a[i].isRead !== b[i].isRead ||
      a[i].isDeleted !== b[i].isDeleted
    ) {
      return false;
    }
  }
  return true;
}

export class EmailStore {
  private readonly state$ = new BehaviorSubject<EmailState>({
    emails: [],
    selectedEmailId: null,
    loading: false,
    error: null
  });

  readonly emails$ = this.state$.pipe(
    map(state => state.emails),
    distinctUntilChanged(shallowEmailsEqual)
  ) as import('rxjs').Observable<readonly Email[]>;

  readonly selectedEmail$ = this.state$.pipe(
    map(state => {
      const emailId = state.selectedEmailId;
      return emailId ? state.emails.find(e => e.id === emailId) ?? null : null;
    }),
    distinctUntilChanged((a, b) =>
      a?.id === b?.id &&
      a?.isRead === b?.isRead &&
      a?.isDeleted === b?.isDeleted
    )
  ) as import('rxjs').Observable<Email | null>;

  readonly loading$ = this.state$.pipe(
    map(state => state.loading),
    distinctUntilChanged()
  ) as import('rxjs').Observable<boolean>;

  readonly error$ = this.state$.pipe(
    map(state => state.error),
    distinctUntilChanged()
  ) as import('rxjs').Observable<string | null>;

  setEmails(emails: readonly Email[]): void {
    this.updateState({ emails });
  }

  addEmail(email: Readonly<Email>): void {
    const currentEmails = this.state$.value.emails;
    this.updateState({ emails: [email, ...currentEmails] });
  }

  updateEmail(emailId: string, updates: Readonly<Partial<Email>>): void {
    const currentEmails = this.state$.value.emails;
    const updatedEmails = currentEmails.map(email =>
      email.id === emailId ? { ...email, ...updates } : email
    );
    this.updateState({ emails: updatedEmails });
  }

  removeEmail(emailId: string): void {
    const currentEmails = this.state$.value.emails;
    const filteredEmails = currentEmails.filter(email => email.id !== emailId);
    this.updateState({ emails: filteredEmails });
  }

  selectEmail(emailId: string): void {
    this.updateState({ selectedEmailId: emailId });
  }

  clearSelection(): void {
    this.updateState({ selectedEmailId: null });
  }

  setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  setError(error: string | null): void {
    this.updateState({ error });
  }

  private updateState(updates: Readonly<Partial<EmailState>>): void {
    const currentState = this.state$.value;
    this.state$.next({ ...currentState, ...updates });
  }
} 