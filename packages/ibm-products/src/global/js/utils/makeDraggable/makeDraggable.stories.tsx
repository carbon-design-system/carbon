/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { makeDraggable } from './makeDraggable';
import './_storybook-styles.scss';
import mdx from './makeDraggable.mdx';
import { carbon } from '../../../../settings';
import { Button, Popover, PopoverContent } from '@carbon/react';
import { Close, Draggable } from '@carbon/react/icons';

// Note: This story is referenced in Core Carbon. Please ensure that any alterations or removals are reflected in Core Carbon as well.

export default {
  title: 'Utilities/makeDraggable',
  parameters: {
    layout: 'padded',
    docs: {
      page: mdx,
    },
  },
  tags: ['autodocs'],
};

const DraggableDiv = () => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement && headerRef.current && dragRef.current) {
      const draggable = makeDraggable({
        el: dialogElement,
        dragHandle: headerRef.current,
        focusableDragHandle: dragRef.current,
      });

      const onDragStart = () => {
        if (dialogElement) {
          dialogElement.classList.add('is-dragging');
          dialogElement.setAttribute(
            'aria-label',
            'Picked up the draggable Dialog'
          );
        }
      };

      const onDragEnd = () => {
        if (dialogElement) {
          dialogElement.classList.remove('is-dragging');
          dialogElement.setAttribute(
            'aria-label',
            'draggable Dialog was dropped'
          );
        }
      };

      dialogElement.addEventListener('dragstart', onDragStart);
      dialogElement.addEventListener('dragend', onDragEnd);

      // Clean up attached event listeners
      return () => {
        if (dialogElement) {
          dialogElement.removeEventListener('dragstart', onDragStart);
          dialogElement.removeEventListener('dragend', onDragEnd);
        }
        draggable.cleanup(); // Call the cleanup function from makeDraggable
      };
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogRef.current, headerRef.current, dragRef.current]);

  return (
    <div className="mt-10 flex justify-center">
      <div ref={dialogRef} className="draggable__div">
        <div ref={headerRef} className="draggable__div-header">
          <header ref={headerRef} className={`div-header`}>
            <Button
              kind="ghost"
              ref={dragRef}
              className="drag-icon-div"
              aria-describedby="drag-instructions"
            >
              <Draggable />
            </Button>
            <span id="drag-instructions" className="sr-only">
              To pick up the draggable item, press Enter. While dragging, use
              the arrow keys to move the item. Press Enter again to leave the
              item in its new position.
            </span>
          </header>
        </div>
        <div className="draggable__div-body">
          <p>This server has 150 GB of block storage remaining.</p>
        </div>
      </div>
    </div>
  );
};

const DraggablePopoverTemplate = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current && headerRef.current && dragRef.current) {
      const dragContainer = dialogRef.current.querySelector(
        `.${carbon.prefix}--popover`
      );
      const dragStyleContainer = dialogRef.current.querySelector(
        `.${carbon.prefix}--popover-content`
      );
      if (dragContainer instanceof HTMLElement) {
        dragContainer.style.transform = 'none';
        dragContainer.style.left = '0px';
        dragContainer.style.top = '0px';
        const draggable = makeDraggable({
          el: dragContainer,
          dragHandle: headerRef.current,
          focusableDragHandle: dragRef.current,
        });

        const onDragStart = () => {
          if (dragContainer && dragStyleContainer) {
            dragStyleContainer.classList.add('is-dragging');
            dragStyleContainer.setAttribute(
              'aria-label',
              'Picked up the draggable popover'
            );
          }
        };

        const onDragEnd = () => {
          if (dragContainer && dragStyleContainer) {
            dragStyleContainer.classList.remove('is-dragging');
            dragStyleContainer.setAttribute(
              'aria-label',
              'draggable popover was dropped'
            );
          }
        };

        dragContainer.addEventListener('dragstart', onDragStart);
        dragContainer.addEventListener('dragend', onDragEnd);

        //Clean up attached event listeners
        return () => {
          dragContainer.removeEventListener('dragstart', onDragStart);
          dragContainer.removeEventListener('dragend', onDragEnd);
          draggable.cleanup(); // Call the cleanup function from makeDraggable
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, dialogRef.current, dragRef.current]);
  return (
    <div className="mt-10 flex justify-center">
      <Popover open={isOpen} caret={false} ref={dialogRef} className="popover">
        <Button
          aria-expanded={isOpen}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Toggle
        </Button>

        <PopoverContent className="popover-content">
          <header ref={headerRef} className={`popover-header popover-title`}>
            <Button
              kind="ghost"
              ref={dragRef}
              className="drag-icon"
              onClick={() => console.log('clicked')}
              aria-describedby="drag-instructions"
            >
              <Draggable />
            </Button>
            <span id="drag-instructions" className="sr-only">
              To pick up the draggable item, press Enter. While dragging, use
              the arrow keys to move the item. Press Enter again to leave the
              item in its new position.
            </span>
            <Button
              kind="ghost"
              onClick={() => setIsOpen(false)}
              className="close-icon"
            >
              <Close />
            </Button>
          </header>
          <p className="heading"> Available storage</p>
          <p className="popover-details">
            This server has 150 GB of block storage remaining.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const DraggableCustomDiv = DraggableDiv.bind({});

export const DraggablePopover = DraggablePopoverTemplate.bind({});
