/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/prop-types */

import React, { useState, useEffect, forwardRef } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import { within } from '@testing-library/dom';
import uuidv4 from '../../global/js/utils/uuidv4';
import { makeData } from './utils/makeData';

import { expectWarn, mockHTMLElement } from '../../global/js/utils/test-helper';
import { Datagrid, useFilterContext } from '.';

import {
  useDatagrid,
  useInfiniteScroll,
  useSelectRows,
  useDisableSelectRows,
  useExpandedRow,
  useNestedRows,
  useSortableColumns,
  useOnRowClick,
  useCustomizeColumns,
  useSelectAllWithToggle,
  useRowIsMouseOver,
  useStickyColumn,
  useActionsColumn,
  useColumnOrder,
  useColumnRightAlign,
  useColumnCenterAlign,
  useEditableCell,
} from '.';

import {
  TableToolbarContent,
  TableToolbarSearch,
  Button,
  Pagination,
  TableBatchActions,
  TableBatchAction,
} from '@carbon/react';
import {
  Download,
  Restart,
  Filter,
  Activity,
  Add,
  Edit,
} from '@carbon/react/icons';
import { carbon, pkg } from '../../settings';

const blockClass = `${pkg.prefix}--datagrid`;

import namor from 'namor';

import userEvent from '@testing-library/user-event';
import { getInlineEditColumns } from './utils/getInlineEditColumns';
import { FilteringUsage } from './utils/FilteringUsage';

import {
  generateDummyCheckboxes,
  filterProps as testFilterProps,
  flyoutFilterProps as flyoutProps,
} from './utils/filterPropsForTesting';

const { click, hover, unhover } = userEvent.setup({
  // delay: null, // prev version
  advanceTimers: jest.advanceTimersByTime,
});

const dataTestId = uuidv4();

const componentName = Datagrid.displayName;

const defaultHeader = [
  {
    Header: 'Row Index',
    accessor: (row, i) => i,
    sticky: 'left',
    id: 'rowIndex', // id is required when accessor is a function.
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    sticky: 'left',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Age',
    accessor: 'age',
    width: 50,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    width: 60,
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

const DatagridBatchActions = (datagridState) => {
  const { selectedFlatRows, toggleAllRowsSelected } = datagridState;
  const totalSelected = selectedFlatRows && selectedFlatRows.length;
  const onBatchAction = () => alert('Batch action');
  const actionName = 'Action';
  return (
    <TableBatchActions
      shouldShowBatchActions={totalSelected > 0}
      totalSelected={totalSelected}
      onCancel={() => toggleAllRowsSelected(false)}
    >
      <TableBatchAction
        renderIcon={(props) => <Activity size={16} {...props} />}
        onClick={onBatchAction}
      >
        {actionName}
      </TableBatchAction>
    </TableBatchActions>
  );
};

const BasicUsage = ({ ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid({
    columns,
    data,
    resizerAriaLabel: 'Custom column resizer label',
  });

  return <Datagrid datagridState={{ ...datagridState }} {...rest} />;
};

const SpacerColumn = ({ ...rest } = {}) => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
        rightAlignedColumn: true,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        rightAlignedColumn: true,
      },
    ],
    []
  );
  const datagridState = useDatagrid(
    {
      columns,
      data,
      enableSpacerColumn: true,
    },
    useColumnRightAlign
  );

  return <Datagrid datagridState={{ ...datagridState }} {...rest} />;
};

const DatagridActions = (datagridState) => {
  const {
    selectedFlatRows,
    setGlobalFilter,
    CustomizeColumnsButton,
    RowSizeDropdown,
    rowSizeDropdownProps,
  } = datagridState;
  const downloadCsv = () => {
    alert('Downloading...');
  };

  const refreshColumns = () => {
    alert('refreshing...');
  };
  const leftPanelClick = () => {
    alert('open/close left panel...');
  };
  const searchForAColumn = 'Search';
  const isNothingSelected = selectedFlatRows.length === 0;
  const style = {
    'button:nth-child(1) > span:nth-child(1)': {
      bottom: '-37px',
    },
  };
  return (
    isNothingSelected && (
      <React.Fragment>
        <Button
          kind="ghost"
          hasIconOnly
          tooltipPosition="bottom"
          renderIcon={(props) => <Filter size={16} {...props} />}
          iconDescription={'Left panel'}
          onClick={leftPanelClick}
        />
        <TableToolbarContent>
          <TableToolbarSearch
            size="lg"
            id="columnSearch"
            persistent
            placeholder={searchForAColumn}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <RowSizeDropdown {...rowSizeDropdownProps} />
          <div style={style}>
            <Button
              kind="ghost"
              hasIconOnly
              tooltipPosition="bottom"
              renderIcon={(props) => <Restart size={16} {...props} />}
              iconDescription={'Refresh'}
              onClick={refreshColumns}
            />
          </div>
          <div style={style}>
            <Button
              kind="ghost"
              hasIconOnly
              tooltipPosition="bottom"
              renderIcon={(props) => <Download size={16} {...props} />}
              iconDescription={'Download CSV'}
              onClick={downloadCsv}
            />
          </div>
          {CustomizeColumnsButton && (
            <div style={style}>
              <CustomizeColumnsButton />
            </div>
          )}
        </TableToolbarContent>
      </React.Fragment>
    )
  );
};

const DatagridPagination = ({ state, setPageSize, gotoPage, rows }) => {
  const updatePagination = ({ page, pageSize }) => {
    setPageSize(pageSize);
    gotoPage(page - 1); // Carbon is non-zero-based
  };

  return (
    <Pagination
      page={state.pageIndex + 1} // react-table is zero-based
      pageSize={state.pageSize}
      pageSizes={state.pageSizes || [10, 20, 30, 40, 50]}
      totalItems={rows.length}
      onChange={updatePagination}
    />
  );
};

const EmptyUsage = ({ emptyStateType, ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(0));
  const emptyStateTitle = 'Empty State Title';
  const emptyStateDescription =
    'Description test explaining why this card is empty.';
  const emptyStateSize = 'lg';
  const illustrationTheme = 'light';

  const dataGridState = useDatagrid({
    columns,
    data,
    emptyStateTitle,
    emptyStateDescription,
    emptyStateSize,
    emptyStateType,
    illustrationTheme,
    DatagridActions,
    DatagridBatchActions,
    DatagridPagination,
  });

  return <Datagrid datagridState={{ ...dataGridState }} {...rest} />;
};

const TenThousandEntries = ({ ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10000));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      rowSize: 'lg',
      ...rest,
    },
    useInfiniteScroll
  );

  return <Datagrid datagridState={datagridState} />;
};

const IsHoverOnRow = () => {
  const Cell = ({ row }) => {
    if (row.isMouseOver) {
      return 'yes hovering!';
    }
    return '';
  };
  const columns = React.useMemo(
    () => [
      ...defaultHeader.slice(0, 3),
      {
        Header: 'Is hover on row?',
        id: 'isHoveringColumn',
        disableSortBy: true,
        Cell,
      },
    ],
    []
  );
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useRowIsMouseOver
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

const DisableSelectRow = ({ ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      DatagridBatchActions,
      endPlugins: [useDisableSelectRows],
      shouldDisableSelectRow: (row) => row.id % 2 === 0,
      disableSelectAll: true,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} {...rest} />;
};

const ExpandedRow = ({ ...rest } = {}) => {
  const expansionRenderer = ({ row }) => <div>Content for {row.id}</div>;

  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      ExpandedRowContentComponent: expansionRenderer,
      expandedContentHeight: 95,
      expanderButtonTitleExpanded: 'Collapse row',
      expanderButtonTitleCollapsed: 'Expand row',
    },
    useExpandedRow
  );

  return <Datagrid datagridState={datagridState} {...rest} />;
};

// with toolbarBatchActions
const SelectItemsInAllPages = ({ ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(100));

  const datagridState = useDatagrid(
    {
      columns,
      data,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
      DatagridActions,
      initialState: {
        pageSize: 10,
        pageSizes: [5, 10, 25, 50],
      },
      endPlugins: [useDisableSelectRows],
      shouldDisableSelectRow: (row) => row.id % 15 === 0,
      DatagridPagination,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} {...rest} />;
};

const HideSelectAll = ({ ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      hideSelectAll: true,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} {...rest} />;
};

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const Wrapper = ({ children }) => (
  <div
    style={{
      height: '100vh',
      width: '100%',
      padding: '1rem',
      margin: '0',
      zIndex: '0',
    }}
  >
    {children}
  </div>
);

const RowSizeDropdown = ({ ...rest } = {}) => {
  const columns = React.useMemo(
    () => [
      ...defaultHeader.slice(0, 3),
      {
        Header: 'Different cell content',
        id: 'rowSizeDemo-cell',
        disableSortBy: true,
        Cell: ({ rowSize }) => rowSize,
      },
    ],
    []
  );
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      rowSize: 'xs',
      rowSizes: [
        {
          value: 'xl',
          labelText: 'More than super',
        },
        {
          value: 'lg',
          labelText: 'Super tall row',
        },
        {
          value: 'md',
        },
        {
          value: 'xs',
          labelText: 'Teeny tiny row',
        },
      ],
      /*onRowSizeChange: (value) => {
      },*/
      DatagridActions,
      DatagridBatchActions,
    },
    useSelectRows
  );

  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} {...rest} />
    </Wrapper>
  );
};

const CustomizingColumns = ({ ...rest } = {}) => {
  const columns = React.useMemo(
    () => (rest.columns ? rest.columns : defaultHeader),
    [rest.columns]
  );
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ['age'],
        columnOrder: [],
      },
      /*customizeColumnsProps: {
        onSaveColumnPrefs: (newColDefs) => {
        },
      },*/
      DatagridActions,
      DatagridBatchActions,
    },
    useCustomizeColumns,
    useColumnOrder
  );

  return (
    <>
      <Datagrid datagridState={{ ...datagridState }} {...rest} />
      <div>
        Hidden column ids:
        <pre>{JSON.stringify(datagridState.state.hiddenColumns, null, 2)}</pre>
      </div>
      <p>
        More details in the <strong>Notes</strong> section
      </p>
    </>
  );
};

