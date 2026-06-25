/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Edit, TrashCan, Add } from '@carbon/react/icons';
import { action } from 'storybook/actions';
import {
  Datagrid,
  useDatagrid,
  useColumnRightAlign,
  useColumnCenterAlign,
  useOnRowClick,
  useSelectRows,
} from '../../index';
import styles from '../../_storybook-styles.scss?inline';
// import mdx from '../../Datagrid.mdx';
import { DatagridActions } from '../../utils/DatagridActions';
import { DatagridPagination } from '../../utils/DatagridPagination';
import { makeData } from '../../utils/makeData';
import { ARG_TYPES } from '../../utils/getArgTypes';
import { Link } from '@carbon/react';
import { pkg } from '../../../../settings';
import cx from 'classnames';
import { SidePanel } from '../../../SidePanel';
import { StoryDocsPage } from '../../../../global/js/utils/StoryDocsPage';

export default {
  title: 'Deprecated/Datagrid/ClickableRow',
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
              title: 'Row click',
              description: `Datagrid supports adding a click event on an entire row with the use of the \`useOnRowClick\` hook.
- Include the \`useOnRowClick\` hook
- Add the \`onRowClick\` property, this is a callback function that will be called when a row is clicked. It will give back the row and the click event.
          `,
              source: {
                code: `
const datagridState = useDatagrid(
  {
    columns,
    data,
    onRowClick: (row, event) => {
      ...
    },
  },
  useOnRowClick
);

return <Datagrid datagridState={datagridState} />;
            `,
              },
            },
          ]}
        />
      ),
    },
    layout: 'fullscreen',
  },
};

const blockClass = `${pkg.prefix}--datagrid`;
const storyBlockClass = `${pkg.prefix}--datagrid-story`;
const defaultHeader = [
  {
    Header: 'Row index',
    accessor: (row, i) => i,
    sticky: 'left',
    id: 'rowIndex', // id is required when accessor is a function.
  },
  {
    Header: 'First name',
    accessor: 'firstName',
  },
  {
    Header: 'Last name',
    accessor: 'lastName',
  },
  {
    Header: 'Doc link',
    accessor: 'doc_link',
    Cell: ({ cell }) => {
      return (
        <Link
          className={`${storyBlockClass}__custom-cell-wrapper`}
          href={cell?.value?.href}
        >
          {cell?.value?.text}
        </Link>
      );
    },
    width: 200,
  },
  {
    Header: 'Age',
    accessor: 'age',
    width: 120,
    rightAlignedColumn: true,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    width: 120,
    rightAlignedColumn: true,
  },
  {
    Header: 'Bonus',
    accessor: 'bonus',
    width: 120,
    rightAlignedColumn: true,
  },
  {
    Header: 'Someone 1',
    accessor: 'someone1',
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
  expandedContentHeight: 96,
};

const getBatchActions = () => {
  return [
    {
      label: 'Duplicate',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Add',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Publish to catalog',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Download',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Delete',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
      hasDivider: true,
      kind: 'danger',
    },
  ];
};

const ClickableRow = ({ ...args }) => {
  const columns = React.useMemo(() => [...defaultHeader], []);
  const [data] = useState(makeData(10));
  const rows = React.useMemo(() => data, [data]);

  const datagridState = useDatagrid(
    {
      columns,
      data: rows,
      initialState: {
        pageSize: 10,
        pageSizes: [5, 10, 25, 50],
      },
      DatagridActions,
      DatagridPagination,
      ...args.defaultGridProps,
    },
    useColumnCenterAlign,
    useColumnRightAlign
  );

  return <Datagrid datagridState={datagridState} />;
};

const BasicTemplateWrapper = ({ ...args }) => {
  return <ClickableRow defaultGridProps={{ ...args }} />;
};

const clickableRowControlProps = {
  gridTitle: sharedDatagridProps.gridTitle,
  gridDescription: sharedDatagridProps.gridDescription,
};
const clickableRowItemStoryName = 'With clickable row item';
export const ClickableRowItemStory = BasicTemplateWrapper.bind({});
ClickableRowItemStory.storyName = clickableRowItemStoryName;
ClickableRowItemStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
};
ClickableRowItemStory.args = {
  ...clickableRowControlProps,
};

