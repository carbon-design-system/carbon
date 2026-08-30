/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  FC,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  RefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { CoachmarkContext, blockClass } from './context';
import CoachmarkContent, { CoachmarkContentProps } from './CoachmarkContent';
import { Popover, NewPopoverAlignment } from '../Popover';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import {
  CoachmarkContentHeader,
  CoachmarkContentHeaderProps,
} from './CoachmarkContentHeader';
import {
  CoachmarkContentBody,
  CoachmarkContentBodyProps,
} from './CoachmarkContentBody';

const componentName = 'Coachmark';

export interface CoachmarkProps {
  /**
   * Where to render the Coachmark relative to its target.
   */
  align?: NewPopoverAlignment;
  /**
   * Specify whether a caret should be rendered on the popover. This is intended to use only for coachmark patterns.
   */
  caret?: boolean;
  /**
   * Provide the contents of the Coachmark.
   */
  children: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * Specify whether a drop shadow should be rendered on the popover.
   */
  dropShadow?: boolean;
  /**
   * Specifies whether the component is floating or not.
   */
  floating?: boolean;
  /**
   * Specify whether the component should be rendered on high-contrast.
   */
  highContrast?: boolean;
  /**
   * A ref to the trigger element that launched the Coachmark. When provided,
   * focus returns to this element when the Coachmark closes, and `aria-expanded`
   * is automatically managed on that element — do not set `aria-expanded`
   * directly on the trigger when using this prop.
   */
  launcherButtonRef?: RefObject<HTMLElement | null>;
  /**
   * Function to call when the close button is clicked.
   */
  onClose?: () => void;
  /**
   * Specifies whether the component is currently open.
   */
  open?: boolean;
  /**
   * Fine tune the position of the target in pixels. Applies only to Beacons.
   */
  position?: { x: number; y: number };
  /**
   * Prevents the Coachmark from closing when clicking outside of it.
   */
  preventCloseOnClickOutside?: boolean;
  /**
   * CSS selector for the element that should receive focus when the coachmark opens.
   */
  selectorPrimaryFocus?: string;
}

// Define the type for Coachmark, extending it to include Content, ContentHeader, and ContentBody
export type CoachmarkComponent = ForwardRefExoticComponent<
  CoachmarkProps & RefAttributes<HTMLDivElement>
> & {
  Content: FC<CoachmarkContentProps>;
  ContentHeader: FC<CoachmarkContentHeaderProps>;
  ContentBody: FC<CoachmarkContentBodyProps>;
};

/**
 * Coachmarks are used to call out specific functionality or concepts
 * within the UI that may not be intuitive but are important for the
 * user to gain understanding of the product's main value and discover new use cases.
 */
export const Coachmark = forwardRef<HTMLDivElement, CoachmarkProps>(
  (props, ref) => {
    const {
      align = 'bottom',
      caret,
      children,
      className,
      dropShadow,
      floating,
      highContrast,
      launcherButtonRef,
      onClose,
      open,
      position = { x: 0, y: 0 },
      preventCloseOnClickOutside,
      selectorPrimaryFocus,
      ...rest
    } = props;
    const internalRef = useRef<HTMLDivElement | null>(null);
    const [contentRef, setContentRef] = useState<HTMLElement | null>(null);
    const [openState, setOpenState] = useState(false);

    const shouldPreventClose =
      preventCloseOnClickOutside !== undefined
        ? preventCloseOnClickOutside
        : floating === true;

    const setOpen = (value: boolean) => {
      if (!value) {
        onClose?.();
      }
      if (open === undefined) {
        setOpenState(value);
      }
    };

    const currentOpen = open ?? openState;
    const caretValue =
      caret !== undefined ? caret : floating === true ? false : true;

    useEffect(() => {
      const el = launcherButtonRef?.current;
      if (el) {
        el.setAttribute('aria-expanded', String(currentOpen));
      }
    }, [currentOpen, launcherButtonRef]);

    // Reset position when coachmark closes
    useEffect(() => {
      if (!open && contentRef && floating) {
        contentRef.style.transform = 'none';
        contentRef.style.left = '0px';
        contentRef.style.top = '0px';
      }
    }, [open, contentRef, floating]);

    useIsomorphicEffect(() => {
      const { x = 0, y = 0 } = position ?? {};
      const el = internalRef.current;

      if (el && (x !== 0 || y !== 0)) {
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
    }, [position]);

    const setRef = (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as RefObject<HTMLDivElement | null>).current = node;
      }
    };

    const handleRequestClose = () => {
      if (shouldPreventClose) {
        return;
      }
      onClose?.();
      setOpen(false);
    };

    return (
      <CoachmarkContext.Provider
        value={{
          onClose,
          open: currentOpen,
          setOpen,
          align,
          launcherButtonRef,
          position,
          contentRef,
          setContentRef,
          floating,
          selectorPrimaryFocus,
        }}>
        <div
          ref={setRef}
          className={cx(blockClass, className, {
            [`${blockClass}--floating`]: floating,
          })}
          data-component-name={componentName}>
          <Popover
            {...rest}
            open={currentOpen}
            onRequestClose={handleRequestClose}
            align={align as NewPopoverAlignment}
            caret={caretValue}
            highContrast={highContrast ?? true}
            dropShadow={dropShadow}>
            {children}
          </Popover>
        </div>
      </CoachmarkContext.Provider>
    );
  }
) as CoachmarkComponent;

Coachmark.Content = CoachmarkContent;
Coachmark.ContentHeader = CoachmarkContentHeader;
Coachmark.ContentBody = CoachmarkContentBody;

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
Coachmark.displayName = componentName;
