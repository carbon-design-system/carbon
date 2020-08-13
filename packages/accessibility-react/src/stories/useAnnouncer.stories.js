/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useAnnouncer } from '../useAnnouncer';

export default {
  title: 'Hooks/useAnnouncer',
};

export const Default = () => {
  const announce = useAnnouncer();

  return (
    <>
      <button onClick={() => announce('polite', 'This is a polite message')}>
        Send polite message
      </button>
      <button
        onClick={() => announce('assertive', 'This is an assertive message')}>
        Send assertive message
      </button>
    </>
  );
};
