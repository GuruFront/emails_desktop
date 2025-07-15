import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs';
import { Folder, FolderState } from '../types/folder.types';

export class FolderStore {
  private readonly state$ = new BehaviorSubject<FolderState>({
    folders: [],
    selectedFolderId: 'inbox',
    loading: false,
    error: null
  });

  readonly folders$ = this.state$.pipe(
    map(state => state.folders),
    distinctUntilChanged()
  ) as Observable<readonly Folder[]>;

  readonly selectedFolder$ = this.state$.pipe(
    map(state => state.selectedFolderId),
    distinctUntilChanged(),
    map(id => this.state$.value.folders.find(f => f.id === id) ?? null)
  ) as Observable<Folder | null>;

  readonly loading$ = this.state$.pipe(
    map(state => state.loading),
    distinctUntilChanged()
  ) as Observable<boolean>;

  readonly error$ = this.state$.pipe(
    map(state => state.error),
    distinctUntilChanged()
  ) as Observable<string | null>;

  setFolders(folders: readonly Folder[]): void {
    this.updateState({ folders });
  }

  selectFolder(folderId: string): void {
    this.updateState({ selectedFolderId: folderId });
  }

  setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  setError(error: string | null): void {
    this.updateState({ error });
  }

  private updateState(updates: Readonly<Partial<FolderState>>): void {
    const currentState = this.state$.value;
    this.state$.next({ ...currentState, ...updates });
  }
} 