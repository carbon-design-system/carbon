/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useContext, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { ReactAttr } from '../../types/common';
import { useEvent } from '../../internal/useEvent';
import { debounce } from 'debounce';
import { SimpleTableContext } from './SimpleTableContext';

export interface TableRowProps extends ReactAttr<HTMLTableRowElement> {
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;
  /**
   * Specify if the row is selected
   */
  isSelected?: boolean;
}

const TableRow = (props: TableRowProps) => {
  const { autoAlign, toggleTableAlignmentClass } = useContext(SimpleTableContext);
  const prefix = usePrefix();
  const rowRef = useRef<HTMLTableRowElement>(null);
  // Remove unnecessary props if provided to this component, these are
  // only useful in `TableExpandRow`
  const className = cx(props.className, {
    [`${prefix}--data-table--selected`]: props.isSelected,
  });

  const setTableAlignment = useCallback(() => {
    if(autoAlign === "row"){
      const fragment = document.createDocumentFragment();
      const canvas = document.createElement('canvas');
      fragment.appendChild(canvas);
      const context = canvas.getContext('2d');

      if (rowRef.current && context) {
        const isMultiline = Array.from(
          rowRef.current.querySelectorAll('td')
        ).some((td) => {
          if (td.children.length > 0) {
            return;
          }
          const computedStyles = window.getComputedStyle(td);
          context.font = computedStyles.font
            ? computedStyles.font
            : `${computedStyles.fontSize}" "${computedStyles.fontFamily}`;

          const measuredText = context?.measureText(td.textContent ?? '')

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
            return true;
          }
        });

        if (isMultiline) {
          setTimeout(() => {
            toggleTableAlignmentClass(true)
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
      debouncedSetTableAlignment.clear()
    }
  }, [setTableAlignment, debouncedSetTableAlignment]);

  const cleanProps = {
    ...omit(props, ['ariaLabel', 'onExpand', 'isExpanded', 'isSelected']),
    className: className || undefined,
  };
  return <tr {...cleanProps} ref={rowRef} />;
};

TableRow.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify if the row is selected
   */
  isSelected: PropTypes.bool,
};

export default TableRow;
