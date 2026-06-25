/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const Underlay = ({
  draggableClass,
  type,
  items,
  wrapperStyle,
  grid,
  activeId,
  includeUnderlay,
}) => {
  if (!includeUnderlay) {
    return;
  }
  return (
    <div
      className={cx(`${draggableClass}__draggable-underlay`, {
        [`${draggableClass}__draggable-underlay--horizontal`]:
          type === 'horizontal',
        [`${draggableClass}__draggable-underlay--grid`]: grid,
      })}
      aria-hidden="true"
      key={`draggable-underlay`}
    >
      {items.map((i) => (
        <div
          className={`${draggableClass}__draggable-underlay-item`}
          key={`${i}__key`}
          style={{
            ...wrapperStyle?.({
              index: i,
              isDragging: false,
              active: null,
              id: i,
              activeId,
            }),
          }}
        />
      ))}
    </div>
  );
};

Underlay.propTypes = {
  activeId: PropTypes.number,
  draggableClass: PropTypes.string,
  grid: PropTypes.bool,
  includeUnderlay: PropTypes.bool,
  items: PropTypes.array,
  type: PropTypes.string,
  wrapperStyle: PropTypes.func,
};
