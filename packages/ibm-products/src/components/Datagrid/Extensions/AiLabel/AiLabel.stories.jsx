/* eslint-disable react-hooks/exhaustive-deps */
//cspell: disable
/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Edit, TrashCan } from '@carbon/react/icons';
import { usePrefix } from '@carbon/react';
import { action } from 'storybook/actions';
import {
  Datagrid,
  useDatagrid,
  useExpandedRow,
  useSelectRows,
  useSortableColumns,
} from '../../index';
import styles from '../../_storybook-styles.scss?inline';
import { DatagridActions } from '../../utils/DatagridActions';
import { makeData } from '../../utils/makeData';
import { ARG_TYPES } from '../../utils/getArgTypes';
import { StoryDocsPage } from '../../../../global/js/utils/StoryDocsPage';
import { ExampleAILabel } from '../../utils/ExampleAILabel';

export default {
  title: 'Deprecated/Datagrid/AILabel',
  component: Datagrid,
  tags: ['autodocs'],
  parameters: {
    chromatic: { disableSnapshot: true },
    styles,
    docs: {
      page: () => (
        <StoryDocsPage
          omitCodedExample
          blocks={[
            {
              description:
                "A Carbon AI Label can be used within the Datagrid for both column headers and rows. To include a column header AI Label, include a `aiLabel` property within your column definition and include the AILabel component as it's own custom component. <br/> The `slug` property has been deprecated. It will only be supported for a limited time in future. Please use `aiLabel` property instead.",
              source: {
                code: `
{
  Header: 'Visits',
  accessor: 'visits',
  aiLabel: <ExampleAILabel />,
}
`,
              },
            },
            {
              description: 'or used directly from the AILabel component itself',
              source: {
                code: `
{
  Header: 'Visits',
  accessor: 'visits',
  aiLabel: (
    <AILabel className="ai-label-container" autoAlign={false} align="bottom-right">
      <AILabelContent>
        ...
        ...
      </AILabelContent>
    </AILabel>
  ),
}
`,
              },
            },
            {
              description:
                'To include a AILabel on the row level, include a `aiLabel` property in your row data with the same structure as outlined above.',
            },
          ]}
        />
      ),
    },
    layout: 'fullscreen',
  },
  argTypes: {
    featureFlags: {
      table: {
        disable: true,
      },
    },
  },
  excludeStories: ['ExampleAILabel'],
};

const getDefaultHeader = (rowAiLabel, align) => [
  {
    Header: 'Row Index',
    accessor: (row, i) => i,
    sticky: 'left',
    id: 'rowIndex', // id is required when accessor is a function.
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Age',
    accessor: 'age',
    width: 60,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    width: 120,
    aiLabel: !rowAiLabel && <ExampleAILabel align={align} />,
  },
  {
    Header: 'Someone 1',
    accessor: 'someone1',
    aiLabel: !rowAiLabel && <ExampleAILabel align={align} />,
    width: 200,
  },
  {
    Header: 'Someone 2',
    accessor: 'someone2',
  },
  {
    Header: 'Someone 3',
    accessor: 'someone3',
  },
  {
    Header: 'Someone 4',
    accessor: 'someone4',
  },
  {
    Header: 'Someone 5',
    accessor: 'someone5',
  },
  {
    Header: 'Someone 6',
    accessor: 'someone6',
  },
  {
    Header: 'Someone 7',
    accessor: 'someone7',
  },
  {
    Header: 'Someone 8',
    accessor: 'someone8',
  },
  {
    Header: 'Someone 9',
    accessor: 'someone9',
  },
  {
    Header: 'Someone 10',
    accessor: 'someone10',
  },
];

const sharedDatagridProps = {
  emptyStateTitle: 'Empty state title',
  emptyStateDescription: 'Description text explaining why table is empty',
  emptyStateSize: 'lg',
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  rowSize: 'lg',
  rowSizes: [
    {
      value: 'xl',
      labelText: 'Extra large',
    },
    {
      value: 'lg',
      labelText: 'Large',
    },
    {
      value: 'md',
      labelText: 'Medium',
    },
    {
      value: 'xs',
      labelText: 'Small',
    },
  ],
  onRowSizeChange: (value) => {
    console.log('row size changed to: ', value);
  },
  rowActions: [
    {
      id: 'edit',
      itemText: 'Edit',
      icon: Edit,
      onClick: action('Clicked row action: edit'),
    },

    {
      id: 'delete',
      itemText: 'Delete',
      icon: TrashCan,
      isDelete: true,
      onClick: action('Clicked row action: delete'),
    },
  ],
};

const controlProps = {
  gridTitle: sharedDatagridProps.gridTitle,
  gridDescription: sharedDatagridProps.gridDescription,
  useDenseHeader: sharedDatagridProps.useDenseHeader,
  rowSize: sharedDatagridProps.rowSize,
  rowSizes: sharedDatagridProps.rowSizes,
  onRowSizeChange: sharedDatagridProps.onRowSizeChange,
};

const ExpansionRenderer = ({ row }) => {
  const prefix = usePrefix();
  return (
    <div className={`${prefix}__test-class-with-prefix-hook`}>
      Content for row index: {row.id}
    </div>
  );
};

