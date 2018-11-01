import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

const readmeURL = 'https://goo.gl/dq6CEK';

const props = () => ({
  short: boolean('Short variant (short)', false),
});

storiesOf('DataTable', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withReadme(
      readme,
      withInfo({
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
      })(() => require('./stories/default').default(props()))
    )
  )
  .add(
    'with toolbar',
    withReadme(
      readme,
      withInfo({
        text: `
        DataTable with toolbar and filtering.

        You can find more detailed information surrounding usage of this component
        at the following url: ${readmeURL}
      `,
      })(require('./stories/with-toolbar').default)
    )
  )
  .add(
    'with sorting',
    withReadme(
      readme,
      withInfo({
        text: `
        DataTable with sorting

        You can find more detailed information surrounding usage of this component
        at the following url: ${readmeURL}
      `,
      })(require('./stories/with-sorting').default)
    )
  )
  .add(
    'with selection',
    withReadme(
      readme,
      withInfo({
        text: `
        DataTable with selection

        You can find more detailed information surrounding usage of this component
        at the following url: ${readmeURL}
      `,
      })(require('./stories/with-selection').default)
    )
  )
  .add(
    'with expansion',
    withReadme(
      readme,
      withInfo({
        text: `
        DataTable with expansion

        You can find more detailed information surrounding usage of this component
        at the following url: ${readmeURL}
      `,
      })(require('./stories/with-expansion').default)
    )
  )
  .add(
    'with batch actions',
    withReadme(
      readme,
      withInfo({
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
      })(require('./stories/with-batch-actions').default)
    )
  )
  .add(
    'with dynamic content',
    withReadme(
      readme,
      withInfo({
        text: `
        Showcases DataTable behavior when rows are added to the component,
        and when cell data changes dynamically.
      `,
      })(require('./stories/with-dynamic-content').default)
    )
  );
