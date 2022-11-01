/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PaginationNav from '../PaginationNav';

export default {
  title: 'Components/PaginationNav',
  component: PaginationNav,
  subcomponents: {},
  parameters: {},
};

export const Default = () => (
  <div style={{ width: '800px' }}>
    <PaginationNav itemsShown={10} totalItems={25} />
  </div>
);

export const Playground = (args) => (
  <div style={{ width: '800px' }}>
    <PaginationNav {...args} />
  </div>
);

Playground.argTypes = {
  loop: {
    defaultValue: false,
    control: {
      type: 'boolean',
    },
  },
  itemsShown: {
    control: {
      type: 'number',
    },
    defaultValue: 10,
  },
  page: {
    control: {
      type: 'number',
    },
    defaultValue: 0,
  },
  totalItems: {
    control: {
      type: 'number',
    },
    defaultValue: 25,
  },
};
