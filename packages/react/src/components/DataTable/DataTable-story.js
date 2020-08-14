import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import readme from './README.md';
import DataTable, {
  Table,
  TableActionList,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
} from '../DataTable';

const readmeURL = 'https://bit.ly/2Z9PGsC';

const props = () => ({
  useZebraStyles: boolean('Zebra row styles (useZebraStyles)', false),
  size: select(
    'Row height (size)',
    { compact: 'compact', short: 'short', tall: 'tall', none: null },
    null
  ),
  stickyHeader: boolean('Sticky header (experimental)', false),
});

export default {
  title: 'DataTable',
  decorators: [withKnobs],

  parameters: {
    component: DataTable,

    subcomponents: {
      Table,
      TableActionList,
      TableBatchAction,
      TableBatchActions,
      TableBody,
      TableCell,
      TableContainer,
      TableExpandHeader,
      TableExpandRow,
      TableExpandedRow,
      TableHead,
      TableHeader,
      TableRow,
      TableSelectAll,
      TableSelectRow,
      TableToolbar,
      TableToolbarAction,
      TableToolbarContent,
      TableToolbarSearch,
      TableToolbarMenu,
    },
  },
};

export const Default = withReadme(readme, () =>
  require('./stories/default').default(props())
);

Default.storyName = 'default';

Default.parameters = {
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
};

export const WithToolbar = withReadme(readme, () =>
  require('./stories/with-toolbar').default(props())
);

WithToolbar.storyName = 'with toolbar';

WithToolbar.parameters = {
  info: {
    text: `
    DataTable with action menu and filtering.

    You can find more detailed information surrounding usage of this component
    at the following url: ${readmeURL}
  `,
  },
};

export const WithSorting = withReadme(readme, () =>
  require('./stories/with-sorting').default(props())
);

WithSorting.storyName = 'with sorting';

WithSorting.parameters = {
  info: {
    text: `
    DataTable with sorting

    You can find more detailed information surrounding usage of this component
    at the following url: ${readmeURL}
  `,
  },
};

export const WithSelection = withReadme(readme, () =>
  require('./stories/with-selection').default(props())
);

WithSelection.storyName = 'with selection';

WithSelection.parameters = {
  info: {
    text: `
    DataTable with selection

    You can find more detailed information surrounding usage of this component
    at the following url: ${readmeURL}
  `,
  },
};

export const WithRadioButtonSelection = withReadme(readme, () =>
  require('./stories/with-selection--radio').default(props())
);

WithRadioButtonSelection.storyName = 'with radio button selection';

WithRadioButtonSelection.parameters = {
  info: {
    text: `
    DataTable with radio button selection

    You can find more detailed information surrounding usage of this component
    at the following url: ${readmeURL}
  `,
  },
};

export const WithExpansion = withReadme(readme, () =>
  require('./stories/with-expansion').default(props())
);

WithExpansion.storyName = 'with expansion';

WithExpansion.parameters = {
  info: {
    text: `
      DataTable with expansion

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
  },
};

export const WithBatchExpansion = withReadme(readme, () =>
  require('./stories/with-batch-expansion').default(props())
);

WithBatchExpansion.storyName = 'with batch expansion';

WithBatchExpansion.parameters = {
  info: {
    text: `
      DataTable with batch expansion

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
  },
};

export const WithBatchActions = withReadme(readme, () =>
  require('./stories/with-batch-actions').default(props())
);

WithBatchActions.storyName = 'with batch actions';

WithBatchActions.parameters = {
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
};

export const WithDynamicContent = withReadme(readme, () =>
  require('./stories/with-dynamic-content').default(props())
);

WithDynamicContent.storyName = 'with dynamic content';

WithDynamicContent.parameters = {
  info: {
    text: `
    Showcases DataTable behavior when rows are added to the component,
    and when cell data changes dynamically.
  `,
  },
};

export const WithBooleanColumn = withReadme(readme, () =>
  require('./stories/with-boolean-column').default(props())
);

WithBooleanColumn.storyName = 'with boolean column';

WithBooleanColumn.parameters = {
  info: {
    text: `
    DataTable with toolbar and filtering with column has boolean value.
  `,
  },
};

export const WithOptions = withReadme(readme, () =>
  require('./stories/with-options').default(props())
);

WithOptions.storyName = 'with options';

WithOptions.parameters = {
  info: {
    text: `
    DataTable with options like disabled, isSelected, isExpanded etc.

    You can find more detailed information surrounding usage of this component
    at the following url: ${readmeURL}
  `,
  },
};

export const WithOverflowMenu = withReadme(readme, () =>
  require('./stories/with-overflow-menu').default({
    ...props(),
    overflowMenuOnHover: boolean(
      'Show overflow menu on hover (overflowMenuOnHover)',
      false
    ),
  })
);

WithOverflowMenu.storyName = 'with overflow menu';

WithOverflowMenu.parameters = {
  info: {
    text: `
  DataTable with Overflow menus added.

  You can find more detailed information surrounding usage of this component
  at the following url: ${readmeURL}
`,
  },
};
