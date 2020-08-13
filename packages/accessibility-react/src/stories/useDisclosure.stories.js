/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useDisclosure } from '../useDisclosure';

export default {
  title: 'Hooks/useDisclosure',
};

export const Default = () => {
  const [DisclosureButton, contentProps, state] = useDisclosure('question-1');

  return (
    <>
      <DisclosureButton>
        <dt>{state.isOpen ? '👇' : '👉'} Some question 1</dt>
      </DisclosureButton>
      <dd {...contentProps}>Some answer 1</dd>
    </>
  );
  return 'Default';
};
