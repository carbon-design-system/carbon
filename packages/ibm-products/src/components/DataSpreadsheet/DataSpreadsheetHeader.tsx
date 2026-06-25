/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  Dispatch,
  ForwardedRef,
  MutableRefObject,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { px } from '@carbon/layout';
import { pkg } from '../../settings';
import { usePreviousValue } from '../../global/js/hooks';
import { checkActiveHeaderCell } from './utils/checkActiveHeaderCell';
import { checkSelectedHeaderCell } from './utils/checkSelectedHeaderCell';
import { handleHeaderCellSelection } from './utils/handleHeaderCellSelection';
import { selectAllCells } from './utils/selectAllCells';
import { getSpreadsheetWidth } from './utils/getSpreadsheetWidth';
import { useSpreadsheetMouseMove } from './hooks';
import { checkForHoldingKey } from './utils/checkForHoldingKey';
import { prepareProps } from '../../global/js/utils/props-helper';
import {
  ActiveCellCoordinates,
  ItemType,
  PrevState,
  Size,
  SpreadsheetColumn,
} from './types';
import { Column } from 'react-table';

const blockClass = `${pkg.prefix}--data-spreadsheet`;

interface DataSpreadsheetHeaderProps {
  /**
   * Object containing the active cell coordinates
   */
  activeCellCoordinates?: ActiveCellCoordinates | null;

  /**
   * Specifies the cell height
   */
  cellSize?: Size;

  /**
   * Disable column swapping, default false
   */
  disableColumnSwapping?: boolean;

  /**
   * All of the spreadsheet columns
   */
  columns?: readonly Column[];

  /**
   * uuid that corresponds to the current selection area
   */
  currentMatcher?: string;

  /**
   * Default spreadsheet sizing values
   */
  defaultColumn?: SpreadsheetColumn;

  /**
   * Whether or not a click/hold is active on a header cell
   */
  headerCellHoldActive?: boolean;

  /**
   * Headers provided from useTable hook
   */
  headerGroups?: any[];

  /**
   * Read-only table
   */
  readOnlyTable?: boolean;

  /**
   * All of the spreadsheet row data
   */
  rows?: object[];

  /**
   * The scrollbar width
   */
  scrollBarSize?: number;

  /**
   * The aria label applied to the Select all button
   */
  selectAllAriaLabel: string;

  /**
   * All of the cell selection area items
   */
  selectionAreas?: ItemType[];

  /**
   * Setter fn for activeCellCoordinates value
   */
  setActiveCellCoordinates?: Dispatch<
    SetStateAction<ActiveCellCoordinates | null>
  >;

  /**
   * Header reordering is active
   */
  selectedHeaderReorderActive?: boolean;

  /**
   * Set header reordering active or not
   */
  setSelectedHeaderReorderActive?: Dispatch<SetStateAction<boolean>>;

  /**
   * Setter fn for currentMatcher value
   */
  setCurrentMatcher?: Dispatch<SetStateAction<string>>;

  /**
   * Setter fn for header cell hold active value
   */
  setHeaderCellHoldActive?: (arg: boolean) => void;

  /**
   * Setter fn for selectionAreaData state value
   */
  setSelectionAreaData?: Dispatch<SetStateAction<object[]>>;

  /**
   * Setter fn for selectionAreas value
   */
  setSelectionAreas?: Dispatch<SetStateAction<object[]>>;

  /**
   * The total number of columns to be initially visible, additional columns will be rendered and
   * visible via horizontal scrollbar
   */
  totalVisibleColumns?: number;

  /**
   * Function used to update the active cell coordinates
   */
  updateActiveCellCoordinates?: (arg) => void;

  /**
   * Array of visible columns provided by react-table useTable hook
   */
  visibleColumns?: Column<object>[];
}