const GridWithAILabelColumnHeader = ({
  rowAiLabel,
  rowAiLabelAlign,
  withSorting,
  withSelect,
  withExpansion,
  ...args
}) => {
  const columns = React.useMemo(
    () => getDefaultHeader(rowAiLabel, rowAiLabelAlign),
    []
  );
  const [data] = useState(
    makeData(10, 2, { enableAIRow: rowAiLabel, aiLabelAlign: rowAiLabelAlign })
  );
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      ExpandedRowContentComponent: ExpansionRenderer,
      ...args.defaultGridProps,
    },
    withSorting ? useSortableColumns : '',
    withSelect ? useSelectRows : '',
    withExpansion ? useExpandedRow : ''
  );

  return <Datagrid datagridState={datagridState} />;
};

const GridWithAILabelColumnHeaderWrapper = ({
  rowAiLabel,
  rowAiLabelAlign,
  withSorting,
  withSelect,
  withExpansion,
  ...args
}) => {
  return (
    <GridWithAILabelColumnHeader
      defaultGridProps={{ ...args }}
      withSorting={withSorting}
      rowAiLabel={rowAiLabel}
      rowAiLabelAlign={rowAiLabelAlign}
      withSelect={withSelect}
      withExpansion={withExpansion}
    />
  );
};

const aiLabelColumnHeaderStoryName = 'Column AILabel';
export const AILabelColumnHeaderStory = GridWithAILabelColumnHeaderWrapper.bind(
  {}
);
AILabelColumnHeaderStory.storyName = aiLabelColumnHeaderStoryName;
AILabelColumnHeaderStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  rowSize: ARG_TYPES.rowSize,
  rowSizes: ARG_TYPES.rowSizes,
  onRowSizeChange: ARG_TYPES.onRowSizeChange,
  expanderButtonTitleExpanded: 'Collapse row',
  expanderButtonTitleCollapsed: 'Expand row',
};
AILabelColumnHeaderStory.args = {
  ...controlProps,
};

const aiLabelSortableColumnHeaderStoryName = 'Column AILabel sort';
export const AILabelSortableColumnHeaderStory =
  GridWithAILabelColumnHeaderWrapper.bind({});
AILabelSortableColumnHeaderStory.storyName =
  aiLabelSortableColumnHeaderStoryName;
AILabelSortableColumnHeaderStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  rowSize: ARG_TYPES.rowSize,
  rowSizes: ARG_TYPES.rowSizes,
  onRowSizeChange: ARG_TYPES.onRowSizeChange,
  expanderButtonTitleExpanded: 'Collapse row',
  expanderButtonTitleCollapsed: 'Expand row',
};
AILabelSortableColumnHeaderStory.args = {
  ...controlProps,
  withSorting: true,
};

const aiLabelRowStoryName = 'Row AILabel';
export const AILabelRowStory = GridWithAILabelColumnHeaderWrapper.bind({});
AILabelRowStory.storyName = aiLabelRowStoryName;
AILabelRowStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  rowSize: ARG_TYPES.rowSize,
  rowSizes: ARG_TYPES.rowSizes,
  onRowSizeChange: ARG_TYPES.onRowSizeChange,
  expanderButtonTitleExpanded: 'Collapse row',
  expanderButtonTitleCollapsed: 'Expand row',
};
AILabelRowStory.args = {
  ...controlProps,
  rowAiLabel: true,
  rowAiLabelAlign: 'right',
};

const aiLabelRowSelectionStoryName = 'Row AILabel with selection';
export const AILabelRowSelectionStory = GridWithAILabelColumnHeaderWrapper.bind(
  {}
);
AILabelRowSelectionStory.storyName = aiLabelRowSelectionStoryName;
AILabelRowSelectionStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  rowSize: ARG_TYPES.rowSize,
  rowSizes: ARG_TYPES.rowSizes,
  onRowSizeChange: ARG_TYPES.onRowSizeChange,
  expanderButtonTitleExpanded: 'Collapse row',
  expanderButtonTitleCollapsed: 'Expand row',
};
AILabelRowSelectionStory.args = {
  ...controlProps,
  rowAiLabel: true,
  rowAiLabelAlign: 'right',
  withSelect: true,
};

const aiLabelRowSelectionAndExpandStoryName =
  'Row AILabel with selection and expansion';
export const AILabelRowSelectionAndExpandStory =
  GridWithAILabelColumnHeaderWrapper.bind({});
AILabelRowSelectionAndExpandStory.storyName =
  aiLabelRowSelectionAndExpandStoryName;
AILabelRowSelectionAndExpandStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  rowSize: ARG_TYPES.rowSize,
  rowSizes: ARG_TYPES.rowSizes,
  onRowSizeChange: ARG_TYPES.onRowSizeChange,
  expanderButtonTitleExpanded: 'Collapse row',
  expanderButtonTitleCollapsed: 'Expand row',
};
AILabelRowSelectionAndExpandStory.args = {
  ...controlProps,
  rowAiLabel: true,
  rowAiLabelAlign: 'right',
  withSelect: true,
  withExpansion: true,
};
