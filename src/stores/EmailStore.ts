import { BehaviorSubject, Observable } from 'rxjs';
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

  readonly emails$: Observable<readonly Email[]> = this.state$.pipe(
    map(state => state.emails),
    distinctUntilChanged(shallowEmailsEqual)
  );

  readonly selectedEmail$: Observable<Email | null> = this.state$.pipe(
    map(state => {
      const emailId = state.selectedEmailId;
      return emailId ? state.emails.find(e => e.id === emailId) ?? null : null;
    }),
    distinctUntilChanged((a, b) =>
      a?.id === b?.id &&
      a?.isRead === b?.isRead &&
      a?.isDeleted === b?.isDeleted
    )
  );

  readonly loading$: Observable<boolean> = this.state$.pipe(
    map(state => state.loading),
    distinctUntilChanged()
  );

  readonly error$: Observable<string | null> = this.state$.pipe(
    map(state => state.error),
    distinctUntilChanged()
  );

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