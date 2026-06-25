/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { px } from '@carbon/layout';
import { action } from 'storybook/actions';
import { pkg } from '../../../settings';
import { SortableItem } from './SortableItem';
import { ListContainer } from './ListContainer';
import { Underlay } from './Underlay';

// Dnd kit imports
/* ************************ */
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
/* ************************ */

export const Sortable = ({
  type,
  sortableProps,
  Container = ListContainer,
  useDragOverlay = true,
  wrapperStyle,
  strategy,
  withGrid,
  gridGap = px(12),
  itemCount = 10,
  includeUnderlay = true,
  modifiers = [],
  ...args
}) => {
  const [items, setItems] = useState(
    Array.from({ length: itemCount }, (_, i) => i + 1)
  );
  const [activeId, setActiveId] = useState(null);
  const getIndex = (id) => items.indexOf(id);

  const activeIndex = activeId ? getIndex(activeId) : -1;

  const draggableClass = `${pkg.prefix}__draggable-item`;
  const pointerSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 4,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: (event, args) => {
      const { currentCoordinates } = args;

      let target = event.target;

      while (target && !target.classList.contains(draggableClass)) {
        target = target.parentNode;
      }

      const gapValue = withGrid ? parseInt(gridGap) : 0;

      const delta =
        type !== 'horizontal'
          ? target.offsetHeight + gapValue
          : target.offsetWidth + gapValue;

      switch (event.code) {
        case 'ArrowRight': {
          if (type === 'horizontal' || withGrid) {
            return { ...currentCoordinates, x: currentCoordinates.x + delta };
          }
          return currentCoordinates;
        }
        case 'ArrowLeft': {
          if (type === 'horizontal' || withGrid) {
            return { ...currentCoordinates, x: currentCoordinates.x - delta };
          }
          // ignore right and left
          return currentCoordinates;
        }
        case 'ArrowUp':
          if (type === 'horizontal') {
            return currentCoordinates;
          }
          return { ...currentCoordinates, y: currentCoordinates.y - delta };
        case 'ArrowDown':
          if (type === 'horizontal') {
            return currentCoordinates;
          }
          return { ...currentCoordinates, y: currentCoordinates.y + delta };
        case 'Space':
          break;
      }
    },
  });

  const handleDragEnd = ({ over }) => {
    action('handleDragEnd')();
    setActiveId(null);

    if (over) {
      const overIndex = getIndex(over.id);
      if (activeIndex !== overIndex) {
        setItems((items) => arrayMove(items, activeIndex, overIndex));
      }
    }
  };

  const handleDragStart = ({ active }) => {
    action('handleDragStart')();
    if (!active) {
      return;
    }

    setActiveId(active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const sensors = useSensors(pointerSensor, keyboardSensor);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      sensors={sensors}
      modifiers={modifiers}
      {...args}
    >
      <SortableContext items={items} strategy={strategy} {...sortableProps}>
        <Container
          draggableClass={draggableClass}
          type={type}
          gridGap={withGrid && gridGap}
        >
          <Underlay
            draggableClass={draggableClass}
            items={items}
            type={type}
            wrapperStyle={wrapperStyle}
            grid={withGrid}
            activeId={activeId}
            includeUnderlay={includeUnderlay}
          />
          {items.map((i) => (
            <SortableItem
              id={i}
              key={`${i}__drag_key`}
              type={type}
              useDragOverlay={useDragOverlay}
              wrapperStyle={wrapperStyle}
              index={i}
            >
              Item {i}
            </SortableItem>
          ))}
        </Container>
      </SortableContext>
    </DndContext>
  );
};

Sortable.propTypes = {
  Container: PropTypes.elementType,
  adjustScale: PropTypes.bool,
  gridGap: PropTypes.number,
  includeUnderlay: PropTypes.bool,
  itemCount: PropTypes.number,
  modifiers: PropTypes.arrayOf(PropTypes.func),
  restrictToParent: PropTypes.bool,
  sortableProps: PropTypes.object,
  strategy: PropTypes.func,
  type: PropTypes.string,
  useDragOverlay: PropTypes.bool,
  withGrid: PropTypes.bool,
  wrapperStyle: PropTypes.func,
};
