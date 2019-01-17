/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

const readmeURL = 'https://goo.gl/dq6CEK';

const props = () => ({
  short: boolean('Short variant (short)', false),
  shouldShowBorder: boolean('Table Border variant (shouldShowBorder)', true),
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
    withReadme(readme, require('./stories/with-toolbar').default),
    {
      info: {
        text: `
          DataTable with toolbar and filtering.

          You can find more detailed information surrounding usage of this component
          at the following url: ${readmeURL}
        `,
      },
    }
  )
  .add(
    'with sorting',
    withReadme(readme, require('./stories/with-sorting').default),
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
    withReadme(readme, require('./stories/with-selection').default),
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
    'with expansion',
    withReadme(readme, require('./stories/with-expansion').default),
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
    'with batch actions',
    withReadme(readme, require('./stories/with-batch-actions').default),
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
    withReadme(readme, require('./stories/with-dynamic-content').default),
    {
      info: {
        text: `
          Showcases DataTable behavior when rows are added to the component,
          and when cell data changes dynamically.
        `,
      },
    }
  );
