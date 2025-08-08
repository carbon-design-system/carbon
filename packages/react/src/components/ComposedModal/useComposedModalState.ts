/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

export interface ComposedModalState {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  wasOpen: boolean;
  setWasOpen: Dispatch<SetStateAction<boolean>>;
}

export const useComposedModalState = (
  open: boolean | undefined
): ComposedModalState => {
  const [isOpen, setIsOpen] = useState<boolean>(!!open);
  const [wasOpen, setWasOpen] = useState<boolean>(!!open);

  useEffect(() => {
    if (open !== wasOpen) {
      setIsOpen(!!open);
      setWasOpen(!!open);
    }
  }, [open, wasOpen]);

  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      wasOpen,
      setWasOpen,
    }),
    [open, isOpen, wasOpen]
  );
};