export const DataSpreadsheetHeader = forwardRef(
  (
    {
      activeCellCoordinates,
      cellSize,
      columns,
      currentMatcher,
      defaultColumn,
      headerGroups,
      scrollBarSize,
      selectionAreas,
      selectedHeaderReorderActive,
      setSelectedHeaderReorderActive,
      setActiveCellCoordinates,
      setCurrentMatcher,
      setSelectionAreas,
      readOnlyTable,
      disableColumnSwapping,
      setSelectionAreaData,
      rows,
      totalVisibleColumns,
      updateActiveCellCoordinates,
      setHeaderCellHoldActive,
      headerCellHoldActive,
      selectAllAriaLabel,
      visibleColumns,
    }: DataSpreadsheetHeaderProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [scrollBarSizeValue, setScrollBarSizeValue] = useState<
      number | undefined
    >(0);
    const previousState: PrevState = usePreviousValue({ cellSize }) || {};
    useEffect(() => {
      if (previousState?.cellSize !== cellSize) {
        const scrollContainer = (
          ref as MutableRefObject<HTMLElement>
        )?.current?.querySelector(`.${blockClass}__list--container`);
        const hasScrollBar =
          scrollContainer?.scrollHeight &&
          scrollContainer?.clientHeight &&
          scrollContainer?.scrollHeight > scrollContainer?.clientHeight;
        const scrollBarValue = hasScrollBar ? 0 : scrollBarSize;

        // fix for a11y violation element_scrollable_tabbable
        if (!scrollContainer?.getAttribute('tabIndex')) {
          scrollContainer?.setAttribute('tabIndex', '0');
        }

        setScrollBarSizeValue(scrollBarValue);
      }
    }, [cellSize, ref, scrollBarSize, previousState?.cellSize]);

    const handleColumnHeaderClick = (index) => {
      return (event) => {
        const isHoldingCommandKey = checkForHoldingKey(event, 'cmd');
        const isHoldingShiftKey = checkForHoldingKey(event, 'shiftKey');
        handleHeaderCellSelection({
          type: 'column',
          activeCellCoordinates,
          rows,
          columns,
          currentMatcher,
          setActiveCellCoordinates,
          setCurrentMatcher,
          setSelectionAreas,
          spreadsheetRef: ref,
          index,
          isKeyboard: undefined,
          setSelectionAreaData,
          isHoldingCommandKey,
          isHoldingShiftKey,
        });
      };
    };

    const handleSelectAllClick = () => {
      selectAllCells({
        ref,
        setCurrentMatcher,
        setSelectionAreas,
        rows,
        columns,
        activeCellCoordinates,
        updateActiveCellCoordinates,
      });
    };

    const handleHeaderMouseDown = (index) => {
      return (event) => {
        if (event.shiftKey) {
          // Remove columns, need to call handleHeaderCellSelection
          return;
        }
        const selectionAreaToClone = selectionAreas?.filter(
          (item) => item?.matcher === currentMatcher
        );
        const selectionAreaElement = (
          ref as MutableRefObject<HTMLDivElement>
        ).current.querySelector(
          `[data-matcher-id="${selectionAreaToClone?.[0]?.matcher}"]`
        );
        if (selectionAreaElement) {
          selectionAreaElement.classList.add(
            `${blockClass}__selection-area--element`
          );
        }
        if (typeof setSelectedHeaderReorderActive === 'function') {
          setSelectedHeaderReorderActive(true);
        }

        const clickXPosition = event.clientX;
        const headerButtonCoords = event.target.getBoundingClientRect();
        const headerIndex = event.target.getAttribute('data-column-index');
        const offsetXValue = clickXPosition - headerButtonCoords.left;
        const lowestColumnIndexFromSelectionArea = Math.min(
          selectionAreaToClone?.[0]?.point1?.column || 0,
          selectionAreaToClone?.[0]?.point2?.column || 0
        );
        const selectionAreaCoords =
          selectionAreaElement?.getBoundingClientRect() || new DOMRect();
        const updatedOffsetDifference =
          lowestColumnIndexFromSelectionArea < parseInt(headerIndex)
            ? offsetXValue +
              (headerButtonCoords.left - selectionAreaCoords?.left)
            : offsetXValue;

        const spreadsheetSelector =
          (ref as MutableRefObject<HTMLElement>)?.current ?? document;
        const bodyContainer = spreadsheetSelector.querySelector(
          `.${blockClass}__list--container`
        )?.firstElementChild;

        const selectionAreaClonedElement =
          selectionAreaElement?.cloneNode() as HTMLElement;
        const reorderIndicatorLine =
          selectionAreaElement?.cloneNode() as HTMLElement;
        if (reorderIndicatorLine) {
          reorderIndicatorLine.className = `${blockClass}__reorder-indicator-line`;
          reorderIndicatorLine.style.width = px(2);
        }
        selectionAreaClonedElement.classList.add(
          `${blockClass}__selection-area--element-cloned`
        );
        selectionAreaClonedElement.setAttribute(
          'data-clone-offset-x',
          `${updatedOffsetDifference}`
        );
        selectionAreaClonedElement.setAttribute(
          'data-column-index-original',
          index
        );
        bodyContainer?.appendChild(selectionAreaClonedElement);
        bodyContainer?.appendChild(reorderIndicatorLine);
        setHeaderCellHoldActive?.(true);
      };
    };

    useSpreadsheetMouseMove({ ref, headerCellHoldActive, defaultColumn });

    return (
      <div className={cx(`${blockClass}__header--container`)} role="rowgroup">
        {headerGroups?.map((headerGroup, index) => {
          const headerProps = prepareProps(
            headerGroup.getHeaderGroupProps(),
            'key'
          );
          return (
            <div
              key={`header_${index}`}
              {...headerProps}
              style={{
                ...headerGroup.getHeaderGroupProps().style,
                width: getSpreadsheetWidth({
                  type: 'header',
                  headerGroup,
                  scrollBarSizeValue,
                  totalVisibleColumns,
                  defaultColumn,
                  totalColumnsWidth: undefined,
                  visibleColumns,
                }),
                overflow: 'hidden',
              }}
              className={`${blockClass}__tr`}
            >
              {/* SELECT ALL BUTTON */}
              <div
                role="columnheader"
                className={`${blockClass}__select-all-cell-container`}
                style={{
                  width: defaultColumn?.rowHeaderWidth,
                  height: defaultColumn?.rowHeight,
                }}
              >
                <button
                  id={`${blockClass}__cell--header--header`}
                  data-row-index="header"
                  data-column-index="header"
                  type="button"
                  style={{
                    width: defaultColumn?.rowHeaderWidth,
                  }}
                  tabIndex={-1}
                  aria-label={selectAllAriaLabel}
                  onClick={handleSelectAllClick}
                  className={cx(
                    `${blockClass}__th`,
                    `${blockClass}--interactive-cell-element`,
                    `${blockClass}__th--select-all`,
                    {
                      [`${blockClass}__th--active-header`]:
                        activeCellCoordinates?.column === 'header' &&
                        activeCellCoordinates?.row === 'header',
                    }
                  )}
                >
                  &nbsp;
                </button>
              </div>
              {/* COLUMN HEADER BUTTONS */}
              {headerGroup.headers.map((column, index) => {
                const colProps = prepareProps(column.getHeaderProps(), 'key');
                const selectedHeader = checkSelectedHeaderCell(
                  index,
                  selectionAreas,
                  'column',
                  rows
                );
                return (
                  <div
                    key={`column_${index}`}
                    role="columnheader"
                    className={`${blockClass}__columnheader`}
                    {...colProps}
                  >
                    <button
                      id={`${blockClass}__cell--header--${index}`}
                      data-row-index="header"
                      data-column-index={index}
                      tabIndex={-1}
                      onMouseDown={
                        selectedHeader &&
                        !readOnlyTable &&
                        !disableColumnSwapping
                          ? handleHeaderMouseDown(index)
                          : undefined
                      }
                      onMouseUp={
                        selectedHeader &&
                        !readOnlyTable &&
                        !disableColumnSwapping &&
                        typeof setSelectedHeaderReorderActive === 'function'
                          ? () => setSelectedHeaderReorderActive(false)
                          : undefined
                      }
                      onClick={
                        !selectedHeader
                          ? handleColumnHeaderClick(index)
                          : undefined
                      }
                      style={{
                        height: defaultColumn?.rowHeight,
                        width: column?.width || defaultColumn?.width,
                      }}
                      className={cx(
                        `${blockClass}__th`,
                        `${blockClass}--interactive-cell-element`,
                        {
                          [`${blockClass}__th--active-header`]:
                            activeCellCoordinates?.column === index ||
                            checkActiveHeaderCell(
                              index,
                              selectionAreas,
                              'column'
                            ),
                          [`${blockClass}__th--active-header-disabledSwapping`]:
                            disableColumnSwapping || readOnlyTable,
                          [`${blockClass}__th--selected-header`]:
                            selectedHeader,
                          [`${blockClass}__th--selected-header-reorder-active`]:
                            selectedHeaderReorderActive,
                        }
                      )}
                      type="button"
                    >
                      {column.render('Header')}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
);

DataSpreadsheetHeader.propTypes = {
  /**
   * Object containing the active cell coordinates
   */
  /**@ts-ignore */
  activeCellCoordinates: PropTypes.shape({
    row: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    column: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),

  /**
   * Specifies the cell height
   */
  cellSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * All of the spreadsheet columns
   */
  columns: PropTypes.array,

  /**
   * uuid that corresponds to the current selection area
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
   * Disable column swapping, default false
   */
  disableColumnSwapping: PropTypes.bool,

  /**
   * Whether or not a click/hold is active on a header cell
   */
  headerCellHoldActive: PropTypes.bool,

  /**
   * Headers provided from useTable hook
   */
  headerGroups: PropTypes.arrayOf(PropTypes.object),

  /**
   * Read-only table
   */
  readOnlyTable: PropTypes.bool,

  /**
   * All of the spreadsheet row data
   */
  /**@ts-ignore */
  rows: PropTypes.arrayOf(PropTypes.object),

  /**
   * The scrollbar width
   */
  scrollBarSize: PropTypes.number,

  /**
   * The aria label applied to the Select all button
   */
  selectAllAriaLabel: PropTypes.string.isRequired,

  /**
   * Header reordering is active
   */
  selectedHeaderReorderActive: PropTypes.bool,

  /**
   * All of the cell selection area items
   */
  /**@ts-ignore */
  selectionAreas: PropTypes.arrayOf(PropTypes.object),

  /**
   * Setter fn for activeCellCoordinates value
   */
  setActiveCellCoordinates: PropTypes.func,

  /**
   * Setter fn for currentMatcher value
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
   * Setter fn for selectionAreas value
   */
  setSelectionAreas: PropTypes.func,

  /**
   * The total number of columns to be initially visible, additional columns will be rendered and
   * visible via horizontal scrollbar
   */
  totalVisibleColumns: PropTypes.number,

  /**
   * Function used to update the active cell coordinates
   */
  updateActiveCellCoordinates: PropTypes.func,

  /**
   * Array of visible columns provided by react-table useTable hook
   */
  /**@ts-ignore */
  visibleColumns: PropTypes.array,
};
