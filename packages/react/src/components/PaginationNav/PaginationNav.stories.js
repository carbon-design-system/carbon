/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PaginationNav from '../PaginationNav';
import './styles.scss';

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

Playground.args = {
  size: 'lg',
  loop: false,
  itemsShown: 10,
  page: 0,
  totalItems: 25,
  disableOverflow: false,
};

Playground.argTypes = {
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  loop: {
    control: {
      type: 'boolean',
    },
  },
  itemsShown: {
    control: {
      type: 'number',
    },
  },
  page: {
    control: {
      type: 'number',
    },
  },
  totalItems: {
    control: {
      type: 'number',
    },
  },
  disableOverflow: {
    control: {
      type: 'boolean',
    },
  },
};
