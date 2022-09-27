/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import PaginationNav from '../PaginationNav';

const props = () => ({
  loop: boolean(
    'Allow user to loop through the items when reaching first / last (loop)',
    false
  ),
  page: number('The current page (page)', 0),
  totalItems: number('Total number of items (totalItems)', 10),
  itemsShown: number(
    'Number of items to be shown (minimum 4) (itemsShown)',
    10
  ),
  onChange: action('onChange'),
});

export default {
  title: 'Components/PaginationNav',
  component: PaginationNav,
  decorators: [
    withKnobs,
    (story) => <div style={{ width: '800px' }}>{story()}</div>,
  ],
};

export const Default = () => <PaginationNav {...props()} />;
