import { FolderStore } from '../stores/FolderStore';
import { ApiService } from '../services/ApiService';
import { Folder } from '../types/folder.types';
import { of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs';

export class FolderController {
  constructor(
    private readonly folderStore: FolderStore,
    private readonly apiService: ApiService
  ) {}

  get folders$(): Observable<readonly Folder[]> {
    return this.folderStore.folders$;
  }

  get selectedFolder$(): Observable<Folder | null> {
    return this.folderStore.selectedFolder$;
  }

  get loading$(): Observable<boolean> {
    return this.folderStore.loading$;
  }

  get error$(): Observable<string | null> {
    return this.folderStore.error$;
  }

  loadFolders(): void {
    this.folderStore.setLoading(true);
    this.apiService.getFolders().pipe(
      catchError((err: Error) => {
        this.folderStore.setError(err.message);
        return of([]);
      }),
      finalize(() => this.folderStore.setLoading(false))
    ).subscribe({
      next: (folders: readonly Folder[]) => {
        this.folderStore.setFolders(folders);
      }
    });
  }

  selectFolder(folderId: string): void {
    this.folderStore.selectFolder(folderId);
  }
} 