/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  useState,
  ForwardedRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import cx from 'classnames';
import { px } from '@carbon/layout';

import { pkg } from '../../settings';
import { deepCloneObject } from '../../global/js/utils/deepCloneObject';
import { usePreviousValue } from '../../global/js/hooks';

import { removeCellSelections } from './utils/removeCellSelections';
import { createCellSelectionArea } from './utils/createCellSelectionArea';
import { checkActiveHeaderCell } from './utils/checkActiveHeaderCell';
import { checkSelectedHeaderCell } from './utils/checkSelectedHeaderCell';
import { getSpreadsheetWidth } from './utils/getSpreadsheetWidth';

import { useSpreadsheetMouseUp } from './hooks';
import {
  handleBodyCellClick,
  handleBodyCellHover,
  handleRowHeaderClick,
} from './utils/commonEventHandlers';
import { prepareProps } from '../../global/js/utils/props-helper';
import { ActiveCellCoordinates, PrevState, SpreadsheetColumn } from './types';
import {
  Column,
  IdType,
  TableBodyPropGetter,
  TableBodyProps,
} from 'react-table';

const blockClass = `${pkg.prefix}--data-spreadsheet`;

interface DataSpreadsheetBodyProps {
  /**
   * Object containing the active cell coordinates
   */
  activeCellCoordinates?: ActiveCellCoordinates | null;

  /**
   *This is the ref of the button input, which is the active cell element
   */
  activeCellRef?: MutableRefObject<HTMLElement | undefined>;
  /**
   * Is the user clicking and holding in the data spreadsheet body
   */
  clickAndHoldActive?: boolean;

  /**
   * All of the spreadsheet columns
   */
  columns?: readonly Column<object>[];

  /**
   * This represents the id of the current cell selection area
   */
  currentMatcher?: string;

  /**
   * Default spreadsheet sizing values
   */
  defaultColumn?: SpreadsheetColumn;

  /**
   * Sets the number of empty rows to be created when there is no data provided
   */
  defaultEmptyRowCount?: number;

  /**
   * Function to set table body prop values
   */
  getTableBodyProps: (propGetter?: TableBodyPropGetter<any>) => TableBodyProps;

  /**
   * Headers provided from useTable hook
   */
  headerGroups?: any[];

  /**
   * The spreadsheet id
   */
  id?: number | string;

  /**
   * Set current columns after drag drop
   */
  setCurrentColumns?: Dispatch<SetStateAction<object[]>>;

  /**
   * The event handler that is called when the active cell changes
   */
  onActiveCellChange?: () => void;

  /**
   * Check if user is using custom component
   */
  hasCustomRowHeader?: boolean;

  /**
   * Component next to numbering rows
   */
  renderRowHeader?: (index: number) => any[];

  /**
   * Component next to numbering rows
   */
  renderRowHeaderDirection?: string;

  /**
   * The event handler that is called to set the rows for the empty spreadsheet
   */
  onDataUpdate?: ({ ...args }) => void;

  /**
   * The event handler that is called when the selection areas change
   */
  onSelectionAreaChange?: ({ ...args }) => void;

  /**
   * Prepare row function from react-table
   */
  prepareRow?: (...args) => void;

  /**
   * All of the spreadsheet row data
   */
  rows?: any[];

  /**
   * The scrollbar width
   */
  scrollBarSize?: number;

  /**
   * Array of selection area data
   */
  selectionAreaData?: any[];

  /**
   * Header reordering is active
   */
  selectedHeaderReorderActive?: boolean;

  /**
   * Set header reordering active or not
   */
  setSelectedHeaderReorderActive?: Dispatch<SetStateAction<boolean>>;

  /**
   * Array of selection areas
   */
  selectionAreas?: any[];

  /**
   * Setter fn for activeCellCoordinates state value
   */
  setActiveCellCoordinates?: Dispatch<
    SetStateAction<ActiveCellCoordinates | null>
  >;

