import { useState } from 'react';

export function useFocusWithin() {
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  return [hasFocusWithin, setHasFocusWithin];
}
