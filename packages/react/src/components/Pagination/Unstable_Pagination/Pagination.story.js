/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  array,
  boolean,
  number,
  text,
  withKnobs,
} from '@storybook/addon-knobs';

import Unstable_Pagination from './Pagination';
import PageSelector from './PageSelector';

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

storiesOf('UNSTABLE Pagination', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => <div style={{ width: '800px' }}>{story()}</div>)
  .add(
    'with a page selector',
    () => (
      <Unstable_Pagination
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
      </Unstable_Pagination>
    ),
    {
      info: {
        propTables: [Unstable_Pagination, PageSelector],
        text: `
            🚨 This component is *experimental* and may change. 🚨
            \`Unstable_Pagination\` accepts a render prop \`children\`.
            This example wraps the \`children\` (\`PageSelector\`) in a function, allowing it to pass information back to the parent component.
            \`\`\`jsx
            {/** 
              * Provide \`totalItems\` to \`Unstable_Pagination\` when using the \`PageSelector\` child.
              * \`Unstable_Pagination\` uses \`totalItems\` to calculate \`totalPages\`.
              * And then, \`PageSelector\` uses the calculated \`totalPages\` to accurately display page options.
              */}
            <Unstable_Pagination
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
            </Unstable_Pagination>
            \`\`\`
          `,
      },
    }
  )
  .add(
    'with no sizer, child input, or child selector',
    () => <Unstable_Pagination {...props()} totalItems={350} />,
    {
      info: {
        text: `
          🚨 This component is *experimental* and may change. 🚨
          Without \`children\`, \`Unstable_Pagination\` renders without a page selector. 
        `,
      },
    }
  );
