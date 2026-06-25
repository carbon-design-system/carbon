/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActiveCellCoordinates, PrevState, Size, Theme } from './types';
import {
  Column,
  TableInstance,
  UseColumnOrderInstanceProps,
  useBlockLayout,
  useColumnOrder,
  useTable,
} from 'react-table';
// Import portions of React that are needed.
import React, {
  ForwardedRef,
  LegacyRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useActiveElement, usePreviousValue } from '../../global/js/hooks';
import {
  useMoveActiveCell,
  useMultipleKeyTracking,
  useResetSpreadsheetFocus,
  useSpreadsheetEdit,
  useSpreadsheetOutsideClick,
} from './hooks';

import { DataSpreadsheetBody } from './DataSpreadsheetBody';
import { DataSpreadsheetHeader } from './DataSpreadsheetHeader';
// Other standard imports.
import PropTypes from 'prop-types';
import { createActiveCellFn } from './utils/createActiveCellFn';
import cx from 'classnames';
import { deepCloneObject } from '../../global/js/utils/deepCloneObject';
import { getCellSize } from './utils/getCellSize';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { getScrollbarWidth } from '../../global/js/utils/getScrollbarWidth';
import { handleEditSubmit } from './utils/handleEditSubmit';
import { handleHeaderCellSelection } from './utils/handleHeaderCellSelection';
import { getNodeTextContent } from '../../global/js/utils/getNodeTextContent';
import { handleKeyPress } from './utils/commonEventHandlers';
import { pkg } from '../../settings';
import { removeCellSelections } from './utils/removeCellSelections';
import { selectAllCells } from './utils/selectAllCells';
import uuidv4 from '../../global/js/utils/uuidv4';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--data-spreadsheet`;
const componentName = 'DataSpreadsheet';

// Default values for props
const defaults = {
  columns: Object.freeze([]),
  data: Object.freeze([]),
  defaultEmptyRowCount: 16,
  onDataUpdate: Object.freeze(() => {}),
  onColDrag: Object.freeze(() => {}),
  onActiveCellChange: Object.freeze(() => {}),
  onSelectionAreaChange: Object.freeze(() => {}),
  theme: 'light',
};

export interface DataSpreadsheetProps {
  /**
   * Specifies the cell height
   */
  cellSize?: Size;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * The data that will build the column headers
   */
  columns?: readonly Column<object>[];

  /**
   * Disable column swapping, default false
   */
  disableColumnSwapping?: boolean;

  /**
   * The spreadsheet data that will be rendered in the body of the spreadsheet component
   */
  data?: readonly object[];

  /**
   * Sets the number of empty rows to be created when there is no data provided
   */
  defaultEmptyRowCount?: number;

  /**
   * Check if has custom row header component attached
   */
  hasCustomRowHeader?: boolean;

  /**
   * The spreadsheet id
   */
  id?: number | string;

  /**
   * The event handler that is called when the active cell changes
   */
  onActiveCellChange?: () => void;

  /**
   * Callback for columns after being dragged
   */
  onColDrag?: ({ ...args }) => void;

  /**
   * The setter fn for the data prop
   */
  onDataUpdate?: ({ ...args }) => void;

  /**
   * The event handler that is called when the selection area values change
   */
  onSelectionAreaChange?: () => void;

  /**
   * Read-only table
   */
  readOnlyTable?: boolean;

  /**
   * Position of the custom row numbering component
   */
  renderRowHeaderDirection?: 'left' | 'right';

  /**
   * Component next to numbering rows
   */
  renderRowHeader?: (index: number) => any[];

  /**
   * The aria label applied to the Select all button
   */
  selectAllAriaLabel: string;

  /**
   * The aria label applied to the Data spreadsheet component
   */
  spreadsheetAriaLabel: string;

  /**
   * The theme the DataSpreadsheet should use (only used to render active cell/selection area colors on dark theme)
   */
  theme?: Theme;

  /**
   * The total number of columns to be initially visible, additional columns will be rendered and
   * visible via horizontal scrollbar
   */
  totalVisibleColumns?: number;

  /* TODO: add types and DocGen for all props. */
}

/**
 * DataSpreadsheet: used to organize and display large amounts of structured data, separated by columns and rows in a grid-like format.
 * @deprecated This component is deprecated and will be removed in a future major version. Please migrate to AG Grid, TanStack Table, or Carbon DataTable.
 */
export const DataSpreadsheet = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      cellSize = 'sm',
      className,
      columns = defaults.columns,
      data = defaults.data,
      defaultEmptyRowCount = defaults.defaultEmptyRowCount,
      onDataUpdate = defaults.onDataUpdate,
      onColDrag = defaults.onColDrag,
      id,
      onActiveCellChange = defaults.onActiveCellChange,
      onSelectionAreaChange = defaults.onSelectionAreaChange,
      renderRowHeader,
      renderRowHeaderDirection,
      disableColumnSwapping = false,
      readOnlyTable = false,
      selectAllAriaLabel,
      spreadsheetAriaLabel,
      theme,
      totalVisibleColumns,

      // Collect any other property values passed in.
      ...rest
    }: DataSpreadsheetProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const multiKeyTrackingRef: LegacyRef<HTMLDivElement> = useRef(null);
    const localRef = useRef(undefined);
    const spreadsheetRef = ref || localRef;
    const focusedElement = useActiveElement();
    const [currentColumns, setCurrentColumns] = useState<object>(columns);
    const [pastColumns, setPastColumns] = useState<object[]>([]);
    const [containerHasFocus, setContainerHasFocus] = useState(false);
    const [activeCellCoordinates, setActiveCellCoordinates] =
      useState<ActiveCellCoordinates | null>(null);
    const [selectionAreas, setSelectionAreas] = useState<object[]>([]);
    const [selectionAreaData, setSelectionAreaData] = useState<object[]>([]);
    const [clickAndHoldActive, setClickAndHoldActive] = useState(false);
    const [currentMatcher, setCurrentMatcher] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [cellEditorValue, setCellEditorValue] = useState('');
    const [headerCellHoldActive, setHeaderCellHoldActive] = useState(false);
    const [selectedHeaderReorderActive, setSelectedHeaderReorderActive] =
      useState(false);
    const isBlurSpreadsheet = useRef(false);
    const [isActiveHeaderCellChanged, setIsActiveHeaderCellChanged] =
      useState<boolean>(false);
    const [activeCellInsideSelectionArea, setActiveCellInsideSelectionArea] =
      useState(false);
    const previousState: PrevState =
      usePreviousValue({
        activeCellCoordinates,
        isEditing,
        cellEditorValue,
        selectedHeaderReorderActive,
      }) || {};
    const cellSizeValue = getCellSize(cellSize);
    const cellEditorRef = useRef<HTMLTextAreaElement | undefined>(undefined);
    const [activeCellContent, setActiveCellContent] = useState<any>();
    const activeCellRef = useRef<
      HTMLDivElement | HTMLButtonElement | undefined
    >(undefined);
    const cellEditorRulerRef = useRef<HTMLPreElement | undefined>(undefined);

    const hasCustomRowHeader = typeof renderRowHeader === 'function';
    const maxNumRowsCount = data.length.toString().length;

    const defaultColumn = useMemo(
      () => ({
        width: 150,
        rowHeaderWidth: hasCustomRowHeader ? 40 + maxNumRowsCount * 8.56 : 64,
        rowHeight: cellSizeValue,
      }),
      [cellSizeValue, hasCustomRowHeader, maxNumRowsCount]
    );
    const { keysPressedList, usingMac } = useMultipleKeyTracking({
      ref: multiKeyTrackingRef,
      containerHasFocus,
      isEditing,
    });
    const scrollBarSize = useMemo(() => getScrollbarWidth(), []);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      totalColumnsWidth,
      prepareRow,
      setColumnOrder,
      visibleColumns,
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useBlockLayout,
      useColumnOrder
    ) as UseColumnOrderInstanceProps<any> & TableInstance;

    // Update the spreadsheet data after editing a cell
    const updateData = useCallback(
      (rowIndex, columnId, newValue) => {
        onDataUpdate((prev) =>
          prev.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...prev[rowIndex],
                [columnId]: cellEditorValue || newValue,
              };
            }
            return row;
          })
        );
      },
      [cellEditorValue, onDataUpdate]
    );

    useEffect(() => {
      const currentHeaders: Array<any> = [];
      if (Object.keys(currentColumns).length > 0) {
        Object.keys(currentColumns).forEach((itemIndex) => {
          if (typeof currentColumns[itemIndex].Header === 'object') {
            if (currentColumns[itemIndex].column_name) {
              currentHeaders.push(currentColumns[itemIndex].column_name);
            } else {
              currentHeaders.push(
                getNodeTextContent(currentColumns[itemIndex].Header)
              );
            }
          } else if (currentColumns[itemIndex].Header) {
            currentHeaders.push(currentColumns[itemIndex].Header);
          }
        });
      }

      if (previousState.selectedHeaderReorderActive) {
        setPastColumns(currentHeaders);
      }

      if (
        !previousState.selectedHeaderReorderActive &&
        pastColumns.length > 0 &&
        !headerCellHoldActive &&
        JSON.stringify(currentHeaders) !== JSON.stringify(pastColumns)
      ) {
        onColDrag({
          headers: currentHeaders,
          data: activeCellContent.props.data,
        });
        if (currentHeaders.length === 0) {
          setPastColumns([]);
        }
      }
    }, [
      previousState?.selectedHeaderReorderActive,
      currentColumns,
      headerCellHoldActive,
      columns,
      activeCellContent,
      onColDrag,
      pastColumns,
    ]);

    // Removes the active cell element
    const removeActiveCell = useCallback(() => {
      const activeCellHighlight: HTMLDivElement | null = (
        spreadsheetRef as MutableRefObject<HTMLDivElement>
      )?.current?.querySelector(`.${blockClass}__active-cell--highlight`);
      if (activeCellHighlight) {
        activeCellHighlight.style.display = 'none';
      }
    }, [spreadsheetRef]);

    const removeCellEditor = useCallback(() => {
      setCellEditorValue('');
      setIsEditing(false);
      if (cellEditorRef?.current) {
        cellEditorRef.current.style.display = 'none';
      }
    }, []);

    // Remove cell editor if the active cell coordinates change and save with new cell data, this will
    // happen if you click on another cell while isEditing is true
    useEffect(() => {
      const prevCoords = previousState?.activeCellCoordinates;
      if (
        (prevCoords?.row !== activeCellCoordinates?.row ||
          prevCoords?.column !== activeCellCoordinates?.column) &&
        isEditing
      ) {
        const cellProps =
          rows[Number(prevCoords?.row)].cells[Number(prevCoords?.column)];
        removeCellEditor();
        updateData(prevCoords?.row, cellProps.column.id, undefined);
        if (cellEditorRulerRef?.current) {
          cellEditorRulerRef.current.textContent = '';
        }
      }
      if (
        prevCoords?.row !== activeCellCoordinates?.row ||
        prevCoords?.column !== activeCellCoordinates?.column
      ) {
        if (
          activeCellCoordinates &&
          activeCellCoordinates?.row !== 'header' &&
          activeCellCoordinates?.column !== 'header'
        ) {
          const activeCellFullData =
            typeof activeCellCoordinates?.column === 'number' &&
            typeof activeCellCoordinates?.row === 'number'
              ? rows[activeCellCoordinates?.row].cells[
                  activeCellCoordinates?.column
                ]
              : null;
          if (activeCellFullData) {
            setActiveCellContent(activeCellFullData.render('Cell'));
          } else {
            setActiveCellContent(null);
          }
        }
        if (
          (activeCellCoordinates && activeCellCoordinates?.row === 'header') ||
          activeCellCoordinates?.column === 'header'
        ) {
          setActiveCellContent(null);
          setIsActiveHeaderCellChanged((prev) => !prev);
        }
      }
      // For when we edit and focus out of data spreadsheet
      if (
        isEditing &&
        previousState.activeCellCoordinates &&
        isBlurSpreadsheet.current
      ) {
        setActiveCellContent(previousState.cellEditorValue);
        isBlurSpreadsheet.current = false;
        removeCellEditor();
      }
    }, [
      isBlurSpreadsheet,
      activeCellCoordinates,
      previousState?.activeCellCoordinates,
      previousState?.cellEditorValue,
      updateData,
      rows,
      isEditing,
      removeCellEditor,
      activeCellContent,
    ]);

    const createActiveCell = useCallback(
      ({ placementElement, coords, addToHeader = false }) => {
        const activeCellFullData =
          typeof coords?.column === 'number' && typeof coords?.row === 'number'
            ? rows[coords?.row].cells[coords?.column]
            : null;
        const activeCellValue = activeCellFullData
          ? Object.values(activeCellFullData.row.values)[coords?.column]
          : null;

        createActiveCellFn({
          placementElement,
          coords,
          addToHeader,
          contextRef: spreadsheetRef,
          blockClass,
          onActiveCellChange,
          activeCellValue,
          activeCellRef,
          cellEditorRef,
          defaultColumn,
        });
      },
      [spreadsheetRef, rows, onActiveCellChange, defaultColumn]
    );

    useResetSpreadsheetFocus({
      focusedElement,
      removeActiveCell,
      setContainerHasFocus,
    });

    useSpreadsheetOutsideClick({
      isBlurSpreadsheet,
      spreadsheetRef,
      setActiveCellCoordinates,
      setSelectionAreas,
      removeActiveCell,
      setContainerHasFocus,
      removeCellEditor,
    });

    useMoveActiveCell({
      spreadsheetRef,
      activeCellCoordinates,
      containerHasFocus,
      createActiveCell,
      activeCellContent,
      isActiveHeaderCellChanged,
    });

    const handleInitialArrowPress = useCallback(() => {
      // If activeCellCoordinates is null then we need to set an initial value
      // which will place the activeCell on the select all cell/button
      setActiveCellInsideSelectionArea(false);
      if (!activeCellCoordinates) {
        setActiveCellCoordinates({
          column: 'header',
          row: 'header',
        });
      }
      return;
    }, [activeCellCoordinates]);

    const updateActiveCellCoordinates = useCallback(
      ({
        coords = { ...activeCellCoordinates },
        updatedValue,
        optOutOfSelectionAreaUpdate = false,
      }) => {
        const newActiveCell = {
          ...coords,
          ...updatedValue,
        };
        setActiveCellCoordinates(newActiveCell);
        // Only run if the active cell is _not_ a header cell. This will add a point1 object
        // to selectionAreas every time the active cell changes, allowing us to create cell
        // selections using keyboard. Opting out of the selection area updates here means
        // that the active cell is being moved within a selection area
        if (
          newActiveCell.row !== 'header' &&
          newActiveCell.column !== 'header' &&
          !optOutOfSelectionAreaUpdate
        ) {
          const tempMatcher = uuidv4();
          setSelectionAreas([{ point1: newActiveCell, matcher: tempMatcher }]);
          setCurrentMatcher(tempMatcher);
        }
      },
      [activeCellCoordinates]
    );

    const handleHomeEndKey = useCallback(
      ({ type }) => {
        const coordinatesClone = { ...activeCellCoordinates };
        updateActiveCellCoordinates({
          coords: coordinatesClone,
          updatedValue: {
            column: type === 'Home' ? 0 : columns.length - 1,
          },
        });
        removeCellSelections({ matcher: undefined, spreadsheetRef });
      },
      [
        activeCellCoordinates,
        updateActiveCellCoordinates,
        spreadsheetRef,
        columns.length,
      ]
    );

    const checkForReturnCondition = useCallback(
      (key) => {
        return isEditing || key === 'Meta' || key === 'Control';
      },
      [isEditing]
    );

    const handleArrowKeyPress = useCallback(
      (arrowKey) => {
        event?.preventDefault();
        handleInitialArrowPress();
        const coordinatesClone = { ...activeCellCoordinates };

        let updatedValue;

        switch (arrowKey) {
          // Left
          case 'ArrowLeft': {
            if (coordinatesClone.column === 'header') {
              return;
            }
            if (typeof coordinatesClone.column === 'number') {
              if (coordinatesClone.column === 0) {
                updatedValue = { column: 'header' };
              } else {
                updatedValue = { column: coordinatesClone.column - 1 };
              }
            }
            break;
          }
          // Up
          case 'ArrowUp': {
            if (coordinatesClone.row === 'header') {
              return;
            }
            if (typeof coordinatesClone.row === 'number') {
              // set row back to header if we are at index 0
              if (coordinatesClone.row === 0) {
                updatedValue = { row: 'header' };
              } else {
                // if we are at any other index than 0, subtract 1 from current row index
                updatedValue = { row: coordinatesClone.row - 1 };
              }
            }
            break;
          }
          // Right
          case 'ArrowRight': {
            if (coordinatesClone.column === 'header') {
              updatedValue = { column: 0 };
            }
            if (typeof coordinatesClone.column === 'number') {
              // Prevent active cell coordinates from updating if the active
              // cell is in the last column, ie we can't go any further to the right
              if (columns.length - 1 === coordinatesClone.column) {
                return;
              } else {
                updatedValue = { column: coordinatesClone.column + 1 };
              }
            }
            break;
          }
          // Down
          case 'ArrowDown': {
            if (coordinatesClone.row === 'header') {
              updatedValue = { row: 0 };
            }
            if (typeof coordinatesClone.row === 'number') {
              // Prevent active cell coordinates from updating if the active
              // cell is in the last row, ie we can't go any further down since
              // we are in the last row
              if (rows.length - 1 === coordinatesClone.row) {
                return;
              } else {
                updatedValue = { row: coordinatesClone.row + 1 };
              }
            }
            break;
          }
        }
        if (updatedValue) {
          updateActiveCellCoordinates({
            coords: coordinatesClone,
            updatedValue,
          });
        }
      },
      [
        handleInitialArrowPress,
        updateActiveCellCoordinates,
        activeCellCoordinates,
        columns,
        rows,
      ]
    );

    const handleKeyPressEvent = useCallback(
      (event) => {
        handleKeyPress(
          event,
          activeCellInsideSelectionArea,
          updateActiveCellCoordinates,
          activeCellCoordinates,
          removeActiveCell,
          columns,
          rows,
          spreadsheetRef,
          currentMatcher,
          removeCellEditor,
          selectionAreas,
          handleHomeEndKey,
          keysPressedList,
          usingMac,
          updateData,
          checkForReturnCondition,
          handleArrowKeyPress,
          setSelectionAreas,
          setSelectionAreaData,
          setCurrentMatcher,
          activeCellRef,
          setActiveCellCoordinates,
          setContainerHasFocus,
          setActiveCellContent,
          readOnlyTable
        );
      },
      [
        activeCellInsideSelectionArea,
        updateActiveCellCoordinates,
        activeCellCoordinates,
        removeActiveCell,
        columns,
        rows,
        spreadsheetRef,
        currentMatcher,
        removeCellEditor,
        selectionAreas,
        handleHomeEndKey,
        keysPressedList,
        usingMac,
        updateData,
        checkForReturnCondition,
        handleArrowKeyPress,
        readOnlyTable,
      ]
    );

    const startEditMode = () => {
      setIsEditing(true);
      setClickAndHoldActive(false);
      const activeCellFullData =
        typeof activeCellCoordinates?.column === 'number' &&
        typeof activeCellCoordinates?.row === 'number'
          ? rows[activeCellCoordinates?.row].cells[
              activeCellCoordinates?.column
            ]
          : null;

      const activeCellValue =
        activeCellFullData?.row?.cells?.[Number(activeCellCoordinates?.column)]
          ?.value;

      setCellEditorValue(activeCellValue || '');
      if (cellEditorRulerRef?.current) {
        cellEditorRulerRef.current.textContent = activeCellValue;
      }
      if (cellEditorRef?.current && activeCellRef?.current) {
        cellEditorRef.current.style.width =
          activeCellRef?.current?.style?.width;
      }
    };

    // Sets the initial placement of the cell editor cursor at the end of the text area
    // this is not done for us by default in Safari
    useEffect(() => {
      if (isEditing && !previousState?.isEditing) {
        cellEditorRef?.current?.setSelectionRange(
          Number(cellEditorRulerRef?.current?.textContent?.length),
          Number(cellEditorRulerRef?.current?.textContent?.length)
        );
        cellEditorRef?.current?.focus();
      }
    }, [isEditing, previousState?.isEditing]);

    const handleActiveCellClick = () => {
      if (
        activeCellCoordinates?.row === 'header' ||
        activeCellCoordinates?.column === 'header'
      ) {
        const indexValue =
          activeCellCoordinates?.row === 'header'
            ? activeCellCoordinates?.column
            : activeCellCoordinates?.row;
        if (
          activeCellCoordinates?.row === 'header' &&
          activeCellCoordinates?.column === 'header'
        ) {
          return;
        }
        handleRowColumnHeaderClick({
          isKeyboard: false,
          index: Number(indexValue),
        });
      }
      return;
    };

    // Mouse up on active cell
    const handleActiveCellMouseUp = () => {
      setClickAndHoldActive(false);
    };

    // Mouse down on active cell
    const handleActiveCellMouseDown = () => {
      if (
        activeCellCoordinates?.row !== 'header' ||
        activeCellCoordinates?.column !== 'header'
      ) {
        const tempMatcher = uuidv4();
        setClickAndHoldActive(true);
        removeCellSelections({ matcher: null, spreadsheetRef });
        setSelectionAreas([
          { point1: activeCellCoordinates, matcher: tempMatcher },
        ]);
        setCurrentMatcher(tempMatcher);
        setSelectionAreaData([]);
        setActiveCellInsideSelectionArea(false);
      }
      return;
    };

    // Go into edit mode if 'Enter' key is pressed on activeCellRef
    const handleActiveCellKeyDown = (event) => {
      const { key } = event;
      if (key === 'Enter' && !activeCellInsideSelectionArea && !readOnlyTable) {
        if (
          activeCellCoordinates?.column !== 'header' &&
          activeCellCoordinates?.row !== 'header'
        ) {
          startEditMode();
        }
        if (
          activeCellCoordinates?.row === 'header' ||
          activeCellCoordinates?.column === 'header'
        ) {
          handleRowColumnHeaderClick({ isKeyboard: true });
        }
      }
    };

    const handleRowColumnHeaderClick = ({ isKeyboard, index = -1 }) => {
      const handleHeaderCellProps = {
        activeCellCoordinates,
        rows,
        columns,
        currentMatcher,
        setActiveCellCoordinates,
        setCurrentMatcher,
        setSelectionAreas,
        spreadsheetRef,
        index,
        isKeyboard,
        setSelectionAreaData,
        isHoldingCommandKey: null,
        isHoldingShiftKey: null,
      };
      // Select an entire column
      if (
        activeCellCoordinates?.row === 'header' &&
        activeCellCoordinates?.column !== 'header'
      ) {
        handleHeaderCellSelection({
          type: 'column',
          ...handleHeaderCellProps,
        });
      }
      // Select an entire row
      if (
        activeCellCoordinates?.column === 'header' &&
        activeCellCoordinates?.row !== 'header'
      ) {
        handleHeaderCellSelection({
          type: 'row',
          ...handleHeaderCellProps,
        });
      }
      if (
        activeCellCoordinates?.column === 'header' &&
        activeCellCoordinates?.row === 'header'
      ) {
        selectAllCells({
          ref: spreadsheetRef,
          setCurrentMatcher,
          setSelectionAreas,
          rows,
          columns,
          activeCellCoordinates,
          updateActiveCellCoordinates,
        });
      }
    };

    // Go into edit mode if double click is detected on activeCellRef
    const handleActiveCellDoubleClick = (readOnlyTable: boolean) => {
      if (!readOnlyTable) {
        startEditMode();
      }
    };

    useSpreadsheetEdit({
      isEditing,
      rows,
      activeCellCoordinates,
      activeCellRef,
      cellEditorRef,
      cellEditorRulerRef,
      visibleColumns,
      defaultColumn,
      cellEditorValue,
    });

    // Only update if there are cell selection areas
    // Find point object that matches currentMatcher and remove the second point
    // because hovering over the active cell while clicking and holding should
    // remove the previously existing selection area
    const handleActiveCellMouseEnterCallback = useCallback(
      (areas, clickHold) => {
        if (!currentMatcher) {
          return;
        }
        if (areas && areas.length && clickHold && currentMatcher) {
          setSelectionAreas((prev) => {
            const selectionAreaClone = deepCloneObject(prev);
            const indexOfItemToUpdate = selectionAreaClone.findIndex(
              (item) => item.matcher === currentMatcher
            );
            if (indexOfItemToUpdate === -1) {
              return prev;
            }
            if (
              typeof selectionAreaClone[indexOfItemToUpdate].point2 ===
                'object' &&
              selectionAreaClone[indexOfItemToUpdate].areaCreated
            ) {
              selectionAreaClone[indexOfItemToUpdate].point2 =
                selectionAreaClone[indexOfItemToUpdate].point1;
              selectionAreaClone[indexOfItemToUpdate].areaCreated = false;
              setActiveCellInsideSelectionArea(false);
              removeCellSelections({
                matcher: currentMatcher,
                spreadsheetRef,
              });
              return selectionAreaClone;
            }
            return prev;
          });
        }
      },
      [spreadsheetRef, currentMatcher]
    );

    const handleActiveCellMouseEnter = useCallback(() => {
      handleActiveCellMouseEnterCallback(selectionAreas, clickAndHoldActive);
    }, [
      clickAndHoldActive,
      selectionAreas,
      handleActiveCellMouseEnterCallback,
    ]);
    // cspell:words rowcount colcount
    return (
      <div
        {...rest}
        {...getTableProps()}
        {...getDevtoolsProps(componentName)}
        className={cx(
          blockClass,
          className,
          `${blockClass}--interactive-cell-element`,
          {
            [`${blockClass}__container-has-focus`]: containerHasFocus,
            [`${blockClass}__${theme}`]: theme === 'dark',
          }
        )}
        ref={spreadsheetRef as MutableRefObject<HTMLDivElement>}
        role="grid"
        tabIndex={0}
        aria-rowcount={rows?.length || 0}
        aria-colcount={columns?.length || 0}
        aria-label={spreadsheetAriaLabel}
        onKeyDown={handleKeyPressEvent}
        onFocus={() => setContainerHasFocus(true)}
      >
        <div ref={multiKeyTrackingRef}>
          {/* HEADER */}
          <DataSpreadsheetHeader
            ref={spreadsheetRef as LegacyRef<HTMLDivElement>}
            activeCellCoordinates={activeCellCoordinates}
            cellSize={cellSize}
            columns={columns}
            currentMatcher={currentMatcher}
            defaultColumn={defaultColumn}
            selectedHeaderReorderActive={selectedHeaderReorderActive}
            setSelectedHeaderReorderActive={setSelectedHeaderReorderActive}
            headerGroups={headerGroups}
            rows={rows}
            scrollBarSize={scrollBarSize}
            selectionAreas={selectionAreas}
            setActiveCellCoordinates={setActiveCellCoordinates}
            setSelectionAreas={setSelectionAreas}
            setCurrentMatcher={setCurrentMatcher}
            setSelectionAreaData={setSelectionAreaData}
            disableColumnSwapping={disableColumnSwapping}
            readOnlyTable={readOnlyTable}
            totalVisibleColumns={totalVisibleColumns}
            updateActiveCellCoordinates={updateActiveCellCoordinates}
            setHeaderCellHoldActive={setHeaderCellHoldActive}
            headerCellHoldActive={headerCellHoldActive}
            visibleColumns={visibleColumns}
            selectAllAriaLabel={selectAllAriaLabel}
          />

          {/* BODY */}
          <DataSpreadsheetBody
            activeCellRef={activeCellRef}
            activeCellCoordinates={activeCellCoordinates}
            setCurrentColumns={setCurrentColumns}
            ref={spreadsheetRef as LegacyRef<HTMLDivElement>}
            clickAndHoldActive={clickAndHoldActive}
            setClickAndHoldActive={setClickAndHoldActive}
            currentMatcher={currentMatcher}
            setCurrentMatcher={setCurrentMatcher}
            setContainerHasFocus={setContainerHasFocus}
            selectedHeaderReorderActive={selectedHeaderReorderActive}
            setSelectedHeaderReorderActive={setSelectedHeaderReorderActive}
            selectionAreas={selectionAreas}
            setSelectionAreas={setSelectionAreas}
            headerGroups={headerGroups}
            defaultColumn={defaultColumn}
            getTableBodyProps={getTableBodyProps}
            hasCustomRowHeader={hasCustomRowHeader}
            onDataUpdate={onDataUpdate}
            renderRowHeaderDirection={renderRowHeaderDirection}
            renderRowHeader={renderRowHeader}
            onActiveCellChange={onActiveCellChange}
            onSelectionAreaChange={onSelectionAreaChange}
            prepareRow={prepareRow}
            rows={rows}
            selectionAreaData={selectionAreaData}
            setSelectionAreaData={setSelectionAreaData}
            setActiveCellCoordinates={setActiveCellCoordinates}
            scrollBarSize={scrollBarSize}
            totalColumnsWidth={totalColumnsWidth}
            id={id}
            columns={columns}
            defaultEmptyRowCount={defaultEmptyRowCount}
            setActiveCellInsideSelectionArea={setActiveCellInsideSelectionArea}
            totalVisibleColumns={totalVisibleColumns}
            setHeaderCellHoldActive={setHeaderCellHoldActive}
            setColumnOrder={setColumnOrder}
            visibleColumns={visibleColumns}
          />
          <button
            onMouseDown={handleActiveCellMouseDown}
            onMouseUp={handleActiveCellMouseUp}
            onClick={handleActiveCellClick}
            onKeyDown={handleActiveCellKeyDown}
            onDoubleClick={() => handleActiveCellDoubleClick(readOnlyTable)}
            onMouseEnter={handleActiveCellMouseEnter}
            ref={activeCellRef as LegacyRef<HTMLButtonElement>}
            className={cx(
              `${blockClass}--interactive-cell-element`,
              `${blockClass}__active-cell--highlight`,
              {
                [`${blockClass}__active-cell--with-selection`]:
                  activeCellInsideSelectionArea,
              }
            )}
            type="button"
          >
            {activeCellContent}
          </button>
          <textarea
            id={`${blockClass}__cell-editor-text-area`}
            value={cellEditorValue}
            onKeyDown={handleEditSubmit({
              activeCellCoordinates,
              cellEditorRulerRef,
              columns,
              previousState,
              removeCellEditor,
              rows,
              setActiveCellCoordinates,
              setCurrentMatcher,
              setSelectionAreas,
              spreadsheetRef,
              updateData,
            })}
            onChange={(event) => {
              if (previousState.isEditing) {
                setCellEditorValue(event.target.value);
                if (cellEditorRulerRef?.current) {
                  cellEditorRulerRef.current.textContent = event.target.value;
                }
              }
            }}
            ref={cellEditorRef as LegacyRef<HTMLTextAreaElement>}
            aria-labelledby={
              activeCellCoordinates
                ? `${blockClass}__cell--${activeCellCoordinates?.row}--${activeCellCoordinates?.column}`
                : ''
            }
            className={cx(
              `${blockClass}__cell-editor`,
              `${blockClass}--interactive-cell-element`,
              `${blockClass}__cell-editor--${cellSize}`,
              {
                [`${blockClass}__cell-editor--active`]: isEditing,
              }
            )}
          />
          <pre
            aria-hidden
            ref={cellEditorRulerRef as LegacyRef<HTMLPreElement>}
            className={`${blockClass}__cell-editor-ruler`}
          />
        </div>
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
/**@ts-ignore*/
DataSpreadsheet.deprecated = {
  level: 'warn',
  details: `${componentName} is deprecated and will be removed in a future major version. Please migrate to AG Grid (https://www.ag-grid.com/), TanStack Table (https://tanstack.com/table/), or Carbon DataTable.`,
};
DataSpreadsheet.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
DataSpreadsheet.propTypes = {
  /**
   * Specifies the cell height
   */
  cellSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * The data that will build the column headers
   */
  /**@ts-ignore */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
      accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      Cell: PropTypes.func, // optional cell formatter
    })
  ),

  /**
   * The spreadsheet data that will be rendered in the body of the spreadsheet component
   */
  /**@ts-ignore */
  data: PropTypes.arrayOf(PropTypes.shape),

  /**
   * Sets the number of empty rows to be created when there is no data provided
   */
  defaultEmptyRowCount: PropTypes.number,

  /**
   * Disable column swapping, default false
   */
  disableColumnSwapping: PropTypes.bool,

  /**
   * Check if spreadsheet is using custom row header component attached
   */
  hasCustomRowHeader: PropTypes.bool,

  /**
   * The spreadsheet id
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The event handler that is called when the active cell changes
   */
  onActiveCellChange: PropTypes.func,

  /**
   * Callback for when columns are dropped after dragged
   */
  onColDrag: PropTypes.func,

  /**
   * The setter fn for the data prop
   */
  onDataUpdate: PropTypes.func,

  /**
   * The event handler that is called when the selection area values change
   */
  onSelectionAreaChange: PropTypes.func,

  /**
   * Read-only table
   */
  readOnlyTable: PropTypes.bool,

  /**
   * Component next to numbering rows
   */
  renderRowHeader: PropTypes.func,

  /**
   * Component next to numbering rows
   */
  renderRowHeaderDirection: PropTypes.oneOf(['left', 'right']),
  /**
   * The aria label applied to the Select all button
   */
  selectAllAriaLabel: PropTypes.string.isRequired,

  /**
   * The aria label applied to the Data spreadsheet component
   */
  spreadsheetAriaLabel: PropTypes.string.isRequired,

  /**
   * The theme the DataSpreadsheet should use (only used to render active cell/selection area colors on dark theme)
   */
  theme: PropTypes.oneOf(['light', 'dark']),

  /**
   * The total number of columns to be initially visible, additional columns will be rendered and
   * visible via horizontal scrollbar
   */
  totalVisibleColumns: PropTypes.number,

  /* TODO: add types and DocGen for all props. */
};
