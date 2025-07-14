import type { DeepReadonly } from './utils';

export type EmailFilters = DeepReadonly<{
  folderId: string;
  searchQuery: string;
  sortBy: 'date';
}>; 