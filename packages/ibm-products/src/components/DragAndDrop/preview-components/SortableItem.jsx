/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';

export const SortableItem = ({
  id,
  children,
  assistiveText = 'Text for screen reader',
  type,
  useDragOverlay,
  wrapperStyle,
  index,
}) => {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  return (
    <Item
      isDragging={isDragging}
      attributes={attributes}
      type={type}
      setNodeRef={setNodeRef}
      transform={CSS.Translate.toString(transform)}
      transition={transition}
      listeners={listeners}
      assistiveText={assistiveText}
      dragOverlay={!useDragOverlay && isDragging}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
    >
      {children}
    </Item>
  );
};

SortableItem.propTypes = {
  assistiveText: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  type: PropTypes.string,
  useDragOverlay: PropTypes.bool,
  wrapperStyle: PropTypes.func,
};
