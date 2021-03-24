import { useState } from 'react';

function useFocusWithin() {
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  return [hasFocusWithin, setHasFocusWithin];
}

export default useFocusWithin;
