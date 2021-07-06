/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { PaginationNav } from 'carbon-components-react';

const props = () => ({
  loop: false,
  page: 0,
  totalItems: 10,
  itemsShown: 10,
});

export default {
  title: 'Components/PaginationNav',
  decorators: [(story) => <div style={{ width: '800px' }}>{story()}</div>],

  parameters: {
    component: PaginationNav,
  },
};

export const _PaginationNav = () => <PaginationNav {...props()} />;
