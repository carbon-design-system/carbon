/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
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
  backwardText: text(
    'The description for the backward icon (backwardText)',
    'Previous'
  ),
  forwardText: text(
    'The description for the forward icon (forwardText)',
    'Next'
  ),
  itemLabel: text(
    'The label that appears before the page number for screen readers (itemLabel)',
    'Page'
  ),
  onChange: action('onChange'),
});

storiesOf('PaginationNav', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ width: '800px' }}>{story()}</div>)
  .add('PaginationNav', () => <PaginationNav {...props()} />, {
    info: {
      text: `
        Pagination Nav is a group of pagination buttons.
          `,
    },
  });
