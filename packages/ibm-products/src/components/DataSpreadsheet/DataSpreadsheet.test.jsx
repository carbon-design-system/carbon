/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, useState } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import { DataSpreadsheet } from '.';
import { generateData } from './utils/generateData';
const { click, dblClick, keyboard, tab } = userEvent.setup({
  // delay: null, // prev version
  advanceTimers: jest.advanceTimersByTime,
});

// cspell:words rowcount colcount

const blockClass = `${pkg.prefix}--data-spreadsheet`;
const componentName = DataSpreadsheet.displayName;
const activeCellChangeFn = jest.fn();
const onSelectionAreaChangeFn = jest.fn();

// values to use
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const data = generateData({ rows: 16 });
const defaultProps = {
  columns: [
    {
      Header: 'Row 1',
      accessor: (row, index) => index,
    },
    {
      Header: 'Pet type',
      accessor: 'petType',
    },
    {
      Header: 'First name',
      accessor: 'firstName',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Vet visits',
      accessor: 'visits',
    },
    {
      Header: 'Health',
      accessor: 'health',
    },
  ],
  data,
  selectAllAriaLabel: 'Select all',
  spreadsheetAriaLabel: 'Example data spreadsheet',
};

describe(componentName, () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });
  it('renders a component DataSpreadsheet', async () => {
    render(<DataSpreadsheet {...defaultProps} />);
    expect(screen.getByRole('grid')).toHaveClass(blockClass);
  });

  it('applies className to the containing node', async () => {
    render(<DataSpreadsheet className={className} {...defaultProps} />);
    expect(screen.getByRole('grid')).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    render(<DataSpreadsheet data-testid={dataTestId} {...defaultProps} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<DataSpreadsheet ref={ref} {...defaultProps} />);
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<DataSpreadsheet data-testid={dataTestId} {...defaultProps} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('should call the onActiveCellChange event handler and check that the active cell element has the correct data row and data column attributes', async () => {
    const ref = React.createRef();
    const activeCellChangeFn = jest.fn();
    render(
      <DataSpreadsheet
        {...defaultProps}
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
      />
    );
    const allCells = ref?.current.querySelectorAll(`.${blockClass}__td`);
    const firstDataCell = Array.from(allCells)[1]; // the first cell is a row header so we need to get the second cell element
    await act(() => click(firstDataCell));
    expect(activeCellChangeFn).toHaveBeenCalledTimes(1);
    const activeCellElement = ref?.current.querySelector(
      `.${blockClass}__active-cell--highlight`
    );
    expect(activeCellElement).toHaveAttribute('data-active-row-index', '0'); // active row index is 0 because it's the first cell
    expect(activeCellElement).toHaveAttribute('data-active-column-index', '0'); // active column index is 0 because it's the first cell
    const firstColumnHeader = ref?.current.querySelector(
      `[data-row-index="header"][data-column-index="0"]`
    );
    const firstRowHeader = ref?.current.querySelector(
      `[data-row-index="0"][data-column-index="header"]`
    );
    expect(firstColumnHeader).toHaveClass(`${blockClass}__th--active-header`);
    expect(firstRowHeader).toHaveClass(`${blockClass}__td-th--active-header`);
  });

  it('should select an entire row, adding a selection area', async () => {
    const ref = React.createRef();
    const activeCellChangeFn = jest.fn();
    render(
      <DataSpreadsheet
        {...defaultProps}
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
      />
    );
    const allCells = ref?.current.querySelectorAll(`.${blockClass}__td-th`);
    const firstRowHeaderCell = Array.from(allCells)[0]; // the first item is the first row header cell
    await act(() => click(firstRowHeaderCell));
    expect(activeCellChangeFn).toHaveBeenCalledTimes(1);
    const selectionArea = ref?.current.querySelector(
      `.${blockClass}__selection-area--element`
    );
    expect(selectionArea).toBeInTheDocument();
  });

  it('should select an entire column, adding a selection area, and reorder columns', async () => {
    const ref = React.createRef();
    const { mouseMove, mouseDown, mouseUp } = fireEvent;
    const activeCellChangeFn = jest.fn();
    const onSelectionAreaChangeFn = jest.fn();
    render(
      <DataSpreadsheet
        {...defaultProps}
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );
    const allColumnHeaderCells = ref?.current.querySelectorAll(
      `.${blockClass}__th`
    );
    const firstColumnHeaderCell = Array.from(allColumnHeaderCells)[1]; // the second item is the first column header cell
    const secondColumnHeaderCell = Array.from(allColumnHeaderCells)[2];
    await act(() => click(firstColumnHeaderCell));
    expect(activeCellChangeFn).toHaveBeenCalledTimes(1);
    const selectionArea = ref?.current.querySelector(
      `.${blockClass}__selection-area--element`
    );
    expect(firstColumnHeaderCell).toHaveClass(
      `${blockClass}__th--selected-header`
    );
    expect(selectionArea).toBeInTheDocument();
    expect(onSelectionAreaChangeFn).toHaveBeenCalledTimes(1);

    // Start column reordering
    const firstColumnHeaderText = firstColumnHeaderCell.textContent;
    await act(() => {
      mouseDown(firstColumnHeaderCell);
      mouseMove(secondColumnHeaderCell);
      mouseUp(secondColumnHeaderCell);
    });
    const reorderedHeaderCells = ref?.current.querySelectorAll(
      `.${blockClass}__th`
    );
    const firstColumnHeaderTextAfterReorder =
      Array.from(reorderedHeaderCells)[1].textContent;
    expect(firstColumnHeaderText).not.toEqual(
      firstColumnHeaderTextAfterReorder
    );
  });

  it('should select all cells when clicking on select all cell button', async () => {
    const ref = React.createRef();
    const activeCellChangeFn = jest.fn();
    const onSelectionAreaChangeFn = jest.fn();
    render(
      <DataSpreadsheet
        {...defaultProps}
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );
    const selectAllButton = ref?.current.querySelector(
      `.${blockClass}__th--select-all`
    );
    await act(() => click(selectAllButton));
    expect(activeCellChangeFn).toHaveBeenCalledTimes(1);
    const selectionArea = ref?.current.querySelector(
      `.${blockClass}__selection-area--element`
    );
    const activeCell = ref?.current.querySelector(
      `.${blockClass}__active-cell--highlight[data-active-row-index="0"][data-active-column-index="0"]`
    );
    expect(selectionArea).toBeInTheDocument();
    expect(activeCell).toBeInTheDocument();
    expect(onSelectionAreaChangeFn).toHaveBeenCalledTimes(1);
  });

  const EmptySpreadsheet = forwardRef(({ ...rest }, ref) => {
    const [data, setData] = useState([]);
    const columnsClone = [
      ...defaultProps.columns.filter((item) => item.Header !== 'Row 1'),
    ];
    return (
      <DataSpreadsheet
        {...defaultProps}
        {...rest}
        ref={ref}
        data={data}
        columns={columnsClone}
        onDataUpdate={setData}
      />
    );
  });

  it('should render an empty spreadsheet with 32 rows', async () => {
    const ref = React.createRef();
    const defaultEmptyRowCount = 32;
    render(
      <EmptySpreadsheet ref={ref} defaultEmptyRowCount={defaultEmptyRowCount} />
    );
    const ariaRowCountValue = ref?.current.getAttribute('aria-rowcount');
    expect(Number(ariaRowCountValue)).toEqual(defaultEmptyRowCount);
  });

  const EditableSpreadsheet = forwardRef(({ ...rest }, ref) => {
    const [data, setData] = useState(() => generateData({ rows: 16 }));
    return (
      <DataSpreadsheet
        {...defaultProps}
        {...rest}
        ref={ref}
        columns={defaultProps.columns}
        data={data}
        onDataUpdate={setData}
        id="spreadsheet--id"
      />
    );
  });

  it('should edit the cell contents, submit the change, and confirm the new value exists', async () => {
    const newCellValue = "I'm the new cell value";
    const ref = React.createRef();
    render(
      <EditableSpreadsheet
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );
    const cellToEdit = ref?.current.querySelector(`#${blockClass}__cell--0--1`);
    const cellEditor = ref?.current.querySelector(
      `#${blockClass}__cell-editor-text-area`
    );
    await act(() => click(cellToEdit));
    expect(activeCellChangeFn).toHaveBeenCalled();
    await act(() => keyboard('{Enter}'));
    await act(() => cellEditor.setSelectionRange(0, cellEditor.value.length));
    await act(() => keyboard(newCellValue));
    await act(() => tab());
    await act(() => keyboard('{ArrowLeft}'));

    const activeCellElement = ref?.current.querySelector(
      `.${blockClass}__active-cell--highlight`
    );
    expect(activeCellElement.textContent).toEqual(newCellValue);
  });

  it('should save value after clicking on another cell while in edit mode', async () => {
    const newCellValue = "I'm the new cell value";
    const ref = React.createRef();
    render(
      <EditableSpreadsheet
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );
    const cellToEdit = ref?.current.querySelector(`#${blockClass}__cell--0--1`);
    const cellEditor = ref?.current.querySelector(
      `#${blockClass}__cell-editor-text-area`
    );
    await act(() => click(cellToEdit));
    expect(activeCellChangeFn).toHaveBeenCalled();
    await act(() => keyboard('{Enter}'));
    cellEditor.setSelectionRange(0, cellEditor.value.length);
    await act(() => keyboard(newCellValue));
    const nextCell = ref?.current.querySelector(`#${blockClass}__cell--0--3`);
    await act(() => click(nextCell));

    const updatedCell = ref?.current.querySelector(
      `#${blockClass}__cell--0--1`
    );
    expect(updatedCell.textContent).toEqual(newCellValue);
  });

  it('should set initial placement of active cell on the select all button', async () => {
    const ref = React.createRef();
    const { container } = render(
      <DataSpreadsheet
        {...defaultProps}
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );
    await act(() => container.firstChild.focus());
    await act(() => keyboard('{ArrowDown}'));

    const activeCellElement = ref?.current.querySelector(
      `.${blockClass}__active-cell--highlight`
    );
    expect(activeCellElement.getAttribute('data-active-row-index')).toEqual(
      'header'
    );
    expect(activeCellElement.getAttribute('data-active-column-index')).toEqual(
      'header'
    );
  });

  it('should move the active cell with arrow keys as expected', async () => {
    const ref = React.createRef();
    render(
      <EditableSpreadsheet
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );
    const cellToEdit = ref?.current.querySelector(`#${blockClass}__cell--0--1`);
    await act(() => click(cellToEdit));
    await act(() => keyboard('{ArrowRight}'));

    const activeCellElement = ref?.current.querySelector(
      `.${blockClass}__active-cell--highlight`
    );
    const activeCellRowIndex = activeCellElement.getAttribute(
      'data-active-row-index'
    );
    const activeCellColumnIndex = activeCellElement.getAttribute(
      'data-active-column-index'
    );
    expect(parseInt(activeCellRowIndex)).toEqual(0);
    expect(parseInt(activeCellColumnIndex)).toEqual(2);

    await act(() => keyboard('{ArrowUp}'));
    expect(activeCellElement.getAttribute('data-active-row-index')).toEqual(
      'header'
    );
    expect(
      parseInt(activeCellElement.getAttribute('data-active-column-index'))
    ).toEqual(2);

    await act(() => keyboard('{ArrowDown}'));
    expect(
      parseInt(activeCellElement.getAttribute('data-active-row-index'))
    ).toEqual(0);
    expect(
      parseInt(activeCellElement.getAttribute('data-active-column-index'))
    ).toEqual(2);

    await act(() => keyboard('{ArrowDown}'));
    expect(
      parseInt(activeCellElement.getAttribute('data-active-row-index'))
    ).toEqual(1);
    expect(
      parseInt(activeCellElement.getAttribute('data-active-column-index'))
    ).toEqual(2);
  });

  it('should empty the contents of a cell with the delete key', async () => {
    const ref = React.createRef();
    render(
      <EditableSpreadsheet
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );
    const activeCellElement = ref?.current.querySelector(
      `.${blockClass}__active-cell--highlight`
    );
    const cellToEdit = ref?.current.querySelector(`#${blockClass}__cell--0--1`);
    await act(() => click(cellToEdit));
    expect(activeCellChangeFn).toHaveBeenCalled();
    await act(() => keyboard('{Backspace}'));
    expect(activeCellElement.textContent).toEqual('');

    await act(() => keyboard('{ArrowRight}'));
    await act(() => keyboard('{Delete}'));

    expect(activeCellElement.textContent).toEqual('');

    // Home button should move active cell to first column in the current row
    await act(() => keyboard('{Home}'));
    expect(
      parseInt(activeCellElement.getAttribute('data-active-row-index'))
    ).toEqual(0);
    expect(
      parseInt(activeCellElement.getAttribute('data-active-column-index'))
    ).toEqual(0);

    // Home and resource key should move active cell to first column of the first row
    await act(() => keyboard('{End}'));
    expect(
      parseInt(activeCellElement.getAttribute('data-active-row-index'))
    ).toEqual(0);
    expect(
      parseInt(activeCellElement.getAttribute('data-active-column-index'))
    ).toEqual(defaultProps.columns.length - 1);
  });

  it('should remove spreadsheet focus using tab key', async () => {
    const ref = React.createRef();
    const { container } = render(
      <DataSpreadsheet
        {...defaultProps}
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );

    await act(() => container.firstChild.focus());
    await act(() => tab());
    expect(ref.current).not.toHaveClass(`${blockClass}__container-has-focus`);
  });

  it('should navigate the active cell inside cell headers as expected', async () => {
    const ref = React.createRef();
    const { container } = render(
      <DataSpreadsheet
        {...defaultProps}
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );
    await act(() => {
      container.firstChild.focus();
      keyboard('{ArrowDown}');
    });

    const activeCellElement = ref?.current.querySelector(
      `.${blockClass}__active-cell--highlight`
    );
    expect(activeCellElement.getAttribute('data-active-row-index')).toEqual(
      'header'
    );
    expect(activeCellElement.getAttribute('data-active-column-index')).toEqual(
      'header'
    );

    await act(() => keyboard('{ArrowRight}'));
    expect(activeCellElement.getAttribute('data-active-row-index')).toEqual(
      'header'
    );
    expect(
      parseInt(activeCellElement.getAttribute('data-active-column-index'))
    ).toEqual(0);

    await act(() => keyboard('{ArrowUp}'));
    await act(() => keyboard('{ArrowDown}'));
    await act(() => keyboard('{ArrowLeft}'));

    expect(
      parseInt(activeCellElement.getAttribute('data-active-row-index'))
    ).toEqual(0);
    expect(activeCellElement.getAttribute('data-active-column-index')).toEqual(
      'header'
    );

    await act(() => keyboard('{ArrowLeft}'));
    expect(
      parseInt(activeCellElement.getAttribute('data-active-row-index'))
    ).toEqual(0);
    expect(activeCellElement.getAttribute('data-active-column-index')).toEqual(
      'header'
    );
    await act(() => keyboard('{ArrowRight}'));
    await act(() => keyboard('{ArrowDown}'));
    await act(() => keyboard('{ArrowDown}'));
    await act(() => keyboard('{ArrowUp}'));

    expect(
      parseInt(activeCellElement.getAttribute('data-active-row-index'))
    ).toEqual(1);
    expect(
      parseInt(activeCellElement.getAttribute('data-active-column-index'))
    ).toEqual(0);

    await act(() => keyboard('{ArrowRight}'));
    await act(() => keyboard('{ArrowRight}'));
    await act(() => keyboard('{ArrowRight}'));
    await act(() => keyboard('{ArrowRight}'));
    await act(() => keyboard('{ArrowRight}'));

    expect(
      parseInt(activeCellElement.getAttribute('data-active-row-index'))
    ).toEqual(1);
    expect(
      parseInt(activeCellElement.getAttribute('data-active-column-index'))
    ).toEqual(5);

    // If active cell is positioned in the last column, it shouldn't change position again if right arrow key is pressed
    await act(() => keyboard('{ArrowRight}'));
    expect(
      parseInt(activeCellElement.getAttribute('data-active-row-index'))
    ).toEqual(1);
    expect(
      parseInt(activeCellElement.getAttribute('data-active-column-index'))
    ).toEqual(5);
  });

  it('should go into edit mode with double click on a cell', async () => {
    const ref = React.createRef();
    const { container } = render(
      <DataSpreadsheet
        {...defaultProps}
        ref={ref}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );
    const activeCellElement = ref?.current.querySelector(
      `.${blockClass}__active-cell--highlight`
    );

    await act(() => container.firstChild.focus());
    await act(() => keyboard('{ArrowDown}'));
    await act(() => keyboard('{ArrowDown}'));
    await act(() => keyboard('{ArrowRight}'));
    await act(() => dblClick(activeCellElement));

    const cellEditor = ref?.current.querySelector(
      `#${blockClass}__cell-editor-text-area`
    );
    expect(cellEditor).toHaveClass(`${blockClass}__cell-editor--active`);
  });

  it('should use default values for columns and data if none are provided', async () => {
    const ref = React.createRef();
    render(
      <DataSpreadsheet
        ref={ref}
        onSelectionAreaChange={onSelectionAreaChangeFn}
        spreadsheetAriaLabel="Test label"
        selectAllAriaLabel="Select all test label"
      />
    );
    expect(parseInt(ref?.current.getAttribute('aria-colcount'))).toEqual(0);
    expect(parseInt(ref?.current.getAttribute('aria-rowcount'))).toEqual(0);
  });

  it('should do nothing on meta key usage and prevent default tab key behavior during edit', async () => {
    const ref = React.createRef();
    render(
      <EditableSpreadsheet
        ref={ref}
        onActiveCellChange={activeCellChangeFn}
        onSelectionAreaChange={onSelectionAreaChangeFn}
      />
    );
    const activeCellElement = ref?.current.querySelector(
      `.${blockClass}__active-cell--highlight`
    );

    await act(() => ref?.current.focus());
    await act(() => keyboard('{ArrowDown}'));
    await act(() => keyboard('{ArrowDown}'));
    await act(() => keyboard('{ArrowRight}'));
    await act(() => keyboard('{Meta}'));
    // Tab key during editing should do nothing
    await act(() => dblClick(activeCellElement));
    await act(() => keyboard('{Tab}'));

    expect(ref.current).toHaveClass(`${blockClass}__container-has-focus`);
  });
});
