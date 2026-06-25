/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../../settings';

export const Item = ({
  isDragging = false,
  type,
  id,
  setNodeRef = () => {},
  attributes = {},
  listeners = {},
  assistiveText = 'Text for screen reader',
  children,
  value,
  dragOverlay,
  wrapperStyle,
  transform,
  transition,
}) => {
  const draggableClass = `${pkg.prefix}__draggable-item`;
  return (
    <li
      className={cx(
        `${draggableClass}--type`, // Confusing, refactor to typography or something along those lines
        draggableClass,
        {
          [`${draggableClass}--dragging`]: isDragging,
          [`${draggableClass}--${type}`]: type,
          [`${draggableClass}--drag-overlay`]: dragOverlay,
        }
      )}
      id={id}
      ref={setNodeRef}
      style={{
        ...wrapperStyle,
        transform,
        transition,
      }}
      {...attributes}
      {...listeners}
      role="option"
      aria-selected
    >
      <span className={`${draggableClass}__assistive-text`}>
        {assistiveText}
      </span>
      {value ? value : children}
    </li>
  );
};

Item.propTypes = {
  assistiveText: PropTypes.string,
  attributes: PropTypes.shape({
    ['aria-describedby']: PropTypes.string,
    ['aria-disabled']: PropTypes.bool,
    ['aria-pressed']: PropTypes.oneOfType([PropTypes.bool, undefined]),
    ['aria-roledescription']: PropTypes.string,
    ['role']: PropTypes.string,
    ['tabIndex']: PropTypes.number,
  }),
  children: PropTypes.node,
  dragOverlay: PropTypes.bool,
  id: PropTypes.string,
  isDragging: PropTypes.bool,
  listeners: PropTypes.shape({
    onPointerDown: PropTypes.func,
    onKeyDown: PropTypes.func,
  }),
  setNodeRef: PropTypes.func,
  style: PropTypes.object,
  transform: PropTypes.string,
  transition: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.node,
  wrapperStyle: PropTypes.object,
};
