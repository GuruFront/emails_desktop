import { BehaviorSubject, Observable } from 'rxjs';
import { UIState } from '../types/ui.types';

const initialState: UIState = {
  loading: false,
  error: null,
  selectedEmailId: null,
  selectedFolderId: 'inbox',
};

export class UIController {
  private readonly state$ = new BehaviorSubject<UIState>(initialState);

  get ui$(): Observable<UIState> {
    return this.state$.asObservable();
  }

  setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  setError(error: string | null): void {
    this.updateState({ error });
  }

  selectEmail(emailId: string | null): void {
    this.updateState({ selectedEmailId: emailId });
  }

  selectFolder(folderId: string): void {
    this.updateState({ selectedFolderId: folderId });
  }

  private updateState(updates: Readonly<Partial<UIState>>): void {
    const current = this.state$.value;
    this.state$.next({ ...current, ...updates });
  }
} 