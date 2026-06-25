/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@carbon/react';
import { pkg } from '../../../../../settings';
import cx from 'classnames';
import { DraggableItemsList } from './DraggableItemsList';
import uuidv4 from '../../../../../global/js/utils/uuidv4';

const blockClass = `${pkg.prefix}--datagrid`;

const Columns = ({
  getVisibleColumnsCount,
  filterString,
  columns,
  setColumnsObject,
  onSelectColumn,
  assistiveTextInstructionsLabel,
  assistiveTextDisabledInstructionsLabel,
  selectAllLabel,
  customizeTearsheetHeadingLabel,
}) => {
  const listId = useRef(uuidv4()); // keep id between renders
  const listRef = useRef(null);

  const [ariaRegionText, setAriaRegionText] = React.useState('');
  // after a drag/drop action set the columns
  const moveElement = React.useCallback(
    (from, to) => {
      setColumnsObject((prev) => {
        const prevClone = [...prev];
        const item = prevClone[from];
        prevClone.splice(from, 1);
        prevClone.splice(to, 0, item);
        return prevClone;
      });
    },
    [setColumnsObject]
  );

  const filteredStickyColumn = columns?.filter((item) => !item.sticky);
  return (
    <div
      className={`${blockClass}__customize-columns-column-list`}
      ref={listRef}
    >
      <ol
        className={`${blockClass}__customize-columns-column-list--focus`}
        aria-label={customizeTearsheetHeadingLabel}
        aria-describedby={`${blockClass}__customize-columns--instructions`}
      >
        <span
          aria-live="assertive"
          className={`${blockClass}__shared-ui--assistive-text`}
        >
          {ariaRegionText}
        </span>
        <span
          id={`${blockClass}__customize-columns--instructions`}
          className={`${blockClass}__shared-ui--assistive-text`}
        >
          {filterString.length === 0
            ? assistiveTextInstructionsLabel
            : assistiveTextDisabledInstructionsLabel}
        </span>
        <div
          id={`${blockClass}__customize-columns-select-all`}
          className={cx(`${blockClass}__customize-columns-select-all`, {
            [`${blockClass}__customize-columns-select-all--selected`]:
              getVisibleColumnsCount() > 0,
          })}
          selected={getVisibleColumnsCount() > 0}
        >
          <Checkbox
            className={`${blockClass}__customize-columns-checkbox-wrapper`}
            checked={getVisibleColumnsCount() === columns.length}
            indeterminate={
              getVisibleColumnsCount() < columns.length &&
              getVisibleColumnsCount() > 0
            }
            onChange={() => {
              onSelectColumn(
                filteredStickyColumn,
                getVisibleColumnsCount() !== columns.length
              );
            }}
            id={`${blockClass}__customization-column-select-all`}
            labelText={selectAllLabel}
          />
        </div>
        <DraggableItemsList
          id={listId.current}
          columns={columns}
          filterString={filterString}
          moveElement={moveElement}
          setAriaRegionText={setAriaRegionText}
          onSelectColumn={onSelectColumn}
        />
      </ol>
    </div>
  );
};

Columns.propTypes = {
  assistiveTextDisabledInstructionsLabel: PropTypes.string,
  assistiveTextInstructionsLabel: PropTypes.string,
  columns: PropTypes.array.isRequired,
  customizeTearsheetHeadingLabel: PropTypes.string,
  disabledInstructionsLabel: PropTypes.string,
  filterString: PropTypes.string.isRequired,
  getVisibleColumnsCount: PropTypes.func.isRequired,
  instructionsLabel: PropTypes.string,
  onSelectColumn: PropTypes.func.isRequired,
  selectAllLabel: PropTypes.string,
  setColumnStatus: PropTypes.func,
  setColumnsObject: PropTypes.func.isRequired,
};

export default Columns;
