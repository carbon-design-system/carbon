/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useMemo, useState } from 'react';

export const useComposedModalState = (open: boolean | undefined) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!open);
  const [wasOpen, setWasOpen] = useState<boolean>(!!open);

  // Keep track of modal open/close state
  useEffect(() => {
    if (open !== wasOpen) {
      setIsOpen(!!open);
      setWasOpen(!!open);
    }
  }, [open, wasOpen]);

  return useMemo(() => [isOpen, setIsOpen] as const, [isOpen]);
};
