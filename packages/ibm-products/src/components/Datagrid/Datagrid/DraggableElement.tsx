/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropsWithChildren, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Draggable as DraggableIcon, Locked } from '@carbon/react/icons';
import cx from 'classnames';
import { pkg } from '../../../settings';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

const blockClass = `${pkg.prefix}--datagrid`;

interface DraggableElementProps extends PropsWithChildren {
  ariaLabel: string;
  children: ReactNode;
  classList?: string;
  disabled?: boolean;
  id: string;
  elementId?: string;
  isSticky?: boolean;
  selected?: boolean;
}

/**
 * Single row in the DraggableItemsList used by CustomizeColumnsTearsheet.
 */
const DraggableElement = ({
  id,
  elementId,
  children,
  classList,
  disabled,
  ariaLabel,
  isSticky,
  selected,
}: DraggableElementProps) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    disabled,
    id,
  });

  // Most of the attributes (ex: role, tabIndex, aria-disabled) are unnecessary for a <button>, so just get the ones we need.
  const { 'aria-pressed': ariaPressed, 'aria-describedby': ariaDescribedby } =
    attributes;

  const dragHandle = isSticky ? (
    <div
      className={cx(
        {
          disabled,
        },
        `${blockClass}__draggable-handleStyle`
      )}
    >
      <Locked size={16} />{' '}
    </div>
  ) : (
    <button
      className={`${blockClass}__draggable-handleStyle`}
      type="button"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-pressed={ariaPressed}
      {...listeners}
    >
      <DraggableIcon size={16} />
    </button>
  );

  const content = (
    <>
      {dragHandle}
      {children}
    </>
  );

  const style = {
    transform: !disabled ? CSS.Transform.toString(transform) : undefined,
    transition,
  };
  return (
    <li
      className={cx(classList, `${blockClass}__draggable-handleHolder`, {
        [`${blockClass}__draggable-handleHolder--selected`]: selected,
        [`${blockClass}__draggable-handleHolder--sticky`]: isSticky,
        [`${blockClass}__draggable-handleHolder--dragging`]: isDragging,
      })}
      id={elementId ? elementId : id}
      ref={setNodeRef}
      style={style}
    >
      <div className={cx([`${blockClass}__draggable-handleHolder-droppable`])}>
        {content}
      </div>
    </li>
  );
};

DraggableElement.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  classList: PropTypes.string,
  disabled: PropTypes.bool,
  elementId: PropTypes.string,
  id: PropTypes.string.isRequired,
  isSticky: PropTypes.bool,
  selected: PropTypes.bool,
};

export default DraggableElement;
