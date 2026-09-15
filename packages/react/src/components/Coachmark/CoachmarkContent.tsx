/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
  RefAttributes,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { blockClass, CoachmarkContext } from './context';
import { CoachmarkContentHeaderProps } from './CoachmarkContentHeader';
import { CoachmarkContentBodyProps } from './CoachmarkContentBody';
import { PopoverContent } from '../Popover';
import { usePrefix } from '../../internal/usePrefix';
import cx from 'classnames';

export interface CoachmarkContentProps {
  /**
   * Accessible label for the coachmark content region.
   */
  'aria-label'?: string;
  /**
   * This is a required callback that has to return the content to render in the body section.
   * It can be a single child or an array of children depending on your need
   */
  children: ReactElement | ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
}

export type CoachmarkContentComponent = ForwardRefExoticComponent<
  CoachmarkContentProps & RefAttributes<HTMLDivElement>
> & {
  Header: FC<CoachmarkContentHeaderProps>;
  Body: FC<CoachmarkContentBodyProps>;
};

const CoachmarkContent = forwardRef<HTMLDivElement, CoachmarkContentProps>(
  (props, ref) => {
    const {
      'aria-label': ariaLabel = 'Coachmark content',
      children,
      className = '',
      ...rest
    } = props;
    const prefix = usePrefix();
    const coachmarkContentBlockClass = `${blockClass}--coachmark-content`;
    const {
      open,
      setContentRef,
      onClose,
      setOpen,
      launcherButtonRef,
      selectorPrimaryFocus,
    } = useContext(CoachmarkContext);

    const handleRef = useRef<HTMLDivElement | null>(null);

    // Merge refs: both internal handleRef and external ref from adopters
    const mergedRef = React.useCallback((node: HTMLDivElement | null) => {
      handleRef.current = node;

      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as React.RefObject<HTMLDivElement | null>).current = node;
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (open && handleRef.current) {
        const popoverContent = handleRef.current;
        const popoverContainer = popoverContent?.closest(`.${prefix}--popover`);
        if (popoverContainer instanceof HTMLElement) {
          setContentRef(popoverContainer);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- setContentRef is intentionally excluded as it's a stable setter function from context
    }, [open]);

    // Handle Escape key to close Coachmark and return focus to trigger
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && open) {
          onClose?.();
          setOpen(false);
          if (launcherButtonRef?.current) {
            launcherButtonRef.current.focus();
          }
        }
      };

      if (open) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [open, onClose, setOpen, launcherButtonRef]);

    // Handle focus management with selectorPrimaryFocus or default to close button
    useEffect(() => {
      if (open) {
        let frame;
        const timer = setTimeout(() => {
          frame = requestAnimationFrame(() => {
            let elementToFocus: HTMLElement | null = null;

            if (selectorPrimaryFocus) {
              elementToFocus =
                document.querySelector<HTMLElement>(selectorPrimaryFocus);
            }

            if (!elementToFocus && handleRef.current) {
              elementToFocus = handleRef.current.querySelector<HTMLElement>(
                `.${blockClass}--content-header--close-button`
              );
            }

            if (elementToFocus) {
              elementToFocus.focus();
            }
          });
        }, 100);

        // without this the deferred focus can run after the component has
        // unmounted, which React reports as an update outside `act(...)`
        return () => {
          clearTimeout(timer);
          if (frame) {
            cancelAnimationFrame(frame);
          }
        };
      }
    }, [open, selectorPrimaryFocus]);

    return (
      <PopoverContent
        ref={mergedRef}
        className={cx(coachmarkContentBlockClass, className) || ''}
        role="region"
        aria-label={ariaLabel}
        {...rest}
        data-component-name="CoachmarkContent">
        {children}
      </PopoverContent>
    );
  }
) as CoachmarkContentComponent;

CoachmarkContent.displayName = 'CoachmarkContent';

export default CoachmarkContent;
