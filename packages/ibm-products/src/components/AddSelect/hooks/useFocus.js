/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useState, useEffect } from 'react';

const useFocus = (size) => {
  // the state should represent the location of the item in the array
  // make it '' initially so that it doesn't automatically focus the first item
  const [currentFocus, setCurrentFocus] = useState('');

  const handleKeyDown = useCallback(
    (e) => {
      const focus = currentFocus === '' ? 0 : currentFocus;
      if (e.keyCode === 40) {
        // Down arrow
        e.preventDefault();
        setCurrentFocus(focus === size - 1 ? 0 : focus + 1);
      } else if (e.keyCode === 38) {
        // Up arrow
        e.preventDefault();
        setCurrentFocus(focus === 0 ? size - 1 : focus - 1);
      }
    },
    [size, currentFocus, setCurrentFocus]
  );

  useEffect(() => {
    const el = document.querySelector('#add-select-focus');
    el.addEventListener('keydown', handleKeyDown, false);
    return () => {
      el.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus];
};

export default useFocus;