const DataTableSidePanelContent = (selectedRowValues) => {
  const { rowData } = selectedRowValues;

  const SidePanelSectionContent = ({ rowData, columns, sectionTitle }) => {
    const finalData = columns.map((item) => Object.entries(rowData)[item]);
    return (
      <div className={`${blockClass}__side-panel-sections`}>
        <h5 className={`${blockClass}__side-panel-section-header`}>
          {sectionTitle}
        </h5>
        {finalData.map(([label, value], index) => {
          const formattedValue =
            value instanceof Date ? value.toString() : value;
          return (
            <div
              key={index}
              className={`${blockClass}__side-panel-section-inner`}
            >
              <div className={`${blockClass}__side-panel-label-text`}>
                {label} :
              </div>
              <div className={`${blockClass}__side-panel-value`}>
                {formattedValue}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`${blockClass}__side-panel-content`}>
      <div className={`${blockClass}__side-panel-link`}>
        <Link href="" id="side-panel-story__view-link">
          View details
        </Link>
      </div>
      <SidePanelSectionContent
        sectionTitle="Section title"
        rowData={rowData && rowData}
        columns={[0]}
      />
      <SidePanelSectionContent
        sectionTitle="Personal details"
        rowData={rowData && rowData}
        columns={[1, 2, 3, 4]}
      />
      <SidePanelSectionContent
        sectionTitle="Section title"
        rowData={rowData && rowData}
        columns={[5, 6, 7, 8, 9, 10, 11, 12]}
      />
    </div>
  );
};

const ClickableRowWithPanel = ({ ...args }) => {
  const columns = React.useMemo(
    () => [...defaultHeader.filter((item) => item.accessor !== 'doc_link')],
    []
  );
  const [data] = useState(makeData(10));
  const [openSidePanel, setOpenSidePanel] = useState(false);
  const [rowData, setRowData] = useState({});
  const [focusBackElm, setFocusBackElm] = useState();
  const sidePanelRef = useRef(undefined);

  useEffect(() => {
    if (openSidePanel && sidePanelRef?.current) {
      const focusableElements = sidePanelRef.current.querySelectorAll(
        'button, [href], input, select, [tabindex]:not([tabindex="-1"])'
      );
      const lastFocusableElement =
        focusableElements[focusableElements.length - 2]; //excluding 'Focus sentinel' span
      const handleFocus = () => {
        focusBackElm.focus();
      };
      lastFocusableElement.addEventListener('blur', handleFocus);
      return () => {
        lastFocusableElement.removeEventListener('blur', handleFocus);
      };
    }
  }, [openSidePanel]);

  const datagridState = useDatagrid(
    {
      columns,
      data,
      onRowClick: (row, event) => {
        action()(event);
        setOpenSidePanel(true);
        setRowData(row);
        setFocusBackElm(event.currentTarget);
      },
      DatagridActions,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
      ...args.defaultGridProps,
    },
    useSelectRows,
    useOnRowClick,
    useColumnRightAlign
  );
  return (
    <div
      className={cx(
        openSidePanel
          ? `page-content-wrapper side-panel-open`
          : 'page-content-wrapper'
      )}
    >
      <Datagrid datagridState={{ ...datagridState }} />
      <SidePanel
        id="storybook-id"
        selectorPageContent={true && '.page-content-wrapper'} // Only if SlideIn
        selectorPrimaryFocus="#side-panel-story__view-link"
        open={openSidePanel}
        onRequestClose={() => {
          setOpenSidePanel(false);
          focusBackElm.focus();
        }}
        ref={sidePanelRef}
        tabIndex="0"
        size={'sm'}
        title={'Title'}
        slideIn
      >
        <DataTableSidePanelContent rowData={rowData && rowData.original} />
      </SidePanel>
    </div>
  );
};

const ClickableRowWithPanelWrapper = ({ ...args }) => {
  return <ClickableRowWithPanel defaultGridProps={{ ...args }} />;
};

const clickableRowStoryName = 'Clickable row with side panel';
export const ClickableRowStory = ClickableRowWithPanelWrapper.bind({});
ClickableRowStory.storyName = clickableRowStoryName;
ClickableRowStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
};
ClickableRowStory.args = {
  ...clickableRowControlProps,
};
