/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  TdHTMLAttributes,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { SimpleTableContext } from './SimpleTableContext';
import { useEvent } from '../../internal/useEvent';
import { debounce } from 'debounce';

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

const TableCell: React.FC<TableCellProps> = ({ className, ...other }) => {
  const { autoAlign, toggleTableAlignmentClass } =
    useContext(SimpleTableContext);
  const cellRef = useRef<HTMLTableCellElement>(null);

  const setTableAlignment = useCallback(() => {
    if (autoAlign === 'cell') {
      const fragment = document.createDocumentFragment();
      const canvas = document.createElement('canvas');
      fragment.appendChild(canvas);
      const context = canvas.getContext('2d');

      if (cellRef.current && context) {
        const td = cellRef.current;

        if (td.children.length > 0) {
          return;
        }
        const computedStyles = window.getComputedStyle(td);
        context.font = computedStyles.font
          ? computedStyles.font
          : `${computedStyles.fontSize}" "${computedStyles.fontFamily}`;

        const measuredText = context?.measureText(td.textContent ?? '');

        let textWidth = measuredText.width ?? 0;
        // account for letter spacing
        const letterSpacing = computedStyles.letterSpacing?.split('px');
        if (letterSpacing && letterSpacing.length) {
          textWidth += Number(letterSpacing[0]) * (td.textContent?.length ?? 0);
        }
        // account for padding
        const paddingLeft = computedStyles.paddingLeft?.split('px');
        if (paddingLeft && paddingLeft.length) {
          textWidth += Number(paddingLeft[0]);
        }

        const paddingRight = computedStyles.paddingLeft?.split('px');
        if (paddingRight && paddingRight.length) {
          textWidth += Number(paddingRight[0]);
        }
        // if measured textWidth is larger than the cell's width, then the content is being wrapped
        if (textWidth > td.getBoundingClientRect().width) {
          setTimeout(() => {
            toggleTableAlignmentClass(true);
          }, 0);
        }
      }
    }
  }, [toggleTableAlignmentClass, autoAlign]);

  const debouncedSetTableAlignment = debounce(setTableAlignment, 100);

  useEvent(window, 'resize', debouncedSetTableAlignment);

  useLayoutEffect(() => {
    setTableAlignment();
    return () => {
      debouncedSetTableAlignment.clear();
    };
  }, [setTableAlignment, debouncedSetTableAlignment]);

  return <td {...other} className={className} ref={cellRef} />;
};

TableCell.propTypes = {
  className: PropTypes.string,
};

export default TableCell;
