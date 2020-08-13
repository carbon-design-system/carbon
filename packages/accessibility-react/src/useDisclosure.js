/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';

export function useDisclosure(id, initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const state = {
    isOpen,
  };
  const contentProps = {
    id,
  };

  function DisclosureButton({ children }) {
    return (
      <button
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setIsOpen(!isOpen)}>
        {children}
      </button>
    );
  }

  return [DisclosureButton, contentProps, state, setIsOpen];
}
