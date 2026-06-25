/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */ import { Button } from '@carbon/react';
import React, {
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { blockClass, CoachmarkContext } from './context';
import { Close, Draggable } from '@carbon/react/icons';
import { carbon } from '../../../../settings';
import { makeDraggable } from '../../../../global/js/utils/makeDraggable';
import { getDevtoolsProps } from '../../../../global/js/utils/devtools';

export interface CoachmarkContentHeaderProps {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription?: string;
  /**
   * Tooltip text and aria label for the Drag button icon.
   */
  dragIconDescription?: string;
  /**
   * Aria label for the coachmark when it is being dragged.
   */
  dragAriaLabel?: string;
  /**
   * Optional contents of the Coachmark Header.
   */
  children?: string;
}

export const CoachmarkContentHeader = forwardRef<
  HTMLDivElement,
  CoachmarkContentHeaderProps
>((props, ref) => {
  const {
    className = '',
    closeIconDescription,
    dragIconDescription,
    dragAriaLabel,
    children,
    ...rest
  } = props;
  const { setOpen, onClose, contentRef, floating } =
    useContext(CoachmarkContext);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const dragRef = useRef<HTMLButtonElement | null>(null);
  const handleRef = ref || headerRef;
  const contentHeaderBlockClass = `${blockClass}--content-header`;
  const [isDragging, setIsDragging] = useState<boolean | null>(null);
  const [moveAnnouncement, setMoveAnnouncement] = useState('');
  const moveCounterRef = useRef(0);
  const dragInstructionsId = `${contentHeaderBlockClass}--drag-instructions`;
  const dragStatusId = `${contentHeaderBlockClass}--drag-status`;
  const dragMoveId = `${contentHeaderBlockClass}--drag-move`;

  const closeBubble = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onClose?.();
    setOpen(false);
  };
  useEffect(() => {
    if (
      floating &&
      contentRef &&
      typeof handleRef === 'object' &&
      handleRef !== null &&
      'current' in handleRef &&
      handleRef.current &&
      dragRef.current
    ) {
      // Find the popover-content element for styling during drag
      const dragStyleContainer = contentRef.querySelector(
        `.${carbon.prefix}--popover-content`
      );

      // Reset positioning styles on the drag container
      contentRef.style.transform = 'none';
      contentRef.style.left = '0px';
      contentRef.style.top = '0px';

      const draggable = makeDraggable({
        el: contentRef,
        dragHandle: handleRef.current,
        focusableDragHandle: dragRef.current,
      });

      const onDragStart = () => {
        setIsDragging(true);
        setMoveAnnouncement('');
        if (dragStyleContainer) {
          dragStyleContainer.classList.add(
            `${contentHeaderBlockClass}--is-dragging`
          );
          if (dragAriaLabel) {
            dragStyleContainer.setAttribute('aria-label', dragAriaLabel);
          }
        }
      };

      const onDragEnd = () => {
        setIsDragging(false);
        setMoveAnnouncement('');
        if (dragStyleContainer) {
          dragStyleContainer.classList.remove(
            `${contentHeaderBlockClass}--is-dragging`
          );
          dragStyleContainer.removeAttribute('aria-label');
        }
      };

      const onDragMove = (event: Event) => {
        const customEvent = event as CustomEvent<{
          direction: string;
          distance: number;
        }>;
        const { direction, distance } = customEvent.detail;
        // Increment counter to make each announcement unique
        moveCounterRef.current += 1;
        // Add zero-width space multiplied by counter to make string unique without being announced
        const uniqueMarker = '\u200B'.repeat(moveCounterRef.current);
        setMoveAnnouncement(
          `Moved ${direction} ${distance} pixels${uniqueMarker}`
        );
      };

      contentRef.addEventListener('dragstart', onDragStart);
      contentRef.addEventListener('dragend', onDragEnd);
      contentRef.addEventListener('dragmove', onDragMove as EventListener);

      // Cleanup function
      return () => {
        contentRef.removeEventListener('dragstart', onDragStart);
        contentRef.removeEventListener('dragend', onDragEnd);
        contentRef.removeEventListener('dragmove', onDragMove as EventListener);
        draggable.cleanup();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floating, contentRef, handleRef, dragRef, contentHeaderBlockClass]);

  return (
    <div
      ref={handleRef}
      className={cx(contentHeaderBlockClass, className)}
      {...rest}
      {...getDevtoolsProps('CoachmarkContentHeader')}
    >
      {floating && (
        <>
          <span id={dragInstructionsId} className="cds--visually-hidden">
            {isDragging
              ? 'Use arrow keys to move the coachmark. Press Enter or Space to exit drag mode.'
              : 'Press Enter or Space to activate drag mode.'}
          </span>
          <div
            id={dragStatusId}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="cds--visually-hidden"
          >
            {isDragging === true
              ? 'Drag mode active.'
              : isDragging === false
                ? 'Drag mode ended.'
                : ''}
          </div>
          <div
            id={dragMoveId}
            role="status"
            aria-live="assertive"
            aria-atomic="true"
            className="cds--visually-hidden"
          >
            {moveAnnouncement}
          </div>
          <Button
            kind="ghost"
            size="sm"
            ref={dragRef}
            renderIcon={Draggable}
            iconDescription={dragIconDescription}
            hasIconOnly
            className={`${contentHeaderBlockClass}--drag-icon`}
            aria-label={dragIconDescription}
            aria-describedby={dragInstructionsId}
            aria-pressed={isDragging}
          />
        </>
      )}
      {children}
      <Button
        kind="ghost"
        size="sm"
        renderIcon={Close}
        iconDescription={closeIconDescription}
        hasIconOnly
        onClick={closeBubble}
        className={`${contentHeaderBlockClass}--close-button`}
      />
    </div>
  );
});

CoachmarkContentHeader.displayName = 'CoachmarkContentHeader';

CoachmarkContentHeader.propTypes = {
  /**
   * Optional contents of the Coachmark Header.
   */
  children: PropTypes.node,
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription: PropTypes.string,
  /**
   * Aria label for the coachmark when it is being dragged.
   */
  dragAriaLabel: PropTypes.string,
  /**
   * Tooltip text and aria label for the Drag button icon.
   */
  dragIconDescription: PropTypes.string,
};