const NestedRows = ({ initialState = {}, ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10, 5, 2, 2));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      initialState,
    },
    useNestedRows
  );

  return <Datagrid datagridState={datagridState} {...rest} />;
};

const NestedTable = ({ ...rest } = {}) => {
  const [data] = useState(makeData(20));
  const nestedColumns = React.useMemo(() => [...defaultHeader], []);
  nestedColumns[0] = {
    Header: 'Row #',
    accessor: (row, i) => i,
    sticky: 'left',
  };
  const nestedDatagridState = useDatagrid({
    columns: nestedColumns,
    data,
    initialState: { pageSize: 10 },
    DatagridPagination,
  });

  const expansionRenderer = () => (
    <div className="carbon-nested-table">
      <Datagrid datagridState={{ ...nestedDatagridState }} />
    </div>
  );

  const columns = React.useMemo(() => defaultHeader, []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      ExpandedRowContentComponent: expansionRenderer,
      expandedContentHeight: (nestedDatagridState.state.pageSize + 2) * 48 + 1, // +2 for header and pagination
      expanderButtonTitleExpanded: 'Collapse row',
      expanderButtonTitleCollapsed: 'Expand row',
    },
    useExpandedRow
  );

  return <Datagrid datagridState={{ ...datagridState }} {...rest} />;
};

const RadioSelect = ({ ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      hideSelectAll: true,
      radio: true,
      initialState: {
        selectedRowIds: {
          3: true,
        },
      },
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} {...rest} />;
};

const SelectableRow = ({ ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} {...rest} />;
};

const SortableColumns = ({ ...rest } = {}) => {
  const columns = React.useMemo(
    () => [
      ...defaultHeader,
      {
        Header: 'Someone 11',
        accessor: 'someone11',
        disableSortBy: true,
      },
    ],
    []
  );
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      ascendingSortableLabelText: 'ascending',
      descendingSortableLabelText: 'descending',
      defaultSortableLabelText: 'none',
      ...rest,
    },
    useSortableColumns
  );

  return <Datagrid datagridState={datagridState} />;
};

const newPersonWithTwoLines = () => {
  return {
    firstName: (
      <>
        <div>{namor.generate({ words: 1, numbers: 0 })}</div>
        <div>{namor.generate({ words: 1, numbers: 0 })}</div>
      </>
    ),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
  };
};

const makeDataWithTwoLines = (length) =>
  range(length).map(() => newPersonWithTwoLines());

const TopAlignment = forwardRef(({ ...rest }, ref) => {
  const columns = React.useMemo(() => defaultHeader.slice(0, 3), []);
  const [data] = useState(makeDataWithTwoLines(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      verticalAlign: 'top',
      variableRowHeight: true,
      rowSize: 'xs',
      rowSizes: [
        {
          value: 'xl',
        },
        {
          value: 'lg',
        },
        {
          value: 'md',
        },
        {
          value: 'xs',
        },
      ],
      DatagridActions,
      DatagridBatchActions,
    },
    useSelectRows
  );

  return <Datagrid ref={ref} datagridState={{ ...datagridState }} {...rest} />;
});

const ClickableRow = ({ onRowClickFn, ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      onRowClick: onRowClickFn,
      ...rest,
    },
    useOnRowClick
  );

  return <Datagrid datagridState={datagridState} />;
};

const InfiniteScroll = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data, setData] = useState(makeData(0));

  const [isFetching, setIsFetching] = useState(false);
  const fetchData = () =>
    new Promise((resolve) => {
      setIsFetching(true);
      setTimeout(() => {
        setData(data.concat(makeData(30, 5, 2)));
        setIsFetching(false);
        resolve();
      }, 1000);
    });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const datagridState = useDatagrid(
    {
      columns,
      data,
      isFetching,
      fetchMoreData: fetchData,
    },
    useInfiniteScroll
  );

  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} />;
    </Wrapper>
  );
};

const InitialLoad = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data, setData] = useState(makeData(0));

  const [isFetching, setIsFetching] = useState(false);
  const fetchData = () =>
    new Promise((resolve) => {
      setIsFetching(true);
      setTimeout(() => {
        setData(data.concat(makeData(30, 5, 2)));
        resolve();
      }, 1000);
    }).then(() => setIsFetching(false));

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const datagridState = useDatagrid({
    columns,
    data,
    isFetching,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

const WithPagination = ({ ...rest } = {}) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(100));
  const datagridState = useDatagrid({
    columns,
    data,
    initialState: {
      pageSize: 25,
      pageSizes: [5, 10, 25, 50],
    },
    DatagridPagination,
  });

  return <Datagrid datagridState={{ ...datagridState }} {...rest} />;
};

const BatchActions = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      DatagridBatchActions,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

const editActionClickFn = jest.fn();
const voteActionClickFn = jest.fn();
const retireActionClickFn = jest.fn();
const deleteActionClickFn = jest.fn();

const ActionsColumnExample = ({
  isFetching = false,
  shouldDisableMenuItem = null,
  shouldHideMenuItem = null,
  disabled = false,
  twoActions = false,
  sticky = 'right',
  ...rest
} = {}) => {
  const columns = React.useMemo(
    () => [
      ...defaultHeader,
      {
        Header: '',
        accessor: 'actions',
        sticky,
        width: 60,
        isAction: true,
      },
    ],
    [sticky]
  );
  const [data] = useState(makeData(10));
  const rowActions = [
    {
      id: 'edit',
      itemText: 'Edit',
      onClick: editActionClickFn,
      disabled,
      shouldHideMenuItem,
      shouldDisableMenuItem,
      icon: Edit,
    },
    {
      id: 'vote',
      itemText: 'Vote',
      onClick: voteActionClickFn,
      icon: Add,
    },
    {
      id: 'retire',
      itemText: 'Retire',
      onClick: retireActionClickFn,
    },
    {
      id: 'delete',
      itemText: 'Delete',
      hasDivider: true,
      isDelete: true,
      onClick: deleteActionClickFn,
    },
  ];
  const datagridState = useDatagrid(
    {
      columns,
      data,
      rowActions: !twoActions ? rowActions : [...rowActions].slice(0, 2),
      isFetching,
    },
    useStickyColumn,
    useActionsColumn
  );
  return <Datagrid datagridState={datagridState} {...rest} />;
};

