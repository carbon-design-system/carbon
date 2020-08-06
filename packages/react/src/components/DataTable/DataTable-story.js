import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import mdx from './DataTable.mdx';
// import readme from './README.md';

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
  // This refers to the exports
  includeStories: ['Default'],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return 'Hello';
};

Default.story = {
  name: 'DataTable',
};

// export const Default = withReadme(readme, () =>
// require('./stories/default').default(props())
// );

// Default.story = {
// name: 'default',
// };

// export const WithToolbar = withReadme(readme, () =>
// require('./stories/with-toolbar').default(props())
// );

// WithToolbar.story = {
// name: 'with toolbar',
// };

// export const WithSorting = withReadme(readme, () =>
// require('./stories/with-sorting').default(props())
// );

// WithSorting.story = {
// name: 'with sorting',
// };

// export const WithSelection = withReadme(readme, () =>
// require('./stories/with-selection').default(props())
// );

// WithSelection.story = {
// name: 'with selection',
// };

// export const WithRadioButtonSelection = withReadme(readme, () =>
// require('./stories/with-selection--radio').default(props())
// );

// WithRadioButtonSelection.story = {
// name: 'with radio button selection',
// };

// export const WithExpansion = withReadme(readme, () =>
// require('./stories/with-expansion').default(props())
// );

// WithExpansion.story = {
// name: 'with expansion',
// };

// export const WithBatchExpansion = withReadme(readme, () =>
// require('./stories/with-batch-expansion').default(props())
// );

// WithBatchExpansion.story = {
// name: 'with batch expansion',
// };

// export const WithBatchActions = withReadme(readme, () =>
// require('./stories/with-batch-actions').default(props())
// );

// WithBatchActions.story = {
// name: 'with batch actions',
// };

// export const WithDynamicContent = withReadme(readme, () =>
// require('./stories/with-dynamic-content').default(props())
// );

// WithDynamicContent.story = {
// name: 'with dynamic content',
// };

// export const WithBooleanColumn = withReadme(readme, () =>
// require('./stories/with-boolean-column').default(props())
// );

// WithBooleanColumn.story = {
// name: 'with boolean column',
// };

// export const WithOptions = withReadme(readme, () =>
// require('./stories/with-options').default(props())
// );

// WithOptions.story = {
// name: 'with options',
// };

// export const WithOverflowMenu = withReadme(readme, () =>
// require('./stories/with-overflow-menu').default({
// ...props(),
// overflowMenuOnHover: boolean(
// 'Show overflow menu on hover (overflowMenuOnHover)',
// false
// ),
// })
// );

// WithOverflowMenu.story = {
// name: 'with overflow menu',
// };
