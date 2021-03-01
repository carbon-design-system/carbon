/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  array,
  boolean,
  number,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import {
  unstable_PageSelector as PageSelector,
  unstable_Pagination as Pagination,
} from '../../../';

const props = () => ({
  disabled: boolean('Disable backward/forward buttons (disabled)', false),
  pagesUnknown: boolean('Total number of items unknown (pagesUnknown)', false),
  backwardText: text(
    'The description for the backward icon (backwardText)',
    'Previous page'
  ),
  forwardText: text(
    'The description for the forward icon (forwardText)',
    'Next page'
  ),
  pageSize: number('Number of items per page (pageSize)', 10),
  itemsPerPageText: text(
    'Label for `pageSizes` select UI (itemsPerPageText)',
    'Items per page:'
  ),
  onChange: action('onChange'),
});

export default {
  title: 'Experimental/unstable_Pagination',
  decorators: [
    withKnobs,
    (story) => <div style={{ width: '800px' }}>{story()}</div>,
  ],
};

export const WithAPageSelector = () => (
  <Pagination
    {...props()}
    totalItems={350}
    pageSizes={array('Choices of `pageSize` (pageSizes)', [10, 20, 30])}>
    {({ currentPage, onSetPage, totalPages }) => (
      <PageSelector
        currentPage={currentPage}
        id="select-1"
        onChange={(event) => onSetPage(event.target.value)}
        totalPages={totalPages}
      />
    )}
  </Pagination>
);

WithAPageSelector.storyName = 'with a page selector';

WithAPageSelector.parameters = {
  info: {
    propTables: [Pagination, PageSelector],
    text: `
        🚨 This component is *experimental* and may change. 🚨
        \`Pagination\` accepts a render prop \`children\`.
        This example wraps the \`children\` (\`PageSelector\`) in a function, allowing it to pass information back to the parent component.
        \`\`\`jsx
        {/**
          * Provide \`totalItems\` to \`Pagination\` when using the \`PageSelector\` child.
          * \`Pagination\` uses \`totalItems\` to calculate \`totalPages\`.
          * And then, \`PageSelector\` uses the calculated \`totalPages\` to accurately display page options.
          */}
        <Pagination
          totalItems={350}
          pageSizes={[10, 15, 20, 25]}
        >
          {/**
            * Below, \`children\` is a render prop, wrapped in a function.
            * - \`currentPage\` is used to display the current page.
            * - \`onSetPage\` is used to update the current page state in the parent component.
            * - \`totalPages\` is calculated using the \`totalItems\` value provided to the parent component, and then is displayed below.
            */}
          {({ currentPage, onSetPage, totalPages }) => (
            <PageSelector
              currentPage={currentPage}
              id="select-1"
              onChange={event => onSetPage(event.target.value)}
              totalPages={totalPages}
            />
          )}
        </Pagination>
        \`\`\`
      `,
  },
};

export const WithNoSizerChildInputOrChildSelector = () => (
  <Pagination {...props()} totalItems={350} />
);

WithNoSizerChildInputOrChildSelector.storyName =
  'with no sizer, child input, or child selector';

WithNoSizerChildInputOrChildSelector.parameters = {
  info: {
    text: `
      🚨 This component is *experimental* and may change. 🚨
      Without \`children\`, \`Pagination\` renders without a page selector.
    `,
  },
};