beforeAll(() => {
  jest.spyOn(global.console, 'warn').mockImplementation((message) => {
    if (
      !message.includes('componentWillReceiveProps') &&
      !message.includes('deprecated')
    ) {
      global.console.warn(message);
    }
  });
});

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    //This will suppress the warning about Arrows16 Component (will be removed in the next major version of @carbon/icons-react).
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('check total column count', () => {
    render(<BasicUsage />);
    expect(screen.getAllByRole('columnheader').length).toEqual(
      defaultHeader.length
    );
  });

  it('renders a table with spacer column', () => {
    render(<SpacerColumn />);
    expect(screen.getByRole('table')).toHaveClass(
      `${carbon.prefix}--data-table`
    );

    expect(
      screen.getAllByRole('columnheader', { hidden: true }).length
    ).toEqual(3);
  });

  it('renders a basic data grid component with devTools attribute', async () => {
    render(<BasicUsage data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      Datagrid.displayName
    );

    expect(screen.getByRole('table')).toHaveClass(
      `${carbon.prefix}--data-table`
    );

    expect(
      screen
        .getByRole('table')
        .getElementsByTagName('thead')[0]
        .getElementsByTagName('tr')[0]
        .getElementsByTagName('th').length
    ).toEqual(15);
    expect(
      screen
        .getByRole('table')
        .getElementsByTagName('tbody')[0]
        .getElementsByTagName('tr').length
    ).toEqual(10);
  });

  it('renders a basic table and resizes column', async () => {
    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
    const { keyboard, tab } = user;
    render(<BasicUsage data-testid={dataTestId} />);
    const resizerInput = screen.getAllByLabelText(
      'Custom column resizer label'
    );
    expect(resizerInput.length).toEqual(defaultHeader.length);
    await click(screen.getByTestId(dataTestId));
    await tab();
    // Input range resizer now has focus
    await keyboard('[ArrowRight]');
    const firstColumnHeader = screen.getAllByRole('columnheader')[0];
    const firstColumnWidth = firstColumnHeader.style.width;
    expect(parseInt(firstColumnWidth)).toEqual(152);
    await keyboard('[ArrowRight]');
    const resizedFirstColumnHeader = screen.getAllByRole('columnheader')[0];
    const resizedFirstColumnWidth = resizedFirstColumnHeader.style.width;
    expect(parseInt(resizedFirstColumnWidth)).toEqual(154);
    await keyboard('[ArrowLeft]');
    const revertResizedFirstColumnHeader =
      screen.getAllByRole('columnheader')[0];
    const revertResizedFirstColumnWidth =
      revertResizedFirstColumnHeader.style.width;
    expect(parseInt(revertResizedFirstColumnWidth)).toEqual(152);
  });

  it('renders a Batch Actions Table', async () => {
    render(<BatchActions data-testid={dataTestId} />);

    const alertMock = jest.spyOn(window, 'alert');

    fireEvent.click(
      screen
        .getByRole('table')
        .getElementsByTagName('thead')[0]
        .getElementsByTagName('tr')[0]
        .getElementsByTagName('th')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('input')[0]
    );
    const tableBodyRows = screen
      .getByRole('table')
      .getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr');
    const numRows = tableBodyRows.length;

    for (var i = 0; i < numRows; i++) {
      expect(tableBodyRows[i].classList[1]).toEqual(
        `${carbon.prefix}--data-table--selected`
      );
    }

    fireEvent.click(
      screen
        .getByRole('table')
        .getElementsByTagName('thead')[0]
        .getElementsByTagName('tr')[0]
        .getElementsByTagName('th')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('input')[0]
    );

    expect(
      document.getElementsByClassName(`${carbon.prefix}--search-input`)[0]
    ).toBeDefined();

    const filterButton = screen.getByLabelText('Left panel');
    fireEvent.click(filterButton);
    expect(alertMock).toHaveBeenCalledTimes(1);

    const rowHeightButton = screen.getByRole('button', {
      name: /Row settings/i,
    });
    fireEvent.click(rowHeightButton);

    const rowSizeDropDown = [
      'Extra large',
      'Large (default)',
      'Medium',
      'Small',
      'Extra small',
    ];
    const rowSize = document
      .getElementsByClassName('c4p--datagrid__row-size-dropdown')[0]
      .getElementsByTagName('div')[0]
      .getElementsByTagName('fieldset')[0]
      .getElementsByTagName('div').length;

    for (var k = 0; k < rowSize; k++) {
      expect(
        document
          .getElementsByClassName('c4p--datagrid__row-size-dropdown')[0]
          .getElementsByTagName('div')[0]
          .getElementsByTagName('fieldset')[0]
          .getElementsByTagName('div')
          .item(k)
          .getElementsByTagName('label')[0]
          .getElementsByTagName('span')[1].textContent
      ).toEqual(rowSizeDropDown[k]);
    }

    const refreshButton = screen.getByLabelText('Refresh');
    fireEvent.click(refreshButton);
    expect(alertMock).toHaveBeenCalledTimes(2);

    const downloadButton = screen.getByLabelText('Download CSV');
    fireEvent.click(downloadButton);
    expect(alertMock).toHaveBeenCalledTimes(3);

    fireEvent.click(
      screen
        .getByRole('table')
        .getElementsByTagName('thead')[0]
        .getElementsByTagName('tr')[0]
        .getElementsByTagName('th')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('input')[0]
    );

    expect(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('p')[0]
        .getElementsByTagName('span')[0].textContent
    ).toEqual('10 items selected');

    expect(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[1]
        .getElementsByTagName('button')[0].textContent
    ).toEqual('Action');
    fireEvent.click(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[1]
        .getElementsByTagName('button')[0]
    );

    expect(alertMock).toHaveBeenCalledTimes(4);

    expect(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[1]
        .getElementsByTagName('button')[1].textContent
    ).toEqual('Cancel');
    fireEvent.click(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[1]
        .getElementsByTagName('button')[1]
    );
  });

  it('renders nothing and logs a warning to console if no datagridState is supplied', async () => {
    expectWarn(
      'Datagrid was not passed datagridState which is required to render this component.',
      () => {
        const { container } = render(
          <BasicUsage data-testid={dataTestId} datagridState={null} />
        );
        expect(container.children.length).toEqual(0);
      },
      1
    );
  });

  //Empty State
  it('renders an empty table', async () => {
    const { rerender } = render(<EmptyUsage data-testid={dataTestId} />);
    screen.getAllByText('Empty State Title');
    screen.getByText('Description test explaining why this card is empty.');

    expect(
      screen
        .getAllByRole('img', { hidden: true })
        .find((img) =>
          img.classList.contains(
            `${pkg.prefix}--empty-state__illustration-noData`
          )
        )
    ).toBeInTheDocument();

    rerender(<EmptyUsage emptyStateType="error" />);
    expect(
      screen
        .getAllByRole('img', { hidden: true })
        .find((img) =>
          img.classList.contains(
            `${pkg.prefix}--empty-state__illustration-error`
          )
        )
    ).toBeInTheDocument();

    rerender(<EmptyUsage emptyStateType="notFound" />);
    expect(
      screen
        .getAllByRole('img', { hidden: true })
        .find((img) =>
          img.classList.contains(
            `${pkg.prefix}--empty-state__illustration-notFound`
          )
        )
    ).toBeInTheDocument();

    rerender(<EmptyUsage emptyStateType="12345" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('Initial Load', async () => {
    render(<InitialLoad data-testid={dataTestId} />);
    expect(
      screen
        .getByRole('table')
        .getElementsByTagName('thead')[0]
        .getElementsByTagName('tr')[0]
        .getElementsByTagName('th').length
    ).toEqual(15);
  });

  it('Infinite Scroll', async () => {
    render(<InfiniteScroll data-testid={dataTestId} />);

    expect(
      screen
        .getByRole('table')
        .getElementsByTagName('tbody')[0]
        .getElementsByTagName('div')[0].classList[0]
    ).toBe('c4p--datagrid__virtual-scrollbar');
  });

  it('renders Ten Thousand table entries', async () => {
    const { rerender } = render(
      <TenThousandEntries data-testid={dataTestId} />
    );

    const tableBody =
      screen.getAllByRole('rowgroup')[1].firstElementChild.firstElementChild;
    const tableBodyHeight = tableBody.style.height;
    expect(parseInt(tableBodyHeight)).toEqual(480000);

    expect(
      parseInt(tableBodyHeight) / 48 // 48 is default row height
    ).toEqual(10000);

    rerender(
      <TenThousandEntries
        virtualHeight={400}
        data-testid={dataTestId}
        loadMoreThreshold={300}
      />
    );
    const rowGroups = screen.getAllByRole('rowgroup');
    const bodyRowGroup = rowGroups[1];
    const virtualScrollingElement = bodyRowGroup.firstElementChild;
    fireEvent.scroll(virtualScrollingElement, { target: { scrollY: 5000 } });
    expect(virtualScrollingElement.scrollLeft).toEqual(
      bodyRowGroup.previousElementSibling.scrollLeft
    );
  });

  it('With Pagination', async () => {
    render(<WithPagination data-testid={dataTestId} />);

    expect(
      document.getElementById(`${carbon.prefix}-pagination-select-4`)
    ).toBeDefined();
    expect(
      document.getElementById(`${carbon.prefix}-pagination-select-6`)
    ).toBeDefined();
  });

  it('Clickable Row', async () => {
    const onRowClickFn = jest.fn();
    const { rerender } = render(
      <ClickableRow onRowClickFn={onRowClickFn} data-testid={dataTestId} />
    );
    const rows = screen.getAllByRole('row');
    const bodyRows = rows.filter(
      (r) =>
        !r.classList.contains('c4p--datagrid__head') &&
        !r.classList.contains('c4p--datagrid__expanded-row')
    );

    const firstBodyRow = bodyRows[0];

    fireEvent.click(firstBodyRow);
    expect(onRowClickFn).toHaveBeenCalledTimes(1);

    rerender(
      <ClickableRow
        isFetching
        onRowClickFn={onRowClickFn}
        data-testid={dataTestId}
      />
    );
    const newRows = screen.getAllByRole('row');
    const newBodyRows = newRows.filter(
      (r) =>
        !r.classList.contains('c4p--datagrid__head') &&
        !r.classList.contains('c4p--datagrid__expanded-row')
    );
    const newBodyRow = newBodyRows[0];
    newBodyRow.focus();
    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
    const { keyboard } = user;
    await keyboard('{Enter}');
    expect(onRowClickFn).toHaveBeenCalledTimes(2);
    newBodyRow.focus();
    await keyboard('{Shift}');
    expect(onRowClickFn).toHaveBeenCalledTimes(2);
  });

  function completeHoverOperation(rowNumber) {
    hover(
      screen
        .getByRole('table')
        .getElementsByTagName('tbody')[0]
        .getElementsByTagName('tr')
        .item(rowNumber)
        .getElementsByTagName('td')[3]
    );

    setTimeout(() => {
      expect(
        screen
          .getByRole('table')
          .getElementsByTagName('tbody')[0]
          .getElementsByTagName('tr')
          .item(rowNumber)
          .getElementsByTagName('td')[3].textContent
      ).toBe('yes hovering!');
    }, 300);

    unhover(
      screen
        .getByRole('table')
        .getElementsByTagName('tbody')[0]
        .getElementsByTagName('tr')[rowNumber]
    );
    setTimeout(() => {
      expect(
        screen
          .getByRole('table')
          .getElementsByTagName('tbody')[0]
          .getElementsByTagName('tr')
          .item(rowNumber)
          .getElementsByTagName('td')[3].textContent
      ).toBe('');
    }, 300);
  }

  it('Is Hover On Row', async () => {
    render(<IsHoverOnRow data-testid={dataTestId} />);
    completeHoverOperation(1);

    completeHoverOperation(5);
  });

  //Disables Selected Rows
  it('Renders Disable Select Row', async () => {
    render(<DisableSelectRow data-testid={dataTestId} />);

    const alertMock = jest.spyOn(window, 'alert');

    expect(
      document.getElementsByClassName(`${carbon.prefix}--search-input`)[0]
    ).toBeDefined();

    const filterButton = screen.getByLabelText('Left panel');
    fireEvent.click(filterButton);
    expect(alertMock).toHaveBeenCalledTimes(1);

    const rowHeightButton = screen.getByRole('button', {
      name: /Row settings/i,
    });
    fireEvent.click(rowHeightButton);

    const rowSizeDropDown = [
      'Extra large',
      'Large (default)',
      'Medium',
      'Small',
      'Extra small',
    ];
    const rowSize = document
      .getElementsByClassName('c4p--datagrid__row-size-dropdown')[0]
      .getElementsByTagName('div')[0]
      .getElementsByTagName('fieldset')[0]
      .getElementsByTagName('div').length;

    for (var k = 0; k < rowSize; k++) {
      expect(
        document
          .getElementsByClassName('c4p--datagrid__row-size-dropdown')[0]
          .getElementsByTagName('div')[0]
          .getElementsByTagName('fieldset')[0]
          .getElementsByTagName('div')
          .item(k)
          .getElementsByTagName('label')[0]
          .getElementsByTagName('span')[1].textContent
      ).toEqual(rowSizeDropDown[k]);
    }

    const refreshButtonElement = screen.getByLabelText('Refresh');
    fireEvent.click(refreshButtonElement);
    expect(alertMock).toHaveBeenCalledTimes(2);

    const downloadButtonElement = screen.getByLabelText('Download CSV');
    fireEvent.click(downloadButtonElement);
    expect(alertMock).toHaveBeenCalledTimes(3);

    const unClickableRow = screen
      .getByRole('table')
      .getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[0];
    const clickableRow = screen
      .getByRole('table')
      .getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[1];

    expect(
      unClickableRow
        .getElementsByTagName('td')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('input')[0]
    ).toHaveAttribute('disabled');

    clickableRow
      .getElementsByTagName('td')[0]
      .getElementsByTagName('div')[0]
      .getElementsByTagName('input')[0];

    fireEvent(
      clickableRow
        .getElementsByTagName('td')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('label')[0],
      new MouseEvent('click')
    );

    expect(clickableRow).toHaveClass(`${carbon.prefix}--data-table--selected`);

    expect(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('p')[0]
        .getElementsByTagName('span')[0].textContent
    ).toEqual('1 item selected');

    expect(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[1]
        .getElementsByTagName('button')[0].textContent
    ).toEqual('Action');
    fireEvent.click(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[1]
        .getElementsByTagName('button')[0]
    );

    expect(alertMock).toHaveBeenCalledTimes(4);

    expect(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[1]
        .getElementsByTagName('button')[1].textContent
    ).toEqual('Cancel');
    fireEvent.click(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[1]
        .getElementsByTagName('button')[1]
    );

    fireEvent.click(clickableRow);
  });

  async function clickRow(rowNumber, triggerAnotherExpander) {
    const user = userEvent.setup({ delay: null });
    const { click, hover, unhover } = user;
    const rows = screen.getAllByRole('row');
    const bodyRows = rows.filter(
      (r) =>
        !r.classList.contains(`${pkg.prefix}--datagrid__head`) &&
        !r.classList.contains(`${pkg.prefix}--datagrid__expanded-row`)
    );
    const row = bodyRows[rowNumber];

    const rowExpander = within(row).getByLabelText('Expand row');
    await click(rowExpander);

    expect(row.nextElementSibling).toHaveClass(`${blockClass}__expanded-row`);
    expect(row.nextElementSibling.textContent).toEqual(
      `Content for ${rowNumber}`
    );

    hover(row.nextElementSibling);
    unhover(row.nextElementSibling);

    if (triggerAnotherExpander) {
      const nextRow = bodyRows[rowNumber + 1];
      const nextRowExpanderExpand =
        within(nextRow).getByLabelText('Expand row');
      fireEvent.click(nextRowExpanderExpand);
      return;
    }
    const rowExpanderCollapse = within(row).getByLabelText('Collapse row');
    fireEvent.click(rowExpanderCollapse);
  }

  it('should render with expandable rows and test by toggling the row open and closed', () => {
    render(<ExpandedRow data-testid={dataTestId} />);
    clickRow(1);
    clickRow(4);
    clickRow(8, true);
  });

  function hideSelectAll(rowNumber) {
    var row = screen
      .getByRole('table')
      .getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[rowNumber];
    var button = row
      .getElementsByTagName('td')[0]
      .getElementsByTagName('div')[0]
      .getElementsByTagName('input')[0];

    fireEvent.click(button);

    expect(row.classList[1]).toEqual(`${carbon.prefix}--data-table--selected`);

    fireEvent.click(button);
    expect(row.classList['0']).toEqual('c4p--datagrid__carbon-row');
  }

  it('Hide Select All', async () => {
    render(<HideSelectAll data-testid={dataTestId} />);

    hideSelectAll(2);

    hideSelectAll(5);

    hideSelectAll(8);
  });

  it('Nested Rows', async () => {
    render(<NestedRows data-testid={dataTestId} />);

    const gridRows = screen.getAllByRole('row');
    const bodyRows = gridRows.filter(
      (r) => !r.classList.contains(`${blockClass}__head`)
    );
    const firstBodyRow = bodyRows[0];
    const firstRowExpander = within(firstBodyRow).getByLabelText('Expand row');
    fireEvent.click(firstRowExpander);
    expect(firstBodyRow).toHaveClass(`${blockClass}__carbon-row-expanded`);

    const newAllRows = screen.getAllByRole('row');
    const newBodyRows = newAllRows.filter(
      (r) => !r.classList.contains(`${blockClass}__head`)
    );
    const nestedRow = newBodyRows[1];

    if (nestedRow.className === `${blockClass}__carbon-nested-row`) {
      const nestedRowExpander = within(nestedRow).getByLabelText('Expand row');
      fireEvent.click(nestedRowExpander);
    }

    expect(nestedRow).toHaveClass(`${blockClass}__carbon-nested-row`);
  });

  it('should render nested rows with some initially expanded', async () => {
    render(
      <NestedRows
        initialState={{
          expandedRowIds: {
            1: true,
            3: true,
          },
        }}
      />
    );
    const gridRows = screen.getAllByRole('row');
    const bodyRows = gridRows.filter(
      (r) => !r.classList.contains(`${blockClass}__head`)
    );
    const rowId1 = bodyRows.filter(
      (r) => r.getAttribute('data-nested-row-id') === '1'
    );
    const rowId3 = bodyRows.filter(
      (r) => r.getAttribute('data-nested-row-id') === '3'
    );
    expect(rowId1[0]).toHaveClass(`${blockClass}__carbon-row-expanded`);
    expect(rowId3[0]).toHaveClass(`${blockClass}__carbon-row-expanded`);
  });

  it('Nested Table', async () => {
    render(<NestedTable data-testid={dataTestId} />);
    const firstRowExpander = screen.getAllByLabelText('Expand row')[0];
    const firstRow = screen.getAllByRole('row')[1];
    fireEvent.click(firstRowExpander);
    expect(firstRow.nextSibling).toHaveClass('c4p--datagrid__expanded-row');

    const alertMock = jest.spyOn(window, 'alert');

    fireEvent.click(
      screen
        .getAllByRole('table')[0]
        .getElementsByTagName('tbody')[0]
        .getElementsByTagName('tr')[4]
    );

    setTimeout(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    }, 1000);
  });

  function radioSelectButton(previousRowNumber, currentRowNumber) {
    if (
      screen
        .getByRole('table')
        .getElementsByTagName('tbody')[0]
        .getElementsByTagName('tr')[previousRowNumber].classList[1] ===
      `.${carbon.prefix}--data-table--selected`
    ) {
      fireEvent.click(
        screen
          .getByRole('table')
          .getElementsByTagName('tbody')[0]
          .getElementsByTagName('tr')
          .item(currentRowNumber)
          .getElementsByTagName('td')[0]
          .getElementsByTagName('div')[0]
          .getElementsByTagName('input')[0]
      );

      expect(
        screen
          .getByRole('table')
          .getElementsByTagName('tbody')[0]
          .getElementsByTagName('tr')[currentRowNumber].classList[1]
      ).toEqual(`${carbon.prefix}--data-table--selected`);

      expect(
        screen
          .getByRole('table')
          .getElementsByTagName('tbody')[0]
          .getElementsByTagName('tr')[previousRowNumber].classList[1]
      ).toBeUndefined();
    } else {
      fireEvent.click(
        screen
          .getByRole('table')
          .getElementsByTagName('tbody')[0]
          .getElementsByTagName('tr')
          .item(currentRowNumber)
          .getElementsByTagName('td')[0]
          .getElementsByTagName('div')[0]
          .getElementsByTagName('input')[0]
      );

      expect(
        screen
          .getByRole('table')
          .getElementsByTagName('tbody')[0]
          .getElementsByTagName('tr')[currentRowNumber].classList[1]
      ).toEqual(`${carbon.prefix}--data-table--selected`);
    }
  }

  it('Radio Select', async () => {
    render(<RadioSelect data-testid={dataTestId} />);
    radioSelectButton(1, 1);

    radioSelectButton(1, 4);

    radioSelectButton(4, 7);

    radioSelectButton(2, 6);
  });

  // with toolbarBatchActions
  it('Select Items In All Pages', async () => {
    const alertMock = jest.spyOn(window, 'alert');

    render(<SelectItemsInAllPages data-testid={dataTestId} />);
    // check if 10 rows are rendered on initial load
    var numRows = screen
      .getByRole('table')
      .getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr').length;
    expect(numRows).toEqual(10);

    for (var j = 0; j < numRows; j++) {
      expect(
        screen
          .getByRole('table')
          .getElementsByTagName('tbody')[0]
          .getElementsByTagName('tr')[j].classList[0]
      ).toEqual('c4p--datagrid__carbon-row');
    }
    // check if batch actions toolbar is present in dom (is still visually hidden)
    expect(
      document.getElementsByClassName('c4p--datagrid__table-toolbar').length
    ).toBe(1);

    // select all on page 1 (to make the batch actions toolbar visible, so we can test select all on all pages)
    fireEvent.click(
      screen
        .getByRole('table')
        .getElementsByTagName('thead')[0]
        .getElementsByTagName('tr')[0]
        .getElementsByTagName('th')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('input')[0]
    );

    expect(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('p')[0]
        .getElementsByTagName('span')[0].textContent
    ).toEqual('9 items selected'); // one row is disabled on first page

    expect(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('button')[0].textContent
    ).toEqual('Select all (93)');

    // click select all button in toolbar
    fireEvent.click(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('button')[0]
    );
    expect(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('p')[0]
        .getElementsByTagName('span')[0].textContent
    ).toEqual('93 items selected');

    // check for cancel button in batch actions and click
    expect(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[1]
        .getElementsByTagName('button')[1].textContent
    ).toEqual('Cancel');
    fireEvent.click(
      document
        .getElementsByClassName('c4p--datagrid__table-toolbar')[0]
        .getElementsByTagName('section')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[1]
        .getElementsByTagName('button')[1]
    );

    const refreshButton = screen.getByLabelText('Refresh');
    fireEvent.click(refreshButton);
    expect(alertMock).toHaveBeenCalledTimes(1);

    const downloadButton = screen.getByLabelText('Download CSV');
    fireEvent.click(downloadButton);
    expect(alertMock).toHaveBeenCalledTimes(2);
  });

  const rightAlignedColumnsData = [
    ...defaultHeader.slice(0, 3),
    {
      Header: 'Age',
      accessor: 'age',
      rightAlignedColumn: true,
      disableSortBy: true,
    },
    {
      Header: 'Visits',
      accessor: 'visits',
      rightAlignedColumn: true,
    },
  ];

  const centerAlignedColumnsData = [
    ...defaultHeader.slice(0, 3),
    {
      Header: () => <span>Age</span>,
      accessor: 'age',
      rightAlignedColumn: true,
      disableSortBy: true,
    },
    {
      Header: 'Visits',
      accessor: 'visits',
      centerAlignedColumn: true,
    },
  ];

  const CustomAlignColumns = ({ customCols }) => {
    const [data] = useState(makeData(10));
    const datagridState = useDatagrid(
      {
        columns: customCols,
        data,
      },
      useColumnRightAlign,
      useColumnCenterAlign,
      useSortableColumns
    );

    return <Datagrid datagridState={datagridState} />;
  };

  it('should render right aligned columns', async () => {
    render(
      <CustomAlignColumns
        customCols={rightAlignedColumnsData}
        data-testid={dataTestId}
      />
    );

    const ageColIndex = rightAlignedColumnsData.findIndex(
      (i) => i.accessor === 'age'
    );
    const visitsColIndex = rightAlignedColumnsData.findIndex(
      (i) => i.accessor === 'visits'
    );

    const gridRows = screen.getAllByRole('row');
    const bodyRows = gridRows.filter(
      (r) => !r.classList.contains(`${blockClass}__head`)
    );
    const bodyAgeCell = bodyRows[0].childNodes[ageColIndex].firstChild;
    const bodyVisitsCell = bodyRows[0].childNodes[visitsColIndex].firstChild;
    expect(bodyAgeCell).toHaveClass(`${blockClass}__right-align-cell-renderer`);
    expect(bodyAgeCell).toHaveClass(`sortDisabled`);
    expect(bodyVisitsCell).toHaveClass(
      `${blockClass}__right-align-cell-renderer`
    );
  });

  it('should render center aligned columns', async () => {
    render(
      <CustomAlignColumns
        customCols={centerAlignedColumnsData}
        data-testid={dataTestId}
      />
    );

    const ageColIndex = centerAlignedColumnsData.findIndex(
      (i) => i.accessor === 'age'
    );
    const visitsColIndex = centerAlignedColumnsData.findIndex(
      (i) => i.accessor === 'visits'
    );

    const gridRows = screen.getAllByRole('row');
    const bodyRows = gridRows.filter(
      (r) => !r.classList.contains(`${blockClass}__head`)
    );
    const bodyAgeCell = bodyRows[0].childNodes[ageColIndex].firstChild;
    const bodyVisitsCell = bodyRows[0].childNodes[visitsColIndex].firstChild;
    expect(bodyAgeCell).toHaveClass(`${blockClass}__right-align-cell-renderer`);
    expect(bodyAgeCell).toHaveClass(`sortDisabled`);
    expect(bodyVisitsCell).toHaveClass(
      `${blockClass}__center-align-cell-renderer`
    );
  });

  it('Row Size Dropdown', async () => {
    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
    const { click, keyboard } = user;
    render(<RowSizeDropdown data-testid={dataTestId} />);

    const alertMock = jest.spyOn(window, 'alert');

    // Click select all rows checkbox
    const selectAllCheckbox = screen.getByLabelText(
      'Select all rows in the table'
    );
    await click(selectAllCheckbox);

    // Count number of rows
    const tableRows = screen.getAllByRole('row');
    const bodyRows = tableRows.filter(
      (row) => !row.classList.contains(`${blockClass}__head`)
    );

    bodyRows.forEach((bodyRow) => {
      expect(bodyRow).toHaveClass(`${carbon.prefix}--data-table--selected`);
    });

    screen.getByText('10 items selected');

    // Find and click Refresh button
    const actionButton = screen.getByText('Action');
    await click(actionButton);
    expect(alertMock).toHaveBeenCalled();

    // Find and click cancel button
    const cancelButton = screen.getByText('Cancel');
    await click(cancelButton);
    expect(alertMock).toHaveBeenCalled();

    await click(screen.getByLabelText('Row settings'));
    expect(screen.getByLabelText('Row settings')).toHaveClass(
      `${blockClass}__row-size__row-settings-trigger--open`
    );
    await keyboard('[Escape]');
    expect(screen.getByLabelText('Row settings')).not.toHaveClass(
      `${blockClass}__row-settings-trigger--open`
    );
    await click(screen.getByLabelText('Row settings'));
    await keyboard('[ArrowUp]');
    const tableElement = screen.getByRole('table');
    expect(tableElement).toHaveClass(`${carbon.prefix}--data-table--md`);
    click(screen.getAllByRole('columnheader')[0]);
    expect(screen.getByLabelText('Row settings')).not.toHaveClass(
      `${blockClass}__row-settings-trigger--open`
    );
  });

  it('Selectable Row', async () => {
    render(<SelectableRow data-testid={dataTestId} />);

    fireEvent.click(
      screen
        .getByRole('table')
        .getElementsByTagName('thead')[0]
        .getElementsByTagName('tr')[0]
        .getElementsByTagName('th')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('label')[0]
    );

    const rows = screen
      .getByRole('table')
      .getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
      expect(rows.item(i).classList[1]).toEqual(
        `${carbon.prefix}--data-table--selected`
      );
    }

    //Un-Selects all the rows in the table.
    fireEvent.click(
      screen
        .getByRole('table')
        .getElementsByTagName('thead')[0]
        .getElementsByTagName('tr')[0]
        .getElementsByTagName('th')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('label')[0]
    );

    const selectIndividualRow = screen
      .getByRole('table')
      .getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[0];
    //Selects only one row (in this case, the first one).
    fireEvent.click(
      selectIndividualRow
        .getElementsByTagName('td')[0]
        .getElementsByTagName('div')[0]
        .getElementsByTagName('label')[0]
    );

    expect(selectIndividualRow.classList[1]).toEqual(
      `${carbon.prefix}--data-table--selected`
    );
  });

  it('should render sortable columns and toggle between sortable states for all column headers', () => {
    const { click } = userEvent;
    render(<SortableColumns data-testid={dataTestId} />);

    const rows = screen.getAllByRole('row');
    const headerRow = rows[0];
    const columnHeaders = within(headerRow).getAllByRole('columnheader');

    Array.from(columnHeaders).map(async (colHeader, index) => {
      // The last column definition opts out of sorting by specifying `disableSortBy`
      // so we should not include testing for the last column header
      if (index === defaultHeader.length) {
        return;
      }
      const sortableColumnHeaderButton = within(colHeader).getByRole('button');
      await click(sortableColumnHeaderButton);
      expect(sortableColumnHeaderButton.getAttribute('aria-sort')).toEqual(
        'ascending'
      );
      await click(sortableColumnHeaderButton);
      expect(sortableColumnHeaderButton.getAttribute('aria-sort')).toEqual(
        'descending'
      );
      await click(sortableColumnHeaderButton);
      expect(sortableColumnHeaderButton.getAttribute('aria-sort')).toEqual(
        'none'
      );
    });
  });
  it('Customizing Columns disable save button when un-select all columns', async () => {
    const columnsWithoutSticky = [
      {
        Header: 'Row Index',
        accessor: (row, i) => i,
        id: 'rowIndex', // id is required when accessor is a function.
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
    ];
    const columns = [...columnsWithoutSticky, ...defaultHeader.slice(2)];
    render(<CustomizingColumns data-testid={dataTestId} columns={columns} />);

    const customizeColumnsButton = screen.getByLabelText('Customize columns');
    fireEvent.click(customizeColumnsButton);
    screen.getByRole('heading', { name: /Customize columns/ });

    const selectAllCheckBox = screen.getByRole('checkbox', {
      name: 'Column name',
    });
    fireEvent.click(selectAllCheckBox);
    expect(selectAllCheckBox.checked).toEqual(true);
    expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();

    fireEvent.click(selectAllCheckBox);
    expect(selectAllCheckBox.checked).toEqual(false);
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('Customizing Columns', async () => {
    render(<CustomizingColumns data-testid={dataTestId} />);

    const alertMock = jest.spyOn(window, 'alert');

    const leftPanelButton = screen.getByLabelText('Left panel');
    fireEvent.click(leftPanelButton);
    expect(alertMock).toHaveBeenCalledTimes(1);

    const refreshButton = screen.getByLabelText('Refresh');
    fireEvent.click(refreshButton);
    expect(alertMock).toHaveBeenCalledTimes(2);

    const downloadButton = screen.getByLabelText('Download CSV');
    fireEvent.click(downloadButton);
    expect(alertMock).toHaveBeenCalledTimes(3);

    const customizeColumnsButton = screen.getByLabelText('Customize columns');
    fireEvent.click(customizeColumnsButton);
    screen.getByRole('heading', { name: /Customize columns/ });
    const searchInput = screen.getByPlaceholderText('Find column');
    expect(searchInput.value).toBe(''); // empty before
    fireEvent.change(searchInput, { target: { value: 'Visits' } });
    expect(searchInput.value).toBe('Visits');
    const dragItemCheckBox = screen.getByRole('checkbox', { name: 'Visits' });
    fireEvent.click(dragItemCheckBox);
    expect(dragItemCheckBox.checked).toEqual(false);
    const columnSaveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(columnSaveButton);
    const rows = screen.getAllByRole('row');
    const headerRow = rows[0];
    setTimeout(() => {
      expect(within(headerRow).queryByText('Visits') === null).toBe(true);
    }, 0);
  });

  it('Top Alignment', async () => {
    const ref = React.createRef();
    render(<TopAlignment ref={ref} data-testid={dataTestId} />);

    expect(screen.getByRole('table')).toHaveClass(
      `${blockClass}__vertical-align-top`
    );
  });

  const getOverflowMenuItems = () => {
    return document.querySelectorAll(
      `.${carbon.prefix}--overflow-menu-options button`
    );
  };

  it('should render sticky action column and click each menu item', async () => {
    render(<ActionsColumnExample data-testid={dataTestId} />);

    const tableRows = screen.getAllByRole('row');
    const headerRow = tableRows[0];
    const bodyRows = tableRows.filter(
      (row) => !row.classList.contains(`${blockClass}__head`)
    );

    expect(headerRow).toHaveClass(`${blockClass}__sticky`);
    bodyRows.forEach((row) => {
      const stickyActionColumnCell = row.lastElementChild;
      expect(stickyActionColumnCell).toHaveClass(
        `${blockClass}__actions-column-cell`
      );
      expect(stickyActionColumnCell).toHaveClass(
        `${blockClass}__right-sticky-column-cell`
      );
    });

    const overflowMenu = within(bodyRows[0]).getByRole('button', {
      name: 'Options',
    });
    fireEvent.click(overflowMenu);

    // Click each item inside of overflow menu, menu closes after clicking on a menu item
    // so we need to click the overflow menu again each time to view the menu items again
    await waitFor(() => {
      expect(getOverflowMenuItems().length).toBeGreaterThan(0);
    });
    const editActionButton = Array.from(getOverflowMenuItems()).filter(
      (item) => item.textContent === 'Edit'
    )[0];
    fireEvent.click(editActionButton);
    expect(editActionClickFn).toHaveBeenCalledTimes(1);

    fireEvent.click(overflowMenu);
    await waitFor(() => {
      expect(getOverflowMenuItems().length).toBeGreaterThan(0);
    });
    const voteActionButton = Array.from(getOverflowMenuItems()).filter(
      (item) => item.textContent === 'Vote'
    )[0];
    fireEvent.click(voteActionButton);
    expect(voteActionClickFn).toHaveBeenCalledTimes(1);

    fireEvent.click(overflowMenu);
    await waitFor(() => {
      expect(getOverflowMenuItems().length).toBeGreaterThan(0);
    });
    const retireActionButton = Array.from(getOverflowMenuItems()).filter(
      (item) => item.textContent === 'Retire'
    )[0];
    fireEvent.click(retireActionButton);
    expect(retireActionClickFn).toHaveBeenCalledTimes(1);

    fireEvent.click(overflowMenu);

    let deleteActionButton;
    await waitFor(() => {
      const items = getOverflowMenuItems();
      expect(items.length).toBeGreaterThan(0);
      // Find delete button - it might have extra whitespace or be in a different format
      deleteActionButton = Array.from(items).find((item) =>
        item.textContent.trim().includes('Delete')
      );
      expect(deleteActionButton).toBeDefined();
    });

    fireEvent.click(deleteActionButton);
    expect(deleteActionClickFn).toHaveBeenCalledTimes(1);
  });

  it('should render stick actions and test disabled states', async () => {
    const { rerender } = render(
      <ActionsColumnExample disabled data-testid={dataTestId} />
    );
    const tableRows = screen.getAllByRole('row');
    const bodyRows = tableRows.filter(
      (row) => !row.classList.contains(`${blockClass}__head`)
    );
    const overflowMenu = within(bodyRows[0]).getByRole('button', {
      name: 'Options',
    });
    await click(overflowMenu);

    const deleteActionButton = Array.from(getOverflowMenuItems()).filter(
      (item) => item.textContent === 'Edit'
    )[0];

    expect(deleteActionButton).toHaveAttribute('disabled');

    // Test that shouldDisableMenuItem function successfully disables a menu item
    const disableActionItemFn = jest.fn(() => true);
    rerender(
      <ActionsColumnExample
        shouldDisableMenuItem={disableActionItemFn}
        data-testid={dataTestId}
      />
    );
    await click(overflowMenu);
    expect(disableActionItemFn).toHaveBeenCalled();
    expect(deleteActionButton).toHaveAttribute('disabled');

    // Test that shouldHideMenuItem function successfully hides a menu item
    const hideActionItemFn = jest.fn(() => true);
    rerender(
      <ActionsColumnExample
        shouldHideMenuItem={hideActionItemFn}
        data-testid={dataTestId}
      />
    );
    await click(overflowMenu);
    expect(hideActionItemFn).toHaveBeenCalled();
    expect(getOverflowMenuItems().length).toEqual(3); // Previously was 4, but we've hidden the delete action in this test
  });

  it('should render a non sticky actions column and click each menu item', async () => {
    render(<ActionsColumnExample sticky={null} data-testid={dataTestId} />);

    const tableRows = screen.getAllByRole('row');
    const bodyRows = tableRows.filter(
      (row) => !row.classList.contains(`${blockClass}__head`)
    );

    bodyRows.forEach((row) => {
      const actionColumnCell = row.lastElementChild;
      expect(actionColumnCell).toHaveClass(
        `${blockClass}__actions-column-cell`
      );
      expect(actionColumnCell).not.toHaveClass(
        `${blockClass}__right-sticky-column-cell`
      );
    });
  });

  it('should click non sticky row action when not inside of overflow menu', async () => {
    const { rerender } = render(
      <ActionsColumnExample
        isFetching={true}
        twoActions
        sticky={null}
        data-testid={dataTestId}
      />
    );
    const user = userEvent.setup({ delay: null });
    const { click } = user;
    const tableRows = screen.getAllByRole('row');
    const bodyRows = tableRows.filter(
      (row) => !row.classList.contains(`${blockClass}__head`)
    );
    const firstBodyRow = bodyRows[0];
    const lastCellElement = firstBodyRow.lastElementChild;
    const iconSkeletonElement = lastCellElement.children[0].children[0];
    expect(iconSkeletonElement).toHaveClass(`${carbon.prefix}--icon--skeleton`);
    expect(iconSkeletonElement).toHaveClass(
      `${blockClass}__actions-column-loading`
    );

    rerender(
      <ActionsColumnExample
        isFetching={false}
        twoActions
        sticky={null}
        data-testid={dataTestId}
      />
    );
    const editActionButton = within(firstBodyRow).getByRole('button', {
      name: 'Edit',
    });
    const voteActionButton = within(firstBodyRow).getByRole('button', {
      name: 'Vote',
    });
    await click(editActionButton);
    expect(editActionClickFn).toHaveBeenCalledTimes(1);
    await click(voteActionButton);
    expect(voteActionClickFn).toHaveBeenCalledTimes(1);

    const hideIconOnlyItem = jest.fn(() => true);
    rerender(
      <ActionsColumnExample
        isFetching={false}
        shouldHideMenuItem={hideIconOnlyItem}
        twoActions
        sticky={null}
        data-testid={dataTestId}
      />
    );
    expect(within(firstBodyRow).getAllByRole('button').length).toEqual(1); // Previously was 2 but we've hidden the other in this test
  });

  const EditableCellUsage = ({ ...args }) => {
    const [data, setData] = useState(makeData(3));
    const columns = React.useMemo(() => getInlineEditColumns(), []);
    pkg._silenceWarnings(false); // warnings are ordinarily silenced in storybook, add this to test.
    pkg.feature['Datagrid.useInlineEdit'] = true;
    pkg._silenceWarnings(true);

    const datagridState = useDatagrid(
      {
        columns,
        data,
        onDataUpdate: setData,
        ...args.defaultGridProps,
      },
      useEditableCell
    );

    // Warnings are ordinarily silenced in storybook, add this to test.
    pkg._silenceWarnings(false);
    pkg.feature['Datagrid.useEditableCell'] = true;
    pkg._silenceWarnings(true);

    return <Datagrid datagridState={datagridState} />;
  };
  it('should test the basic interactions of the editable cell datagrid', async () => {
    const { container } = render(<EditableCellUsage />);
    const tableElement = screen.getByRole('grid');
    const rowButtons = screen.getAllByRole('button');
    const firstEditableCell = rowButtons[0];

    await click(firstEditableCell);
    expect(firstEditableCell).toHaveClass(
      `${blockClass}__inline-edit-button--active`
    );
    await click(container);
    expect(tableElement).not.toHaveClass(`${blockClass}__table-grid-active`);
  });

  const sharedFilterGridProps = {
    expanderButtonTitleExpanded: 'Collapse row',
    expanderButtonTitleCollapsed: 'Expand row',
    gridTitle: 'Data table title',
    gridDescription: 'Additional information if needed',
    useDenseHeader: false,
    emptyStateTitle: 'No filters match',
    emptyStateDescription:
      'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
  };

  // Helper function to create multiselect filter props with customizable options
  const createMultiSelectFilterProps = (overrides = {}) => ({
    variation: 'panel',
    updateMethod: 'batch',
    primaryActionLabel: 'Apply',
    secondaryActionLabel: 'Cancel',
    panelIconDescription: 'Open filters',
    sections: [
      {
        categoryTitle: 'Test Category',
        filters: [
          {
            filterLabel: 'Status',
            filter: {
              type: 'multiSelect',
              column: 'status',
              props: {
                MultiSelect: {
                  items: [
                    { text: 'Active', id: 'active' },
                    { text: 'Inactive', id: 'inactive' },
                    ...(overrides.includeThirdItem
                      ? [{ text: 'Pending', id: 'pending' }]
                      : []),
                  ],
                  id: overrides.id || 'status-multiselect-normal',
                  label: overrides.label || 'Status selection',
                  titleText: overrides.titleText || 'Multiselect normal',
                  itemToString: (item) => (item ? item.text : ''),
                },
              },
            },
          },
        ],
      },
    ],
    renderLabel: (key, value) => `${key}: ${value}`,
  });

  // Helper function to get the filter toggle button from the toolbar
  const getFilterToggleButton = () => {
    const toolbar = screen.getByLabelText('data table toolbar').parentElement;
    return within(toolbar).getAllByRole('button')[0];
  };

  it('should test basic interactions of filter panel', async () => {
    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
    const { keyboard, type } = user;
    const dropdownOnChange = jest.fn();
    render(
      <FilteringUsage
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: testFilterProps({
            dropdownOnChange,
          }),
        }}
      />
    );
    const toolbar = screen.getByLabelText('data table toolbar').parentElement;
    const panelContainer = toolbar.nextElementSibling;
    const toolbarButtons = within(toolbar).getAllByRole('button');
    const filterToggleButton = toolbarButtons[0];
    // Open filter panel
    await click(filterToggleButton);
    expect(panelContainer).toHaveClass(
      `${blockClass}__table-container--filter-open`
    );
    await waitFor(
      () =>
        expect(
          document.querySelector(`.${blockClass}-filter-panel`)
        ).toBeInTheDocument(),
      {
        timeout: 1000, // Match the animation duration
      }
    );

    const normalCheckbox = screen.getByRole('checkbox', { name: 'Normal' });

    const applyButton = screen.getByRole('button', { name: 'Apply' });
    await click(applyButton);
    const panelCloseButton = screen.getByLabelText('Close filter panel');
    await click(panelCloseButton);
    expect(panelContainer).not.toHaveClass(
      `${blockClass}__table-container--filter-open`
    );

    // Reopen filter panel
    await click(filterToggleButton);
    expect(panelContainer).toHaveClass(
      `${blockClass}__table-container--filter-open`
    );

    // Add value to number input and apply to filter panel
    const visitsInput = screen.getByPlaceholderText(
      'Type a number amount of visits'
    );
    await click(visitsInput);
    await keyboard('5');
    expect(visitsInput).toHaveFocus();
    await click(applyButton);

    // Add value to radio button and apply to filter panel
    const radio = screen.getByRole('radio', { name: 'Developer' });
    await click(radio);
    expect(radio.checked).toEqual(true);

    // Add value to dropdown and apply to filter panel
    const statusAccordion = screen.getByRole('button', { name: 'Status' });
    await click(statusAccordion);
    const statusDropdown = screen.getByLabelText('Marital status dropdown');

    await click(statusDropdown);
    const dropdownOption = screen.getByRole('option', { name: 'single' });
    await click(dropdownOption);
    expect(dropdownOnChange).toHaveBeenCalledTimes(1);

    // Apply radio button change
    const designerRadio = screen.getByRole('radio', { name: 'Designer' });
    await click(designerRadio);
    expect(designerRadio.checked).toEqual(true);
    // Apply valid date filter
    const dateInputs = screen.getAllByPlaceholderText('mm/dd/yyyy');
    await click(dateInputs[0]);
    // Clear previously value from date input
    dateInputs[0].setSelectionRange(0, dateInputs[0].value.length);
    await type(dateInputs[0], '01/01/2024');
    await keyboard('[Escape]');
    await click(dateInputs[1]);
    await keyboard('01/02/2024');
    await keyboard('[Escape]');
    expect(dateInputs[0].value).toEqual('01/01/2024');
    expect(dateInputs[1].value).toEqual('01/02/2024');
    // Reset to "Any" radio filter
    const anyRadio = screen.getByRole('radio', { name: 'Any' });
    await click(anyRadio);
    expect(anyRadio.checked).toEqual(true);
    // Reset number input to empty string
    await click(visitsInput);
    fireEvent.change(visitsInput, { target: { value: '' } });
    expect(visitsInput.value).toEqual('');
    // Apply single checkbox
    await click(normalCheckbox);
    await waitFor(() => expect(normalCheckbox.checked).toEqual(true));
    // Remove checkbox
    await click(normalCheckbox);
    await waitFor(() => expect(normalCheckbox.checked).toEqual(false));
  });

  const FilterUsageError = () => {
    useFilterContext();
    return <div />;
  };

  it('should simulate useFilterContext error', async () => {
    await expect(() => {
      render(<FilterUsageError />);
    }).toThrow('useFilterContext was used outside of its Provider');
  });

  it('should test basic interactions of filter flyout', async () => {
    const updatedFilterProps = { ...flyoutProps };
    // Removing certain properties to test default function parameters in FilterFlyout
    delete updatedFilterProps.panelTitle;
    delete updatedFilterProps.updateMethod;
    delete updatedFilterProps.primaryActionLabel;
    delete updatedFilterProps.secondaryActionLabel;
    delete updatedFilterProps.flyoutIconDescription;
    delete updatedFilterProps.onFlyoutOpen;
    delete updatedFilterProps.onFlyoutClose;
    const { container } = render(
      <FilteringUsage
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: updatedFilterProps,
          updateMethod: 'instant',
        }}
      />
    );
    const toolbar = screen.getByLabelText('data table toolbar').parentElement;
    const flyoutTrigger = within(toolbar).getByRole('button', {
      name: 'Open filters',
    });
    const filterFlyoutTriggerPopover =
      flyoutTrigger.parentElement.parentElement;

    // Open filter flyout
    await click(flyoutTrigger);
    expect(filterFlyoutTriggerPopover.nextElementSibling).toHaveClass(
      `${blockClass}-filter-flyout--open`
    );

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    // Toggle radio button
    const radio = screen.getByRole('radio', { name: 'Developer' });
    await click(radio);
    await click(cancelButton);

    await click(container);
    expect(filterFlyoutTriggerPopover.nextElementSibling).not.toHaveClass(
      `${blockClass}-filter-flyout--open`
    );
  });

  it('should render initial filters in flyout', async () => {
    render(
      <FilteringUsage
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: flyoutProps,
          initialState: {
            filters: [
              {
                id: 'role',
                type: 'radio',
                value: 'developer',
              },
            ],
          },
        }}
      />
    );
    const filterTags = screen.getAllByTitle('Role: developer');
    expect(Array.from(filterTags).length).toEqual(2); // Only one visible tag, but the TagSet renders two tags (one visible and one hidden which is used for measure available space)
  });

  it('should render initial filters in panel', async () => {
    const ref = React.createRef();
    render(
      <FilteringUsage
        ref={ref}
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: testFilterProps(),
          initialState: {
            filters: [
              {
                id: 'role',
                type: 'radio',
                value: 'developer',
              },
            ],
          },
        }}
      />
    );
    const filterTags = screen.getAllByTitle('Role: developer');
    expect(Array.from(filterTags).length).toEqual(2); // Only one visible tag, but the TagSet renders two tags (one visible and one hidden which is used for measure available space)
    const clearButton = screen.getByRole('button', { name: /Clear filters/i });
    await click(clearButton);
    const tableElement = screen.getByRole('table');
    const innerContainer = tableElement.parentElement.parentElement;
    // After filter summary is removed (via Clear filters button) inner should only have 1 child
    expect(innerContainer.childElementCount).toEqual(1);
  });
  const findFilterTagAndRemove = async () => {
    const filterTagCloseButtons = screen.getAllByLabelText('Dismiss');
    const visibleFilterTags = filterTagCloseButtons.filter((el) =>
      el.closest(`.${pkg.prefix}--tag-set__displayed-tag`)
    );
    await click(visibleFilterTags[0]);
    const checkAgainForCloseFilterButton =
      screen.queryAllByLabelText('Dismiss');
    expect(checkAgainForCloseFilterButton).toEqual([]);
  };
  it('should render initial filters in panel and test close button on filter tag', async () => {
    render(
      <FilteringUsage
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: testFilterProps(),
          initialState: {
            filters: [
              {
                id: 'role',
                type: 'radio',
                value: 'developer',
              },
            ],
          },
        }}
      />
    );

    await findFilterTagAndRemove();
  });
  it.skip('should test default `renderDateLabel` displays filter tag as expected', async () => {
    const updatedFilterProps = Object.assign(testFilterProps(), {
      renderDateLabel: null,
    });
    const todayDate = new Date();
    render(
      <FilteringUsage
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: updatedFilterProps,
          initialState: {
            filters: [
              {
                id: 'joined',
                type: 'date',
                value: [
                  new Date('01/01/2022').toLocaleDateString('en-US'),
                  todayDate.toLocaleDateString('en-US'),
                ],
              },
            ],
          },
        }}
      />
    );
    const filterTags = screen.getAllByTitle(
      `Joined: 1/1/2022 - ${todayDate.toLocaleDateString()}`
    );
    filterTags.forEach((filterTag) => {
      expect(filterTag).toBeInTheDocument();
    });
    await findFilterTagAndRemove();
  });
  it('should test removal of checkbox filter tag', async () => {
    render(
      <FilteringUsage
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: testFilterProps(),
          initialState: {
            filters: [
              {
                id: 'passwordStrength',
                type: 'checkbox',
                value: [
                  {
                    id: 'normal',
                    labelText: 'Normal',
                    value: 'normal',
                    selected: true,
                  },
                  {
                    id: 'minor-warning',
                    labelText: 'Minor warning',
                    value: 'minor-warning',
                    selected: false,
                  },
                  {
                    id: 'critical',
                    labelText: 'Critical',
                    value: 'critical',
                    selected: false,
                  },
                ],
              },
            ],
          },
        }}
      />
    );
    await findFilterTagAndRemove();
  });
  it('should test overflow checkbox list and removal of checkbox filter tag', async () => {
    const defaultCheckboxFilters = [
      {
        id: 'normal',
        labelText: 'Normal',
        value: 'normal',
        selected: true,
      },
      {
        id: 'minor-warning',
        labelText: 'Minor warning',
        value: 'minor-warning',
        selected: false,
      },
      {
        id: 'critical',
        labelText: 'Critical',
        value: 'critical',
        selected: false,
      },
    ];
    render(
      <FilteringUsage
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: testFilterProps({ includeManyCheckboxes: true }),
          initialState: {
            filters: [
              {
                id: 'passwordStrength',
                type: 'checkbox',
                value: [...defaultCheckboxFilters, ...generateDummyCheckboxes],
              },
            ],
          },
        }}
      />
    );
    const toolbar = screen.getByLabelText('data table toolbar').parentElement;
    const panelContainer = toolbar.nextElementSibling;
    const toolbarButtons = within(toolbar).getAllByRole('button');
    const filterToggleButton = toolbarButtons[0];
    // Open filter panel
    await click(filterToggleButton);
    expect(panelContainer).toHaveClass(
      `${blockClass}__table-container--filter-open`
    );
    const checkboxTotal = [
      ...defaultCheckboxFilters,
      ...generateDummyCheckboxes,
    ].length;

    await waitFor(
      () =>
        expect(
          document.querySelector(`.${blockClass}-filter-panel`)
        ).toBeInTheDocument(),
      {
        timeout: 1000, // Match the animation duration
      }
    );

    const viewMoreButton = screen.getByRole('button', {
      name: `View all (${checkboxTotal})`,
    });
    expect(viewMoreButton).toBeInTheDocument();
    await click(viewMoreButton);
    const viewLessButton = screen.getByRole('button', { name: 'View less' });
    expect(viewLessButton).toBeInTheDocument();
    await click(viewLessButton);
    expect(viewMoreButton).toBeInTheDocument();
    const checkboxElement = screen.getByRole('checkbox', { name: 'Critical' });
    await click(checkboxElement);
    expect(checkboxElement.checked).toEqual(true);
  });
  it('should handle multiselect filter with empty filtersState without crashing', async () => {
    // This regression test covers rapid state transitions where
    // filtersState[column]?.value may be temporarily undefined.
    const multiSelectFilterProps = createMultiSelectFilterProps({
      includeThirdItem: true,
      id: 'status-multiselect',
      titleText: 'Multiselect title',
    });

    const { rerender } = render(
      <FilteringUsage
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: multiSelectFilterProps,
        }}
      />
    );

    const filterToggleButton = getFilterToggleButton();

    // Open the filter panel and verify the multiselect renders without crashing.
    await click(filterToggleButton);
    expect(
      await screen.findByText('Multiselect title', {}, { timeout: 1000 })
    ).toBeInTheDocument();

    // Simulate a state transition where filtersState may be temporarily empty.
    rerender(
      <FilteringUsage
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: multiSelectFilterProps,
        }}
      />
    );

    // The component should still render and remain functional after rerender.
    expect(
      await screen.findByText('Multiselect title', {}, { timeout: 1000 })
    ).toBeInTheDocument();

    const panelCloseButton = await screen.findByLabelText('Close filter panel');
    await click(panelCloseButton);
  });

  it('should handle multiselect filter selection with normal filtersState', async () => {
    // This test ensures the fix doesn't break normal multiselect behavior
    const multiSelectFilterProps = createMultiSelectFilterProps();

    render(
      <FilteringUsage
        defaultGridProps={{
          ...sharedFilterGridProps,
          filterProps: multiSelectFilterProps,
        }}
      />
    );

    const filterToggleButton = getFilterToggleButton();

    // Open filter panel
    await click(filterToggleButton);

    // Wait for the filter panel to be visible
    const filterPanel = await waitFor(
      () => {
        const panel = document.querySelector(`.${blockClass}-filter-panel`);
        if (!panel) throw new Error('Filter panel not found');
        return panel;
      },
      { timeout: 1000 }
    );
    expect(filterPanel).toBeInTheDocument();

    // Find the multiselect - verifies it renders without errors
    const multiselectLabel = screen.getByText('Multiselect normal');
    expect(multiselectLabel).toBeInTheDocument();

    // The multiselect should be functional and not throw errors
    // This verifies that our defensive fix doesn't break normal operation
    const panelCloseButton = screen.getByLabelText('Close filter panel');
    await click(panelCloseButton);
  });
});

