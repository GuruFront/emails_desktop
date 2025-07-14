import type { DeepReadonly } from './utils';

export type UIState = DeepReadonly<{
  loading: boolean;
  error: string | null;
  selectedEmailId: string | null;
  selectedFolderId: string;
}>; 