  /**
   * Setter fn for active cell inside of selection area
   */
  setActiveCellInsideSelectionArea?: Dispatch<SetStateAction<boolean>>;

  /**
   * Setter fn for clickAndHold state value
   */
  setClickAndHoldActive?: Dispatch<SetStateAction<boolean>>;

  /**
   * Setter fn for column ordering, provided from react-table
   */
  setColumnOrder?: (
    updater:
      | ((columnOrder: Array<IdType<any>>) => Array<IdType<any>>)
      | Array<IdType<any>>
  ) => void;

  /**
   * Setter fn for containerHasFocus state value
   */
  setContainerHasFocus?: Dispatch<SetStateAction<boolean>>;

  /**
   * Setter fn for currentMatcher state value
   */
  setCurrentMatcher?: Dispatch<SetStateAction<string>>;

  /**
   * Setter fn for header cell hold active value
   */
  setHeaderCellHoldActive?: Dispatch<SetStateAction<boolean>>;

  /**
   * Setter fn for selectionAreaData state value
   */
  setSelectionAreaData?: Dispatch<SetStateAction<object[]>>;

  /**
   * Setter fn for selectionAreas state value
   */
  setSelectionAreas?: Dispatch<SetStateAction<object[]>>;

  /**
   * The total columns width
   */
  totalColumnsWidth?: number;

  /**
   * The total number of columns to be initially visible, additional columns will be rendered and
   * visible via horizontal scrollbar
   */
  totalVisibleColumns?: number;

  /**
   * Prop from react-table used to reorder columns
   */
  visibleColumns?: Column<object>[];
}