const duplicateOnClickFn = jest.fn();
const addOnClickFn = jest.fn();
const selectAllOnClickFn = jest.fn();
const publishOnClickFn = jest.fn();
const downloadOnClickFn = jest.fn();
const deleteOnClickFn = jest.fn();

const getBatchActions = () => {
  return [
    {
      label: 'Duplicate',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: duplicateOnClickFn,
    },
    {
      label: 'Add',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: addOnClickFn,
    },
    {
      label: 'Select all',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: selectAllOnClickFn,
      type: 'select_all',
    },
    {
      label: 'Publish to catalog',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: publishOnClickFn,
    },
    {
      label: 'Download',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: downloadOnClickFn,
    },
    {
      label: 'Delete',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: deleteOnClickFn,
      hasDivider: true,
      kind: 'danger',
    },
  ];
};

const TestBatch = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(2));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
      DatagridActions,
      DatagridPagination,
      toolbarBatchActionsDisplayMin: 2,
    },
    useSelectRows,
    useSelectAllWithToggle,
    useStickyColumn
  );

  return <Datagrid datagridState={datagridState} />;
};

describe('batch action testing', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    //This will suppress the warning about Arrows16 Component (will be removed in the next major version of @carbon/icons-react).
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  window.innerWidth = 2000;
  let mockElement;

  const isTableToolbar = (el) => {
    return (
      el.classList?.contains(`${pkg.prefix}--datagrid__table-toolbar`) || false
    );
  };

  const setMockWidths = (el, type = 'large') => {
    let width = type === 'large' ? 2000 : type === 'medium' ? 1000 : 320;
    if (isTableToolbar(el)) {
      width = type === 'large' ? 3000 : type === 'medium' ? 1000 : 320;
    } else {
      width = type === 'large' ? 500 : type === 'medium' ? 400 : 320;
    }

    return width;
  };

  describe('with space for two actions and menu button', () => {
    beforeEach(() => {
      mockElement = mockHTMLElement({
        offsetWidth: {
          get: function () {
            return setMockWidths(this);
          },
        },
      });
    });

    afterEach(() => {
      mockElement.mockRestore();
    });

    it('renders batch action and checks for the appropriate rendering based on the current mocked widths', async () => {
      const { container } = render(<TestBatch />);
      const firstCheckbox = screen.getAllByLabelText('Toggle Row Selected')[0];
      await click(firstCheckbox);

      expect(
        container.querySelector(
          `.${carbon.prefix}--batch-actions.${carbon.prefix}--batch-actions--active`
        )
      ).toBeInTheDocument();

      // Given the default offsetWidth mocks, 2 batch actions should be visible
      // in addition to the MenuButton
      await click(screen.getByLabelText(getBatchActions()[0].label));
      expect(duplicateOnClickFn).toHaveBeenCalledTimes(1);

      await click(screen.getByLabelText(getBatchActions()[1].label));
      expect(addOnClickFn).toHaveBeenCalledTimes(1);

      const moreButton = screen.getByText(/More/i);
      expect(moreButton).toBeVisible();
      const downloadButton = screen.queryByText(/Download/i);
      expect(downloadButton).toBeNull();

      const menuButton = screen.getByText(/More/i);
      const cancelButton = screen.getByText(/Cancel/i);
      const selectAllButton = screen.getByText(/^Select all \(\d+\)$/);

      expect(menuButton).toBeInTheDocument();
      await click(menuButton);
      const options = Array.from(
        screen.getByRole('menu', { name: /More/i }).children
      );
      const optionsText = options.map((o) => {
        return o.textContent;
      });
      const remainingBatchActions = [...getBatchActions()].slice(2);

      // Check that the items inside of the MenuButton match the leftover
      // batch action items
      remainingBatchActions.forEach((batchAction, index) => {
        expect(batchAction.label).toEqual(optionsText[index]);
      });

      const checkMenuItem = async (
        remainingBatchIndex,
        clickHandlerFn,
        initiateMenuOpen
      ) => {
        if (initiateMenuOpen) {
          await click(menuButton);
        }
        const displayedMenuElement = document.querySelector(
          `.${carbon.prefix}--menu`
        );
        const menuItems = Array.from(displayedMenuElement.children);

        const menuItem = menuItems.filter(
          (item) =>
            item.textContent === getBatchActions()[remainingBatchIndex].label
        )[0];
        await click(menuItem);
        expect(clickHandlerFn).toHaveBeenCalledTimes(1);
      };

      await checkMenuItem(2, selectAllOnClickFn);
      await checkMenuItem(3, publishOnClickFn, true);
      await checkMenuItem(4, downloadOnClickFn, true);
      await checkMenuItem(5, deleteOnClickFn, true);
      await click(cancelButton);
      await click(firstCheckbox);
      await click(selectAllButton);
    });

    it('renders batch action with select all and checks indeterminate behavior', () => {
      render(<TestBatch />);
      const bodyElement = screen.getAllByRole('rowgroup')[1];
      const allRows = screen.getAllByRole('row');
      // const selectAllCheckbox = within(allRows[0]).getByLabelText('Toggle All Current Page Rows Selected');
      const selectAllCheckbox = within(allRows[0]).getByLabelText('Select all');
      click(selectAllCheckbox);
      const carbonTableToolbar = screen.getByLabelText('data table toolbar');
      expect(carbonTableToolbar).toBeInTheDocument();
      const bodyRows = allRows.filter(
        (r) =>
          !r.classList.contains('c4p--datagrid__head') &&
          !r.classList.contains('c4p--datagrid__expanded-row')
      );
      const firstBodyRow = bodyRows[0];
      const firstRowCheckbox = within(firstBodyRow).getByRole('checkbox');
      click(firstRowCheckbox);
      // Should remove all checked checkboxes in the body
      click(selectAllCheckbox);
      let totalChecked = 0;
      const allBodyCheckboxes = within(bodyElement).getAllByRole('checkbox');
      allBodyCheckboxes.forEach((c) => {
        if (c.checked) {
          totalChecked = totalChecked + 1;
        }
      });
      expect(totalChecked).toEqual(0);
    });
  });
});
