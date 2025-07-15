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

  readonly folders$: Observable<readonly Folder[]> = this.state$.pipe(
    map(state => state.folders),
    distinctUntilChanged()
  );

  readonly selectedFolder$: Observable<Folder | null> = this.state$.pipe(
    map(state => state.selectedFolderId),
    distinctUntilChanged(),
    map(id => this.state$.value.folders.find(f => f.id === id) ?? null)
  );

  readonly loading$: Observable<boolean> = this.state$.pipe(
    map(state => state.loading),
    distinctUntilChanged()
  );

  readonly error$: Observable<string | null> = this.state$.pipe(
    map(state => state.error),
    distinctUntilChanged()
  );

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