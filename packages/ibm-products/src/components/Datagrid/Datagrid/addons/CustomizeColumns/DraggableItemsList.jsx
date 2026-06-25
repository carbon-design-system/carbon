/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import { Checkbox } from '@carbon/react';
import { isColumnVisible } from './common';
import { useId } from '../../../../../global/js/utils/useId';
import DraggableElement from '../../DraggableElement';
import { pkg } from '../../../../../settings';
import { getNodeTextContent } from '../../../../../global/js/utils/getNodeTextContent';

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';

const blockClass = `${pkg.prefix}--datagrid`;
const matchedColsById = (col1, col2) => col1 && col2 && col1.id === col2.id;

export const DraggableItemsList = ({
  columns,
  filterString,
  id,
  moveElement,
  onSelectColumn,
  setAriaRegionText,
}) => {
  const draggableClass = `${blockClass}__draggable-item`;
  const generatedId = useId();

  const visibleCols = columns
    // hide the columns without Header, e.g the sticky actions, spacer
    .filter((colDef) => getNodeTextContent(colDef.Header).trim().length !== 0)
    .filter(Boolean)
    .filter((colDef) => !colDef.isAction)
    .filter((colDef) => colDef.id !== 'spacer')
    .filter((colDef) => {
      return (
        filterString.length === 0 ||
        getNodeTextContent(colDef.Header).toLowerCase().includes(filterString)
      );
    });

  const getUpdatedDragCols = () => {
    const tempCols = [...visibleCols];
    tempCols.forEach((col) => {
      if (col.sticky) {
        col.disabled = true;
      }
    });
    return tempCols;
  };
  const updatedDragCols = getUpdatedDragCols();

  // let localRefCopy;
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Stop any re-ordering updates if the destination column is disabled
    // ie: it is a frozen column.
    const destOverCol = updatedDragCols.filter((item) => item.id === over.id);
    if (destOverCol?.length && destOverCol[0]?.disabled) {
      return;
    }

    const fromVisibleIndex = updatedDragCols.findIndex((col) =>
      matchedColsById(col, active)
    );
    const toVisibleIndex = updatedDragCols.findIndex((col) =>
      matchedColsById(col, over)
    );

    const colTitle = getNodeTextContent(
      updatedDragCols[fromVisibleIndex].Header
    );

    setAriaRegionText(
      `${colTitle} dropped. New position ${toVisibleIndex + 1} of ${
        updatedDragCols.length
      }.`
    );

    const fromIndex = columns.findIndex((col) => matchedColsById(col, active));
    const toIndex = columns.findIndex((col) => matchedColsById(col, over));

    moveElement(fromIndex, toIndex);
  };

  const handleDragStart = (event) => {
    const { active } = event;

    const fromIndex = updatedDragCols.findIndex((col) =>
      matchedColsById(col, active)
    );
    const colTitle = getNodeTextContent(updatedDragCols[fromIndex].Header);

    setAriaRegionText(
      `${colTitle} grabbed. Current position ${fromIndex + 1} of ${
        updatedDragCols.length
      }.`
    );
  };

  const handleDragUpdate = (event) => {
    const { active, over } = event;

    const fromIndex = updatedDragCols.findIndex((col) =>
      matchedColsById(col, active)
    );
    const toIndex = updatedDragCols.findIndex((col) =>
      matchedColsById(col, over)
    );

    const colTitle = getNodeTextContent(updatedDragCols[fromIndex].Header);

    setAriaRegionText(
      `${colTitle} grabbed. Original position ${fromIndex + 1}, new position ${
        toIndex + 1
      } of ${updatedDragCols.length}.`
    );
  };

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

      const delta = target.offsetHeight;

      switch (event.code) {
        case 'ArrowRight':
        case 'ArrowLeft':
          // ignore right and left
          return currentCoordinates;
        case 'ArrowUp':
          return { ...currentCoordinates, y: currentCoordinates.y - delta };
        case 'ArrowDown':
          return { ...currentCoordinates, y: currentCoordinates.y + delta };
        case 'Space':
          break;
      }
    },
  });

  const sensors = useSensors(pointerSensor, keyboardSensor);
  const handleCheckboxKeydown = (event, colDef) => {
    if (event.code === 'Space') {
      onSelectColumn(colDef, !isColumnVisible(colDef));
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragMove={handleDragUpdate}
      sensors={sensors}
      modifiers={[restrictToParentElement, restrictToVerticalAxis]}
    >
      <>
        <div
          className={`${blockClass}__draggable-underlay`}
          aria-hidden="true"
          key={`draggable-underlay-${id}`}
        >
          {visibleCols.map((colDef) => (
            <div
              className={`${blockClass}__draggable-underlay-item`}
              key={colDef.id}
            />
          ))}
        </div>
        <SortableContext
          items={updatedDragCols}
          strategy={verticalListSortingStrategy}
        >
          {visibleCols.map((colDef) => {
            const colHeaderTitle = getNodeTextContent(colDef.Header);
            // const parts = colHeaderTitle.split(
            //   new RegExp(`(${filterString})`, 'gi')
            // );
            // const highlightedText = parts.map((part) =>
            //   part.toLowerCase() === filterString.toLowerCase() ? (
            //     <strong>{part}</strong>
            //   ) : (
            //     part
            //   )
            // );
            const isFrozenColumn = !!colDef.sticky;
            const isDisabled = colDef.disabled;

            const listContents = (
              <Checkbox
                checked={isColumnVisible(colDef)}
                disabled={isDisabled || isFrozenColumn}
                onChange={(_, { checked }) => onSelectColumn(colDef, checked)}
                id={`${blockClass}__customization-column-${colDef.id}`}
                labelText={colHeaderTitle} //filterString ? highlightedText : colHeaderTitle
                className={`${blockClass}__customize-columns-checkbox`}
                onKeyDown={(event) => handleCheckboxKeydown(event, colDef)}
              />
            );

            return (
              <DraggableElement
                classList={draggableClass}
                key={colDef.id}
                id={colDef.id}
                elementId={`${colDef.id}-${generatedId}`}
                disabled={filterString.length > 0 || isFrozenColumn}
                ariaLabel={colHeaderTitle}
                isSticky={isFrozenColumn}
                selected={isColumnVisible(colDef)}
              >
                {listContents}
              </DraggableElement>
            );
          })}
        </SortableContext>
      </>
    </DndContext>
  );
};

DraggableItemsList.propTypes = {
  columns: PropTypes.array.isRequired,
  filterString: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  moveElement: PropTypes.func.isRequired,
  onSelectColumn: PropTypes.func.isRequired,
  setAriaRegionText: PropTypes.func.isRequired,
};
