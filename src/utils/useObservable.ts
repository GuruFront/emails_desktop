import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export function useObservable<T>(observable$: Readonly<Observable<T>>, initial?: T): T | undefined {
  const [value, setValue] = useState<T | undefined>(initial);

  useEffect(() => {
    const sub = observable$.subscribe(setValue);
    return () => sub.unsubscribe();
  }, [observable$]);

  return value;
} 