export const DataSpreadsheetBody = forwardRef(
  (
    {
      activeCellRef,
      columns,
      activeCellCoordinates,
      defaultColumn,
      defaultEmptyRowCount,
      getTableBodyProps,
      headerGroups,
      setCurrentColumns,
      id,
      onDataUpdate,
      renderRowHeader,
      renderRowHeaderDirection,
      hasCustomRowHeader,
      prepareRow,
      rows,
      selectionAreaData,
      setSelectionAreaData,
      setActiveCellCoordinates,
      selectedHeaderReorderActive,
      setSelectedHeaderReorderActive,
      selectionAreas,
      setContainerHasFocus,
      setSelectionAreas,
      scrollBarSize,
      totalColumnsWidth,
      clickAndHoldActive,
      setClickAndHoldActive,
      currentMatcher,
      setCurrentMatcher,
      onSelectionAreaChange,
      setActiveCellInsideSelectionArea,
      totalVisibleColumns,
      setHeaderCellHoldActive,
      setColumnOrder,
      visibleColumns,
    }: DataSpreadsheetBodyProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [validStartingPoint, setValidStartingPoint] = useState(false);
    const contentScrollRef = useRef<HTMLDivElement | undefined>(undefined);

    const previousState: PrevState =
      usePreviousValue({
        selectionAreaData,
        clickAndHoldActive,
        rowHeight: defaultColumn?.rowHeight,
      }) || {};

    // Set custom css property containing the spreadsheet total width
    useEffect(() => {
      (ref as MutableRefObject<HTMLDivElement>)?.current.style.setProperty(
        `--${blockClass}--total-width`,
        px((totalColumnsWidth || 0) + (scrollBarSize || 0))
      );
    }, [ref, scrollBarSize, totalColumnsWidth]);

    // Call the `onSelectionAreaChange` handler to send selection area data
    // back to the consumer
    useEffect(() => {
      if (selectionAreaData?.length) {
        let selectionChanged = false;
        if (
          previousState?.selectionAreaData?.length !==
            selectionAreaData?.length ||
          selectionAreaData?.[0]?.cells.length !==
            previousState?.selectionAreaData?.[0]?.cells.length
        ) {
          selectionChanged = true;
        }

        if (
          (!clickAndHoldActive && previousState?.clickAndHoldActive) ||
          selectionChanged
        ) {
          onSelectionAreaChange?.(selectionAreaData);
        }
      }
    }, [
      previousState?.selectionAreaData,
      selectionAreaData,
      onSelectionAreaChange,
      clickAndHoldActive,
      previousState?.clickAndHoldActive,
    ]);

    // Create cell selection areas based on selectionAreas array
    useEffect(() => {
      if (selectionAreas && selectionAreas.length) {
        selectionAreas.map((area) => {
          // Setup selection area data that will be sent back to consumer via onSelectionAreaChange prop
          if (area.areaCreated) {
            const rowStart = Math.min(area.point1.row, area.point2.row);
            const rowEnd = Math.max(area.point1.row, area.point2.row);
            const columnStart = Math.min(
              area.point1.column,
              area.point2.column
            );
            const columnEnd = Math.max(area.point1.column, area.point2.column);
            const selectionData = {
              rows: {
                start: rowStart,
                end: rowEnd,
              },
              columns: {
                start: columnStart,
                end: columnEnd,
              },
              cells: populateSelectionAreaCellData({
                rowStart,
                rowEnd,
                columnStart,
                columnEnd,
              }),
              selectionId: area.matcher,
            };
            setSelectionAreaData?.((prev) => {
              const prevValues = deepCloneObject(prev);
              const newAreaData = prevValues.filter(
                (item) => item.selectionId !== area.matcher
              );
              return [...newAreaData, selectionData];
            });
          }
          if (!area.areaCreated && area.point1 && area.point2 && area.matcher) {
            createCellSelectionArea({
              ref,
              area,
              blockClass,
              defaultColumn,
              selectionAreas,
              setSelectionAreas,
              setActiveCellInsideSelectionArea,
              visibleColumns,
            });
          }
          return;
        });
      }
    }, [
      selectionAreas,
      setSelectionAreas,
      defaultColumn,
      onSelectionAreaChange,
      setSelectionAreaData,
      ref,
      activeCellCoordinates,
      setActiveCellInsideSelectionArea,
      visibleColumns,
      hasCustomRowHeader,
    ]);

    const populateSelectionAreaCellData = ({
      rowStart,
      rowEnd,
      columnStart,
      columnEnd,
    }) => {
      const cellContainer: (number | string)[][] = [];
      for (let rowIndex = rowStart; rowIndex <= rowEnd; rowIndex++) {
        for (
          let columnIndex = columnStart;
          columnIndex <= columnEnd;
          columnIndex++
        ) {
          cellContainer.push([
            rowIndex,
            columnIndex,
            `${blockClass}__cell--${rowIndex}--${columnIndex}`,
          ]);
        }
      }
      return cellContainer;
    };

    useSpreadsheetMouseUp({
      currentMatcher,
      setClickAndHoldActive,
      setSelectionAreas,
      setValidStartingPoint,
      selectedHeaderReorderActive,
      setSelectedHeaderReorderActive,
      validStartingPoint,
      ref,
      setHeaderCellHoldActive,
      setColumnOrder,
      visibleColumns,
      setActiveCellCoordinates,
      rows,
      activeCellCoordinates,
      defaultColumn,
      selectionAreas,
    });

    // Make sure that if the cellSize prop changes, the active
    // cell also gets updated with the new size and new top placement
    // value. All of the cell selections will be updated as well
    useEffect(() => {
      let listContainer;
      let activeCellButton;
      if (spreadsheetBodyRef?.current) {
        listContainer = spreadsheetBodyRef?.current;
        activeCellButton = listContainer?.querySelector(
          `.${blockClass}__active-cell--highlight`
        );
      }
      if (
        activeCellButton &&
        defaultColumn?.rowHeight !== previousState.rowHeight
      ) {
        activeCellButton.style.height = `${defaultColumn?.rowHeight}px`;
        if (activeCellCoordinates) {
          const activeTargetElement = (
            ref as MutableRefObject<HTMLDivElement>
          )?.current.querySelector(
            `[data-row-index="${activeCellCoordinates.row}"][data-column-index="${activeCellCoordinates.column}"]`
          );
          const listContainer = (
            ref as MutableRefObject<HTMLDivElement>
          )?.current.querySelector(`.${blockClass}__list--container`);
          let newActiveCellTopPosition;
          if (activeTargetElement && listContainer) {
            newActiveCellTopPosition =
              activeTargetElement?.getBoundingClientRect().top -
              listContainer.getBoundingClientRect().top;
          }
          activeCellButton.style.top = px(newActiveCellTopPosition);
          removeCellSelections({ matcher: undefined, spreadsheetRef: ref });
          selectionAreas?.map((area) => {
            if (
              !area.areaCreated &&
              area.point1 &&
              area.point2 &&
              area.matcher
            ) {
              return createCellSelectionArea({
                ref,
                area,
                blockClass,
                defaultColumn,
                selectionAreas,
                setSelectionAreas,
                setActiveCellInsideSelectionArea,
                visibleColumns,
              });
            }
          });
        }
      }
    }, [
      defaultColumn,
      ref,
      activeCellCoordinates,
      previousState?.rowHeight,
      selectionAreas,
      setActiveCellInsideSelectionArea,
      setSelectionAreas,
      visibleColumns,
      hasCustomRowHeader,
    ]);

    //this method will check for any duplicate selection area and remove.
    //same selections are those have the same height, width, top, left styles. These inline styles are being set in createCellSelection util.
    const removeDuplicateSelections = useCallback(() => {
      const uniqueAttrArray: string[] = [],
        removedSelectionAreaMatcherArr: (string | null)[] = [];
      (ref as MutableRefObject<HTMLDivElement>)?.current
        .querySelectorAll(`.${blockClass}__selection-area--element`)
        .forEach((selectorEl) => {
          const { top, left, height, width } = (selectorEl as HTMLElement)
            .style;
          const uniqueAttrStr = `${top}${left}${height}${width}`; // eg: 20px30px70px90px
          if (uniqueAttrArray.indexOf(uniqueAttrStr) == -1) {
            uniqueAttrArray.push(uniqueAttrStr);
          } else {
            selectorEl.remove(); // this is identified as duplicate selection and hence removing.
            removedSelectionAreaMatcherArr.push(
              selectorEl.getAttribute('data-matcher-id')
            );
          }
        });

      //clean the duplicate selectionAreaData and selectionArea
      if (removedSelectionAreaMatcherArr.length) {
        setSelectionAreas?.((prev) => {
          const prevValues = deepCloneObject(prev);
          return prevValues.filter(
            (item) => !removedSelectionAreaMatcherArr.includes(item.matcher)
          );
        });
        setSelectionAreaData?.((prev) => {
          const prevValues = deepCloneObject(prev);
          return prevValues.filter(
            (item) => !removedSelectionAreaMatcherArr.includes(item.selectionId)
          );
        });
      }
    }, [ref, setSelectionAreas, setSelectionAreaData]);

    //selectionAreas will be set when ever a selection area is made.
    useEffect(() => {
      removeDuplicateSelections();
    }, [selectionAreas, removeDuplicateSelections]);

    // onClick fn for each cell in the data spreadsheet body,
    // adds the active cell highlight

    const handleBodyCellClickEvent = useCallback(
      (cell, columnIndex) => {
        return (event) => {
          handleBodyCellClick(
            cell,
            columnIndex,
            event,
            currentMatcher,
            activeCellCoordinates,
            selectionAreas,
            setActiveCellCoordinates,
            setSelectionAreas,
            setContainerHasFocus,
            setClickAndHoldActive,
            setCurrentMatcher,
            ref,
            setSelectionAreaData,
            setActiveCellInsideSelectionArea,
            activeCellRef,
            setValidStartingPoint
          );
        };
      },
      [
        currentMatcher,
        activeCellCoordinates,
        selectionAreas,
        setActiveCellCoordinates,
        setSelectionAreas,
        setContainerHasFocus,
        setClickAndHoldActive,
        setCurrentMatcher,
        ref,
        setSelectionAreaData,
        setActiveCellInsideSelectionArea,
        activeCellRef,
      ]
    );

    const handleBodyScroll = () => {
      const headerRowElement =
        (ref as MutableRefObject<HTMLDivElement>).current.querySelector(`
        .${blockClass}__header--container .${blockClass}__tr`) ||
        new HTMLDivElement();
      headerRowElement.scrollLeft = (
        contentScrollRef as MutableRefObject<HTMLDivElement>
      )?.current.scrollLeft;
    };

    useEffect(() => {
      (
        contentScrollRef as MutableRefObject<HTMLDivElement>
      ).current.addEventListener('scroll', () => handleBodyScroll());
      const contentScrollElementRef =
        contentScrollRef.current || new HTMLElement();
      return () => {
        contentScrollElementRef.removeEventListener('scroll', handleBodyScroll);
      };
    });

    const handleBodyCellHoverEvent = useCallback(
      (cell, columnIndex) => {
        return () => {
          handleBodyCellHover(
            cell,
            columnIndex,
            clickAndHoldActive,
            currentMatcher,
            setSelectionAreas
          );
        };
      },
      [clickAndHoldActive, currentMatcher, setSelectionAreas]
    );

    const handleRowHeaderClickEvent = useCallback(
      (index) => {
        return (event) => {
          handleRowHeaderClick(
            index,
            event,
            columns,
            ref,
            setSelectionAreas,
            setCurrentMatcher,
            setActiveCellCoordinates,
            activeCellCoordinates,
            rows,
            setSelectionAreaData
          );
        };
      },
      [
        columns,
        ref,
        setSelectionAreas,
        setCurrentMatcher,
        setActiveCellCoordinates,
        activeCellCoordinates,
        rows,
        setSelectionAreaData,
      ]
    );

    // Builds the empty rows and calls `onDataUpdate` to set the new empty rows
    // using defaultEmptyRowCount to determine how many empty rows are created.
    useEffect(() => {
      if (!rows?.length) {
        const buildEmptyRows = () => {
          const emptyRowData: object[] = [];
          [...Array(defaultEmptyRowCount)].map(() => {
            const emptyCell = {};
            headerGroups?.[0]?.headers.map((header) => {
              emptyCell[header.id] = null;
            });
            emptyRowData.push(emptyCell);
          });
          onDataUpdate?.(emptyRowData);
        };
        buildEmptyRows();
      }
      if (headerGroups?.[0] && typeof setCurrentColumns === 'function') {
        const headers = headerGroups[0].headers;
        setCurrentColumns(headers);
      }
    }, [
      rows,
      headerGroups,
      defaultEmptyRowCount,
      onDataUpdate,
      setCurrentColumns,
    ]);

    const RenderEmptyRows = () => {
      return <div />;
    };

    // Renders each row/cell in the spreadsheet body
    const RenderRow = useCallback(
      ({ index, style }) => {
        const row = rows?.[index];
        if (rows && rows.length) {
          prepareRow?.(row);
          const rowProps = prepareProps(row.getRowProps({ style }), 'key');
          return (
            <div
              key={{ ...row.getRowProps().key }}
              {...rowProps}
              className={cx(`${blockClass}__tr`)}
              data-row-index={index}
              aria-rowindex={index + 1}
              aria-owns={`${blockClass}__cell-editor-text-area`}
            >
              {/* ROW HEADER BUTTON */}
              <div
                role="rowheader"
                className={`${blockClass}__td-th--cell-container`}
              >
                <button
                  id={`${blockClass}__cell--${index}--header`}
                  tabIndex={-1}
                  data-row-index={index}
                  data-column-index="header"
                  type="button"
                  onClick={handleRowHeaderClickEvent(index)}
                  className={cx(
                    `${blockClass}__td`,
                    `${blockClass}__td-th`,
                    `${blockClass}--interactive-cell-element`,
                    {
                      [`${blockClass}__td_custom`]: hasCustomRowHeader
                        ? true
                        : false,
                      [`${blockClass}__td-th--active-header`]:
                        !hasCustomRowHeader &&
                        (activeCellCoordinates?.row === index ||
                          checkActiveHeaderCell(index, selectionAreas, 'row')),
                      [`${blockClass}__td-th--selected-header`]:
                        !hasCustomRowHeader &&
                        checkSelectedHeaderCell(
                          index,
                          selectionAreas,
                          'row',
                          columns
                        ),
                    }
                  )}
                  style={{
                    width: defaultColumn?.rowHeaderWidth,
                    flexDirection: hasCustomRowHeader
                      ? renderRowHeaderDirection === 'Left'
                        ? 'row-reverse'
                        : row
                      : undefined,
                  }}
                >
                  {index + 1}
                  {hasCustomRowHeader &&
                    typeof renderRowHeader === 'function' &&
                    renderRowHeader(index)}
                </button>
              </div>
              {/* CELL BUTTONS */}
              {row.cells.map((cell, index) => {
                const cellProps = prepareProps(cell.getCellProps(), 'key');
                return (
                  <div
                    key={`cell_${index}`}
                    aria-colindex={index + 1}
                    {...cellProps}
                    role="gridcell"
                    style={{
                      ...cell.getCellProps().style,
                      display: 'grid',
                      minWidth: cell?.column?.width || defaultColumn?.width,
                    }}
                  >
                    <button
                      id={`${blockClass}__cell--${cell.row.index}--${index}`}
                      tabIndex={-1}
                      data-row-index={cell.row.index}
                      data-column-index={index}
                      className={cx(
                        `${blockClass}__td`,
                        `${blockClass}__body--td`,
                        `${blockClass}--interactive-cell-element`
                      )}
                      onMouseDown={handleBodyCellClickEvent(cell, index)}
                      onMouseOver={handleBodyCellHoverEvent(cell, index)}
                      onFocus={() => {}}
                      type="button"
                    >
                      {cell.render('Cell')}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        }
      },
      [
        prepareRow,
        renderRowHeader,
        rows,
        hasCustomRowHeader,
        activeCellCoordinates?.row,
        selectionAreas,
        handleRowHeaderClickEvent,
        handleBodyCellClickEvent,
        handleBodyCellHoverEvent,
        columns,
        defaultColumn,
        renderRowHeaderDirection,
      ]
    );

    const spreadsheetBodyRef = useRef(undefined);
    return (
      <div
        ref={spreadsheetBodyRef as MutableRefObject<any>}
        className={cx(`${blockClass}__body--container`)}
        {...getTableBodyProps?.()}
      >
        <FixedSizeList
          className={cx(
            `${blockClass}__list--container`,
            `${blockClass}__list--container--${id}`
          )}
          height={400}
          itemCount={rows?.length || defaultEmptyRowCount}
          itemSize={defaultColumn?.rowHeight}
          width={getSpreadsheetWidth({
            headerGroup: undefined,
            type: undefined,
            scrollBarSizeValue: scrollBarSize,
            totalVisibleColumns,
            defaultColumn,
            totalColumnsWidth,
            visibleColumns,
          })}
          outerRef={contentScrollRef}
        >
          {rows?.length ? RenderRow : RenderEmptyRows}
        </FixedSizeList>
      </div>
    );
  }
);

DataSpreadsheetBody.propTypes = {
  /**
   * Object containing the active cell coordinates
   */
  /**@ts-ignore */
  activeCellCoordinates: PropTypes.shape({
    row: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    column: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),

  /**
   *This is the ref of the button input, which is the active cell element
   */
  /**@ts-ignore */
  activeCellRef: PropTypes.object,
  /**
   * Is the user clicking and holding in the data spreadsheet body
   */
  clickAndHoldActive: PropTypes.bool,

  /**
   * All of the spreadsheet columns
   */
  columns: PropTypes.array,

  /**
   * This represents the id of the current cell selection area
   */
  currentMatcher: PropTypes.string,

  /**
   * Default spreadsheet sizing values
   */
  /**@ts-ignore */
  defaultColumn: PropTypes.shape({
    rowHeight: PropTypes.number,
    rowHeaderWidth: PropTypes.number,
    width: PropTypes.number,
  }),

  /**
   * Sets the number of empty rows to be created when there is no data provided
   */
  defaultEmptyRowCount: PropTypes.number,

  /**
   * Function to set table body prop values
   */
  /**@ts-ignore */
  getTableBodyProps: PropTypes.func,

  /**
   * Check if spreadsheet is using custom row header component attached
   */
  hasCustomRowHeader: PropTypes.bool,

  /**
   * Headers provided from useTable hook
   */
  headerGroups: PropTypes.arrayOf(PropTypes.object),

  /**
   * The spreadsheet id
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The event handler that is called when the active cell changes
   */
  onActiveCellChange: PropTypes.func,

  /**
   * The event handler that is called to set the rows for the empty spreadsheet
   */
  onDataUpdate: PropTypes.func,

  /**
   * The event handler that is called when the selection areas change
   */
  onSelectionAreaChange: PropTypes.func,

  /**
   * Prepare row function from react-table
   */
  prepareRow: PropTypes.func,

  /**
   * Component next to numbering rows
   */
  renderRowHeader: PropTypes.func,

  /**
   * Component next to numbering rows
   */
  renderRowHeaderDirection: PropTypes.string,

  /**
   * All of the spreadsheet row data
   */
  rows: PropTypes.arrayOf(PropTypes.object),

  /**
   * The scrollbar width
   */
  scrollBarSize: PropTypes.number,

  /**
   * Header reordering is active
   */
  selectedHeaderReorderActive: PropTypes.bool,

  /**
   * Array of selection area data
   */
  selectionAreaData: PropTypes.array,

  /**
   * Array of selection areas
   */
  selectionAreas: PropTypes.array,

  /**
   * Setter fn for activeCellCoordinates state value
   */
  setActiveCellCoordinates: PropTypes.func,

  /**
   * Setter fn for active cell inside of selection area
   */
  setActiveCellInsideSelectionArea: PropTypes.func,

  /**
   * Setter fn for clickAndHold state value
   */
  setClickAndHoldActive: PropTypes.func,

  /**
   * Setter fn for column ordering, provided from react-table
   */
  setColumnOrder: PropTypes.func,

  /**
   * Setter fn for containerHasFocus state value
   */
  setContainerHasFocus: PropTypes.func,

  /**
   * Set current columns after drag drop
   */
  setCurrentColumns: PropTypes.func,

  /**
   * Setter fn for currentMatcher state value
   */
  setCurrentMatcher: PropTypes.func,

  /**
   * Setter fn for header cell hold active value
   */
  setHeaderCellHoldActive: PropTypes.func,

  /**
   * Set header reordering active or not
   */
  setSelectedHeaderReorderActive: PropTypes.func,

  /**
   * Setter fn for selectionAreaData state value
   */
  setSelectionAreaData: PropTypes.func,

  /**
   * Setter fn for selectionAreas state value
   */
  setSelectionAreas: PropTypes.func,

  /**
   * The total columns width
   */
  totalColumnsWidth: PropTypes.number,

  /**
   * The total number of columns to be initially visible, additional columns will be rendered and
   * visible via horizontal scrollbar
   */
  totalVisibleColumns: PropTypes.number,

  /**
   * Prop from react-table used to reorder columns
   */
  /**@ts-ignore */
  visibleColumns: PropTypes.array,
};
