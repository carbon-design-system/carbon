/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

const readmeURL = 'https://goo.gl/dq6CEK';

const props = () => ({
  useZebraStyles: boolean('Zebra row styles (useZebraStyles)', false),
  size: select(
    'Row height (size)',
    { compact: 'compact', short: 'short', tall: 'tall', none: null },
    null
  ),
});

storiesOf('DataTable', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withReadme(readme, () => require('./stories/default').default(props())),
    {
      info: {
        /* eslint-disable no-useless-escape */
        text: `
          Data Tables are used to represent a collection of resources, displaying a
          subset of their fields in columns, or headers. The \`DataTable\` component
          that we export from Carbon requires two props to be passed in: \`rows\`
          and \`headers\`.
          You can find more detailed information surrounding usage of this component
          at the following url: ${readmeURL}
        `,
        /* eslint-enable no-useless-escape */
      },
    }
  )
  .add(
    'with toolbar',
    withReadme(readme, () =>
      require('./stories/with-toolbar').default(props())
    ),
    {
      info: {
        text: `
        DataTable with action menu and filtering.

        You can find more detailed information surrounding usage of this component
        at the following url: ${readmeURL}
      `,
      },
    }
  )
  .add(
    'with sorting',
    withReadme(readme, () =>
      require('./stories/with-sorting').default(props())
    ),
    {
      info: {
        text: `
        DataTable with sorting

        You can find more detailed information surrounding usage of this component
        at the following url: ${readmeURL}
      `,
      },
    }
  )
  .add(
    'with selection',
    withReadme(readme, () =>
      require('./stories/with-selection').default(props())
    ),
    {
      info: {
        text: `
        DataTable with selection

        You can find more detailed information surrounding usage of this component
        at the following url: ${readmeURL}
      `,
      },
    }
  )
  .add(
    'with radio button selection',
    withReadme(readme, () =>
      require('./stories/with-selection--radio').default(props())
    ),
    {
      info: {
        text: `
        DataTable with radio button selection

        You can find more detailed information surrounding usage of this component
        at the following url: ${readmeURL}
      `,
      },
    }
  )
  .add(
    'with expansion',
    withReadme(readme, () =>
      require('./stories/with-expansion').default(props())
    ),
    {
      info: {
        text: `
          DataTable with expansion

          You can find more detailed information surrounding usage of this component
          at the following url: ${readmeURL}
        `,
      },
    }
  )
  .add(
    'with batch expansion',
    withReadme(readme, () =>
      require('./stories/with-batch-expansion').default(props())
    ),
    {
      info: {
        text: `
          DataTable with batch expansion

          You can find more detailed information surrounding usage of this component
          at the following url: ${readmeURL}
        `,
      },
    }
  )
  .add(
    'with batch actions',
    withReadme(readme, () =>
      require('./stories/with-batch-actions').default(props())
    ),
    {
      info: {
        text: `
          Uses <TableToolbar> alongside <TableBatchActions> and <TableBatchAction>
          to create the toolbar and placeholder for where the batch action menu will
          be displayed.

          You can use the \`getBatchActionProps\` prop getter on the
          <TableBatchActions> component to have it wire up the ghost menu for you.

          Individual <TableBatchAction> components take in any kind of event handler
          prop that you would expect to use, like \`onClick\`. You can use these
          alongside the \`selectedRows\` property in your \`render\` prop function
          to pass along this info to your batch action handler.

          You can find more detailed information surrounding usage of this component
          at the following url: ${readmeURL}
        `,
      },
    }
  )
  .add(
    'with dynamic content',
    withReadme(readme, () =>
      require('./stories/with-dynamic-content').default(props())
    ),
    {
      info: {
        text: `
        Showcases DataTable behavior when rows are added to the component,
        and when cell data changes dynamically.
      `,
      },
    }
  )
  .add(
    'with boolean column',
    withReadme(readme, () =>
      require('./stories/with-boolean-column').default(props())
    ),
    {
      info: {
        text: `
        DataTable with toolbar and filtering with column has boolean value.
      `,
      },
    }
  )
  .add(
    'with options',
    withReadme(readme, () =>
      require('./stories/with-options').default(props())
    ),
    {
      info: {
        text: `
        DataTable with options like disabled, isSelected, isExpanded etc.

        You can find more detailed information surrounding usage of this component
        at the following url: ${readmeURL}
      `,
      },
    }
  );
